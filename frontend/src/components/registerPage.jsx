import React from "react";

import logoimg from "../assets/logo.png";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const registerPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [token, settoken] = useState("");
  const [userId, setuserId] = useState("");
  const [buyer, setbuyer] = useState(false);
  const [Seller, setSeller] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const { x, y } = loc.state || {};
    if (x) setbuyer(true);
    if (y) setSeller(true);
  }, [loc.state]);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      alert("Successfully registered");
      console.log(res.data.token);
      console.log(res.data.user.id);
      settoken(res.data.token);
      setuserId(res.data.user.id);
      const temp = {
        a: res.data.token,
        b: res.data.user.id,
        c: res.data.user.name,
      };
      if (buyer) {
        navigate("/Buyer", { state: temp });
      } else if (Seller) navigate("/Seller", { state: temp });
      else navigate("/", { state: temp });
    } catch (error) {
      alert("user already exsist");
      console.log(error);
    }
  };
  return (
    <div>
      <div className="bg-gray-200 font-body">
        <div className="flex p-5 bg-gray-50 align-middle ">
          <img src={logoimg} className="h-15 w-auto mr-3 pl-5"></img>
          <div className="pt-4 font-logo text-2xl">HarvestHub</div>
        </div>
      </div>
      <div className="min-h-screen bg-gray-200 flex justify-center align-middle items-center">
        <div className="bg-gray-100 w-100 h-120 rounded-2xl ">
          <div className="flex p-5 mt-10 justify-center font-body">
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Name"
              className="bg-gray-300 p-3 rounded-md"
            />
          </div>
          <div className="flex p-5 justify-center font-body">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-gray-300 p-3 rounded-md"
            />
          </div>
          <div className="flex p-5 justify-center font-body">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="bg-gray-300 p-3 rounded-md"
            />
          </div>
          <div className="flex p-7 mt-4 justify-center gap-10 font-body">
            <button
              className="bg-gray-300 p-3 px-5 rounded-2xl hover:bg-gray-400 cursor-pointer pt-4 "
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default registerPage;
