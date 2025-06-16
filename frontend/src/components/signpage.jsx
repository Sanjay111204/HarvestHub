import React, { useLayoutEffect } from "react";
import logoimg from "../assets/logo.png";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const signpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, settoken] = useState("");
  const [userId, setuserId] = useState("");
  const [buyer, setbuyer] = useState(false);
  const [Seller, setSeller] = useState(false);
  const navigate = useNavigate();
  const loc = useLocation();
  useEffect(() => {
    const { x, y } = loc.state || {};
    if (x) setbuyer(true);
    if (y) setSeller(true);
  }, [loc.state]);

  const Login = async () => {
    try {
      const res = await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      alert("Login successful!");
      // You can store the token or redirect from here if needed
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
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials or server status.");
    }
  };
  const Loginfree = async () => {
    try {
      const res = await axios.post("http://localhost:1112/api/auth/login", {
        email: "User111204",
        password: "111204",
      });
      alert("Login successful!");
      // You can store the token or redirect from here if needed
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
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials or server status.");
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
        <div className="bg-gray-100 w-100 h-115 rounded-2xl ">
          <div className="flex p-10 mt-6 justify-center font-body">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-gray-300 p-3 rounded-md"
            />
          </div>
          <div className="flex p-3 justify-center font-body">
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
              className="bg-gray-300 p-3 px-8 rounded-2xl hover:bg-gray-400 cursor-pointer pt-4"
              onClick={() => {
                Login();
              }}
            >
              Login
            </button>
            <button
              className="bg-gray-300 p-3 px-5 rounded-2xl hover:bg-gray-400 cursor-pointer pt-4 "
              onClick={() => {
                navigate("/register", { state: { x: buyer, y: Seller } });
              }}
            >
              Register
            </button>
          </div>
          <div className="flex  justify-center ">
            <button
              className="bg-gray-300 p-3 px-5 rounded-2xl hover:bg-gray-400 cursor-pointer pt-4 font-body"
              onClick={() => {
                Loginfree();
              }}
            >
              Try without Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signpage;
