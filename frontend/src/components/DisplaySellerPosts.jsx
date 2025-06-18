import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DisplaySellerPosts = (props) => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setdata(props.data);
  }, [props]);
  const handleviewRequest = async () => {
    navigate("/Seller/view", { state: { id: data._id, name: data.name } });
  };

  const handleDelete = async () => {
    try {
      const res = await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/Seller/remove",
        {
          id: data._id,
        }
      );
      alert("successfully deleted");
      props.onDeleteSuccess();
    } catch (err) {
      console.log(err);
      alert("failed too delete");
    }
  };
  return (
    <div className="flex ">
      <div className="font-body border-1 border-black m-5 p-5 rounded-2xl text-l bg-gray-300">
        <div className="flex justify-center">
          <img
            src={data.image}
            className="h-45 w-65 mb-3 rounded-xl border-1 border-black"
          />
        </div>
        <div className="flex justify-between w-70">
          <div className="ml-10">OwnerName </div>
          <div className="font-bold">{data.name}</div>
        </div>
        <div className="flex justify-between w-70">
          <div className="ml-10">Machine </div>
          <div className="font-bold">{data.machine}</div>
        </div>
        <div className="flex justify-between w-70">
          <div className="ml-10">Location </div>
          <div className="font-bold">{data.location}</div>
        </div>
        <div className="flex justify-between w-70">
          <div className="ml-10">CostPerDay </div>
          <div className="font-bold">{data.costperday}</div>
        </div>
        <div className="flex justify-between w-70">
          <div className="ml-10">Phno </div>
          <div className="font-bold">{data.phone}</div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-gray-400 h-20 mt-5 px-5 rounded-2xl cursor-pointer hover:bg-green-400 border-1 border-black"
            onClick={handleviewRequest}
          >
            View Request
          </button>
          <button
            className="bg-gray-400 ml-10 h-20 mt-5 px-7 rounded-2xl cursor-pointer hover:bg-red-400 border-1 border-black"
            onClick={handleDelete}
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplaySellerPosts;
