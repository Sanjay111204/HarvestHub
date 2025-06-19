import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoimg from "../assets/logo.png";
import ResponseCard from "./ResponseCard";

const ShowStatus = () => {
  const navigate = useNavigate();
  const loc = useLocation();

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const { a, b, c } = loc.state || {};
    setToken(a);
    setUserId(b);
    setName(c);

    const fetchStatus = async () => {
      try {
        await axios.get(
          "https://harvesthub-h4eh.onrender.com/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${a}` },
          }
        );
        const res = await axios.post(
          "https://harvesthub-h4eh.onrender.com/api/request/pullstatus",
          {
            id: b,
          }
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
        alert("Login is required.");
        navigate("/");
      }
    };

    fetchStatus();
  }, [loc.state, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
        <div className="flex items-center gap-3">
          <img src={logoimg} alt="Logo" className="h-9 w-auto" />
          <h1 className="text-2xl font-bold text-green-700 tracking-tight">
            HarvestHub
          </h1>
        </div>

        <div className="flex gap-3 items-center">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-1.5 rounded-full text-gray-700 font-medium"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <button
            className="bg-red-100 hover:bg-red-200 px-4 py-1.5 rounded-full text-red-800 font-medium"
            onClick={() => navigate("/")}
          >
            {name}
          </button>
        </div>
      </header>

      {/* Section Title */}
      <section className="flex justify-between items-center px-6 py-4 bg-white border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Rental Requests Status
        </h2>
      </section>

      <main className="p-6">
        {data.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            No requests made yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((d) => (
              <ResponseCard
                key={d.id}
                data={d}
                username={name}
                user_id={userId}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShowStatus;
