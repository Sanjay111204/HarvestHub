import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoimg from "../assets/logo.png"; // Updated logo
import DisplaySellerPosts from "./DisplaySellerPosts";

const SellerPage = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { a, b, c } = location.state || {};

  useEffect(() => {
    setToken(a);
    setUserId(b);
    setName(c);

    const verifyUserAndFetchPosts = async () => {
      try {
        await axios.get(
          "https://harvesthub-h4eh.onrender.com/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${a}` },
          }
        );
        const response = await axios.post(
          "https://harvesthub-h4eh.onrender.com/api/Seller/pull",
          {
            id: b,
          }
        );
        setPosts(response.data);
      } catch (error) {
        alert("Error verifying user or fetching posts");
        console.error(error);
        navigate("/");
      }
    };

    verifyUserAndFetchPosts();
  }, [a, b, c]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="flex items-center justify-between p-5 bg-white shadow-sm border-b">
        <div className="flex items-center gap-3">
          <img src={logoimg} alt="Logo" className="h-9 w-auto" />
          <h1 className="text-2xl font-semibold text-green-700 tracking-tight">
            HarvestHub
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/Buyer", { state: location.state })}
            className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded-full"
          >
            <span className="material-symbols-outlined">sync</span>
            Rent
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-full"
          >
            {name}
          </button>
        </div>
      </header>

      <section className="flex items-center justify-between bg-white px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Equipment Posts
        </h2>
        <button
          onClick={() => navigate("/Seller/Add", { state: location.state })}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full"
        >
          <span className="material-symbols-outlined">add</span>
          Add New Post
        </button>
      </section>

      <main className="p-6 flex flex-wrap gap-6 justify-center">
        {posts.length > 0 ? (
          posts.map((post) => (
            <DisplaySellerPosts
              key={post._id}
              data={post}
              onDeleteSuccess={() => {
                setPosts((prev) =>
                  prev.filter((item) => item._id !== post._id)
                );
              }}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No posts found. Click "Add New Post" to create one.
          </p>
        )}
      </main>
    </div>
  );
};

export default SellerPage;
