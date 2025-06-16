import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import logoimg from "../assets/logo.png";
import { SignInButton, SignIn, UserButton } from "@clerk/clerk-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { fetchUsers } from "@/hook/example";
import { useEffect } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import DisplaySellerPosts from "./DisplaySellerPosts";

const SellerPage = () => {
  const [token, settoken] = useState("");
  const [userid, setuserid] = useState("");
  const [name, setname] = useState("");
  const [data, setdata] = useState([]);
  const loc = useLocation();
  let navigate = useNavigate();
  const { a, b, c } = loc.state || {};
  useEffect(() => {
    settoken(a);
    setuserid(b);
    setname(c);
    const verify = async () => {
      try {
        console.log(`token:${a}`);
        const res = await axios.get("http://localhost:1112/api/auth/profile", {
          headers: { Authorization: `Bearer ${a}` },
        });
        const res1 = await axios.post("http://localhost:1112/api/Seller/pull", {
          id: b,
        });
        console.log("grand success");
        console.log(res1.data);
        setdata(res1.data);
      } catch (error) {
        alert(`${error}`);
        //navigate("/");
      }
    };
    // const fetch = async () => {
    //   try {

    //   } catch (err) {
    //     alert(`error due to ${err}`);
    //     console.log(err);
    //   }
    // };
    verify();
    //fetch();
  }, [a, b, c]);
  return (
    <div className=" bg-gray-200">
      <div className="flex p-5 bg-gray-50 align-middle ">
        <img src={logoimg} className="h-15 w-auto mr-3 pl-5"></img>
        <div className="pt-4 font-logo text-2xl">HarvestHub</div>
        <button
          className=" flex ml-190 pl-20 pr-20 font-body pt-5 bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300 text-xl"
          onClick={() => {
            //console.log("hi");
            navigate("/Buyer", { state: loc.state });
          }}
        >
          <span class="material-symbols-outlined pr-1">sync</span>
          <div className="w-12">Rent</div>
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
      <div className="flex text-xl font-body p-5 bg-gray-400">
        <div className="pl-140 text-3xl pt-5">Active Post</div>
        <button
          className="ml-130 pl-7 pr-10 pt-3 pb-3  bg-gray-300 rounded-2xl cursor-pointer hover:bg-green-300 text-xl flex "
          onClick={() => {
            navigate("/Seller/Add", { state: loc.state });
          }}
        >
          <span class="material-symbols-outlined p-2">add</span>
          <div className="pt-2">ADD</div>
        </button>
      </div>

      <div className="min-h-screen items-center justify-center  ">
        <ul>
          {data &&
            data.map((d) => (
              <li key={d.id}>
                <DisplaySellerPosts
                  data={d}
                  onDeleteSuccess={() => {
                    setdata((prev) =>
                      prev.filter((item) => item._id !== d._id)
                    );
                  }}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SellerPage;
