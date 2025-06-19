import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoimg from "../assets/logo.png";
import DisplayBuyerPosts from "./DisplayBuyerPosts";

const BuyerPage = () => {
  const navigate = useNavigate();
  const loc = useLocation();

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { a, b, c } = loc.state || {};
    setToken(a);
    setUserId(b);
    setName(c);

    const verifyAndFetch = async () => {
      try {
        await axios.get(
          "https://harvesthub-h4eh.onrender.com/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${a}` },
          }
        );
        const res = await axios.get(
          "https://harvesthub-h4eh.onrender.com/api/Seller/pullall"
        );
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Login is required.");
        navigate("/");
      }
    };

    verifyAndFetch();
  }, [loc.state, navigate]);

  const handleSwitchToSeller = () => {
    navigate("/Seller", { state: loc.state });
  };

  const handleStatusCheck = () => {
    navigate("/Buyer/status", { state: loc.state });
  };

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
            className="flex items-center gap-1 bg-green-100 hover:bg-green-200 px-4 py-1.5 rounded-full text-green-800 font-medium"
            onClick={handleSwitchToSeller}
          >
            <span className="material-symbols-outlined text-base">sync</span>
            Lend
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
          Available Equipment for Rent
        </h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-sm"
          onClick={handleStatusCheck}
        >
          Request Status
        </button>
      </section>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh] text-lg text-gray-600">
          Loading...
        </div>
      ) : (
        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((d) => (
              <DisplayBuyerPosts
                key={d.id}
                data={d}
                username={name}
                user_id={userId}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default BuyerPage;
