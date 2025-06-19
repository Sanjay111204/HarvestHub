import React, { useEffect, useState } from "react";
import logoimg from "../assets/logo.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      const res = await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      alert("Login successful!");
      settoken(res.data.token);
      setuserId(res.data.user.id);
      const temp = {
        a: res.data.token,
        b: res.data.user.id,
        c: res.data.user.name,
      };
      if (buyer) navigate("/Buyer", { state: temp });
      else if (Seller) navigate("/Seller", { state: temp });
      else navigate("/", { state: temp });
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials or server status.");
    }
  };

  const Loginfree = async () => {
    try {
      const res = await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/auth/login",
        {
          email: "User111204",
          password: "111204",
        }
      );
      alert("Login successful!");
      settoken(res.data.token);
      setuserId(res.data.user.id);
      const temp = {
        a: res.data.token,
        b: res.data.user.id,
        c: res.data.user.name,
      };
      if (buyer) navigate("/Buyer", { state: temp });
      else if (Seller) navigate("/Seller", { state: temp });
      else navigate("/", { state: temp });
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials or server status.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center">
          <img src={logoimg} alt="Logo" className="h-10 w-auto mr-3" />
          <h1 className="text-2xl font-bold text-green-700">HarvestHub</h1>
        </div>
      </header>

      {/* Form Section */}
      <main className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
            Sign In
          </h2>

          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="mb-6 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <button
              onClick={Login}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
            >
              Login
            </button>
            <button
              onClick={() =>
                navigate("/register", { state: { x: buyer, y: Seller } })
              }
              className="w-full bg-white border border-green-600 text-green-700 py-3 rounded-xl hover:bg-green-50 transition"
            >
              Register
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={Loginfree}
              className="text-sm text-gray-600 underline hover:text-green-600 transition"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default signpage;
