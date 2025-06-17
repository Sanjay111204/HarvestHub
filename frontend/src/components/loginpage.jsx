import React, { useState } from "react";
import logoimg from "../assets/logo.png";
import { useClerk } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const loginpage = () => {
  const { openSignIn } = useClerk();
  const [buyer, setbuyer] = useState(false);
  const [Seller, setSeller] = useState(false);
  const [token, settoken] = useState("");
  const [userid, setuserid] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();
  const { a, b, c } = loc.state || {};
  useEffect(() => {
    settoken(a);
    setuserid(b);
    setname(c);
  }, [a, b, c]);

  const handleSignin = async () => {
    if (token) {
      navigate("/Buyer", { state: loc.state });
      return;
    }
    navigate("/Sign");
  };
  function buyerfunc() {
    if (token) {
      navigate("/Buyer", { state: loc.state });
      return;
    }
    setbuyer(true);
    const temp = {
      x: true,
      y: Seller,
    };
    navigate("/sign", { state: temp });
  }
  function Sellerfunc() {
    if (token) {
      navigate("/Seller", { state: loc.state });
      return;
    }
    setSeller(true);
    const temp = {
      x: buyer,
      y: true,
    };
    navigate("/sign", { state: temp });
  }
  // const closesignin = (e) => {
  //   if (e.target === e.currentTarget) {
  //     setSeller(false);
  //     setbuyer(false);
  //   }
  // };

  return (
    <div className=" bg-gray-200 ">
      <div className="flex p-5 bg-gray-50 align-middle ">
        <img src={logoimg} className="h-15 w-auto mr-3 pl-5"></img>
        <div className="pt-4 font-logo text-2xl">HarvestHub</div>
        <div
          className="ml-240 mt-5 cursor-pointer hover:text-green-500 "
          onClick={() => {
            if (!token) handleSignin();
            else navigate("/");
          }}
        >
          {token ? (
            <div className="flex gap-3 ">
              <button
                className="bg-gray-400 p-2 rounded-xl hover:bg-red-400 cursor-pointer pt-3 ml-30 hover:text-black pb-3 px-3"
                onClick={() => {}}
              >
                {name}
              </button>
            </div>
          ) : (
            <p className="underline ml-40">Sign_in</p>
          )}
        </div>
      </div>
      {/* {buyer && (
        <div
          className="fixed justify-center bg-opacity-50 inset-0 flex items-center "
          onClick={closesignin}
        >
          <SignIn
            signUpForceRedirectUrl="/Buyer"
            fallbackRedirectUrl="/Buyer"
          ></SignIn>
        </div>
      )}
      {Seller && (
        <div
          className="fixed justify-center bg-opacity-50 inset-0 flex items-center"
          onClick={closesignin}
        >
          <SignIn
            signUpForceRedirectUrl="/Seller"
            fallbackRedirectUrl="/Seller"
          ></SignIn>
        </div>
      )} */}
      <div className="flex h-183 items-center justify-center ">
        <div>
          <div className="flex justify-center font-body">
            <div className="text-4xl">Welcome to HarvestHub</div>
          </div>
          <div className="flex justify-center font-body">
            <div className="text-2xl p-5 pl-30 pr-30 text-center">
              HarvestHub is one of the best platforms for renting farming
              equipment. Whether you're a farmer looking to rent tools or earn
              by sharing yours, we make it easy, secure, and local.
            </div>
          </div>
          <div className="flex justify-center font-body">
            <div className="text-2xl p-3 pl-30 pr-30 text-center">
              Go Green..<span className="material-symbols-outlined">eco</span>
            </div>
          </div>
          <div className="flex justify-center p-5 gap-15">
            <button
              className="font-body text-2xl bg-gray-300 p-3 pl-8 pr-8 pt-4 rounded-2xl hover:bg-gray-400 cursor-pointer border-black border-1"
              onClick={() => buyerfunc()}
            >
              Rent Equipment
            </button>

            <button
              className="font-body text-2xl bg-gray-300 p-3 pl-4 pr-4 pt-4 rounded-2xl hover:bg-gray-400 cursor-pointer  border-black border-1"
              onClick={() => Sellerfunc()}
            >
              Lend My Equipment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginpage;
