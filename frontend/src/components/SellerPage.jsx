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
  const [loading, setloading] = useState(true);
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
        const res = await axios.get(
          "https://harvesthub-h4eh.onrender.com/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${a}` },
          }
        );
        const res1 = await axios.post(
          "https://harvesthub-h4eh.onrender.com/api/Seller/pull",
          {
            id: b,
          }
        );
        console.log("grand success");
        console.log(res1.data);
        setloading(false);
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
      <div className="flex text-xl font-body p-4 bg-gray-400 pb-3">
        <div className="pl-166 text-2xl pt-3 font-bold">User Posts</div>
        <button
          className="ml-110 pl-7 pr-10 pt-1 pb-1  bg-gray-300 rounded-2xl cursor-pointer hover:bg-green-300 text-xl flex "
          onClick={() => {
            navigate("/Seller/Add", { state: loc.state });
          }}
        >
          <span class="material-symbols-outlined p-2">add</span>
          <div className="pt-2">ADD</div>
        </button>
      </div>
      {loading && (
        <div className=" flex h-170 justify-center items-center text-2xl font-body ">
          <div className="">Loading....</div>
        </div>
      )}
      {!loading && (
        <div className="min-h-screen justify-center flex-wrap flex gap-6">
          {data &&
            data.map((d) => (
              <div key={d.id}>
                <DisplaySellerPosts
                  data={d}
                  onDeleteSuccess={() => {
                    setdata((prev) =>
                      prev.filter((item) => item._id !== d._id)
                    );
                  }}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SellerPage;
