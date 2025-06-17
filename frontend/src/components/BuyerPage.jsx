import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import logoimg from "../assets/logo.png";
import { SignInButton, SignIn, UserButton } from "@clerk/clerk-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { fetchUsers } from "@/hook/example";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayBuyerPosts from "./DisplayBuyerPosts";

const BuyerPage = () => {
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
        const res1 = await axios.get(
          "http://localhost:1112/api/Seller/pullall",
          {}
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

  const handleLogout = async () => {
    navigate("/");
  };

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

        <div className="ml-5 mt-2 font-body  ">
          {token ? (
            <div className="flex ">
              <button
                className="bg-gray-400 p-2 rounded-xl hover:bg-red-400 cursor-pointer pt-3 ml-25 px-5 hover:text-black pb-3 underline"
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
      <div className=" flex   w-full  p-5 font-body  bg-gray-400">
        <div className="w-1/3"></div>

        <div className="w-1/3 text-center text-2xl pt-2 font-bold">
          Active Post
        </div>

        <div className="w-1/3 flex">
          <div
            className="bg-gray-300 pt-3 pb-2 px-3 ml-70 rounded-2xl cursor-pointer hover:bg-green-300  "
            onClick={handlestatus}
          >
            Request Status
          </div>
        </div>
      </div>
      {/* <hr className="border-t border-gray-400 my-1" /> */}
      <div className=" flex min-h-screen  ">
        <ul className=" flex flex-wrap justify-center mt-5 ">
          {data &&
            data.map((d) => (
              <li key={d.id}>
                <DisplayBuyerPosts data={d} username={name} user_id={userid} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default BuyerPage;
