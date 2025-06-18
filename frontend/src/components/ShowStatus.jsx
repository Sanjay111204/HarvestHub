import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logoimg from "../assets/logo.png";
import axios from "axios";
import ResponseCard from "./ResponseCard";

const ShowStatus = () => {
  let navigate = useNavigate();
  const [token, settoken] = useState("");
  const [userid, setuserid] = useState("");
  const [name, setname] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const loc = useLocation();
  useEffect(() => {
    const { a, b, c } = loc.state || {};
    settoken(a);
    setuserid(b);
    setname(c);
    const verify = async () => {
      try {
        console.log(`token:${a}`);
        const res = await axios.get(
          "https://harvesthub-h4eh.onrender.com/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${a}` },
          }
        );
        const res1 = await axios.post(
          "https://harvesthub-h4eh.onrender.com/api/request/pullstatus",
          {
            id: b,
          }
        );
        setdata(res1.data);
        setloading(false);
        console.log(res1.data);
      } catch (error) {
        console.log(error);
        alert("Login is required..");
        navigate("/");
      }
    };
    verify();
  }, [loc.state]);

  const handlestatus = async () => {
    navigate("/Buyer/status", { state: loc.state });
  };

  return (
    <div className=" bg-gray-200">
      <div className="flex p-5 bg-gray-50 align-middle ">
        <img src={logoimg} className="h-15 w-auto mr-3 pl-5"></img>
        <div className="pt-4 font-logo text-2xl">HarvestHub</div>
        <button
          className=" flex ml-190 pl-20 pr-20 font-body pt-5 bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300 text-xl border-1 border-black"
          onClick={() => {
            console.log("hi");
            navigate("/Seller", { state: loc.state });
          }}
        >
          <span class="material-symbols-outlined pr-1">sync</span>
          <div className="w-12">Lend</div>
        </button>

        <div className="ml-3 mt-2 font-body  ">
          {token ? (
            <div className="flex ">
              <button
                className="bg-gray-400 p-2 rounded-xl hover:bg-red-400 cursor-pointer pt-3 ml-25 px-6 hover:text-black pb-3 underline border-1 border-black"
                onClick={() => {
                  navigate("/");
                }}
              >
                {name}
              </button>
            </div>
          ) : (
            <p className="underline ml-40">Sign_in</p>
          )}
        </div>
      </div>

      {/* <hr className="border-t border-gray-400 my-1" /> */}
      {loading && (
        <div className=" flex h-190 justify-center items-center text-2xl font-body ">
          <div className="">Loading....</div>
        </div>
      )}
      {!loading && (
        <div className=" flex min-h-screen  ">
          <ul className=" flex flex-wrap justify-center mt-5 ">
            {data &&
              data.map((d) => (
                <li key={d.id}>
                  <ResponseCard data={d} username={name} user_id={userid} />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowStatus;
