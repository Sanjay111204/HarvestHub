import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DisplaySellerPosts = ({ data, onDeleteSuccess }) => {
  const [post, setPost] = useState(data);
  const navigate = useNavigate();

  const handleViewRequest = () => {
    navigate("/Seller/view", { state: { id: post._id, name: post.name } });
  };

  const handleDelete = async () => {
    try {
      await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/Seller/remove",
        {
          id: post._id,
        }
      );
      alert("Successfully deleted");
      onDeleteSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition w-72 overflow-hidden flex flex-col">
      <img
        src={post.image}
        alt="Machine"
        className="h-40 w-full object-cover"
      />
      <div className="p-4 space-y-1 text-gray-800 text-sm">
        <div>
          <span className="font-semibold">Owner:</span> {post.name}
        </div>
        <div>
          <span className="font-semibold">Machine:</span> {post.machine}
        </div>
        <div>
          <span className="font-semibold">Location:</span> {post.location}
        </div>
        <div>
          <span className="font-semibold">Cost/Day:</span> ₹{post.costperday}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {post.phone}
        </div>
      </div>
      <div className="flex justify-around p-4 pt-2">
        <button
          onClick={handleViewRequest}
          className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-4 rounded-md font-medium"
        >
          View Requests
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-md font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DisplaySellerPosts;
