import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoimg from "../assets/logo.png";
import HR from "./handlerequest";

const ViewRequest = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const { id, name } = loc.state || {};
    setName(name);

    const fetch = async () => {
      try {
        const res = await axios.post(
          "https://harvesthub-h4eh.onrender.com/api/request/pull",
          {
            id,
          }
        );
        setData(res.data);
      } catch (err) {
        alert(`Error fetching requests: ${err}`);
        console.error(err);
      }
    };

    if (id) fetch();
  }, [loc.state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 font-body">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <img src={logoimg} alt="Logo" className="h-10 w-auto" />
          <h1 className="text-3xl font-bold text-green-700 tracking-wide">
            HarvestHub
          </h1>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-green-700 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-xl font-semibold"
        >
          ← Back
        </button>
      </header>

      {/* Title */}
      <section className="px-8 py-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Requests sent for <span className="text-green-700">{name}</span>
        </h2>
      </section>

      {/* Request Cards */}
      <main className="px-8 pb-10">
        {data.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            No requests found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {data.map((d, idx) => (
              <HR key={idx} datas={d} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewRequest;
