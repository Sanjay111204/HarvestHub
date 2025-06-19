import React, { useState, useEffect } from "react";
import logoimg from "../assets/logo.png";
import axios from "axios";
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
      alert("User already exists");
      console.error(error);
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
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md relative">
          {/* Back Button */}
          <button
            onClick={() => navigate("/sign")}
            className="absolute left-4 top-4 text-sm text-green-700 hover:text-green-900 underline"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-semibold text-center mb-6 text-green-700 mt-4">
            Create an Account
          </h2>

          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
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
              placeholder="Choose a secure password"
              className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleRegister}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
            >
              Register
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default registerPage;
