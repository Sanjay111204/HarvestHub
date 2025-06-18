import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoimg from "../assets/logo.png";
import HR from "./handlerequest";

const viewrequest = (props) => {
  const [postid, setpostid] = useState("");
  const [data, setdata] = useState([]);
  const [names, setnames] = useState("");
  const [loading, setloading] = useState(true);

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { id, name } = loc.state;
    setpostid(id);
    setnames(name);
    console.log(name);
    const fetch = async () => {
      try {
        const res = await axios.post(
          "https://harvesthub-h4eh.onrender.com/api/request/pull",
          {
            id,
          }
        );
        console.log(res.data);
        setdata(res.data);
        setloading(false);
        console.log("Successfully fetched");
      } catch (err) {
        alert(`error due to ${err}`);
        console.log(err);
      }
    };
    fetch();
  }, [loc.state]);

  return (
    <div>
      <div className="flex p-5 bg-gray-50 align-middle ">
        <img src={logoimg} className="h-15 w-auto mr-3 pl-5"></img>
        <div className="pt-4 font-logo text-2xl">HarvestHub</div>
        <button className=" flex ml-190 pl-20 pr-20 font-body pt-5 bg-gray-50 rounded-2xl  text-xl">
          <div className="w-12"></div>
        </button>

        <div className="ml-10 mt-5 font-body underline "></div>
      </div>
      {loading && (
        <div className=" flex h-170 justify-center items-center text-2xl font-body ">
          <div className="">Loading....</div>
        </div>
      )}
      {!loading && (
        <div className="min-h-screen bg-gray-200 font-body">
          <div className="flex flex-wrap justify-center p-5">
            {data &&
              data.map((d) => (
                <div key={d.id}>
                  <HR datas={d} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default viewrequest;
