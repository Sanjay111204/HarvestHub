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
  const loc = useLocation();
  useEffect(() => {
    const { a, b, c } = loc.state || {};
    settoken(a);
    setuserid(b);
    setname(c);
    const verify = async () => {
      try {
        console.log(`token:${a}`);
        const res = await axios.get("http://localhost:1112/api/auth/profile", {
          headers: { Authorization: `Bearer ${a}` },
        });
        const res1 = await axios.post(
          "http://localhost:1112/api/request/pullstatus",
          {
            id: b,
          }
        );
        setdata(res1.data);
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
          className=" flex ml-190 pl-20 pr-20 font-body pt-5 bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300 text-xl"
          onClick={() => {
            console.log("hi");
            navigate("/Seller", { state: loc.state });
          }}
        >
          <span class="material-symbols-outlined pr-1">sync</span>
          <div className="w-12">Lend</div>
        </button>

        <div className="ml-10 mt-5 font-body underline ">
          {token ? (
            <div className="flex gap-3 ">
              <p className="underline mt-3">{name}</p>
              <button
                className="bg-gray-400 p-2 rounded-xl hover:bg-gray-200 cursor-pointer pt-3"
                onClick={() => {
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="underline">Sign_in</p>
          )}
        </div>
      </div>

      {/* <hr className="border-t border-gray-400 my-1" /> */}
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
    </div>
  );
};

export default ShowStatus;
