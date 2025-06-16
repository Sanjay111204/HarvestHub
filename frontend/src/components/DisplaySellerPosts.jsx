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
    <div>
      <div className="flex font-body p-4 border-1 border-black m-5 rounded-2xl">
        <img
          src={data.image}
          alt="Loaded from DB"
          className="w-40 h-30 rounded-2xl "
        />
        <div className="ml-10 mt-12 text-xl w-50">Name:- {data.name}</div>
        <div className=" mt-12 text-xl w-60">Machine:- {data.machine}</div>
        <div className=" mt-12 text-xl w-60">Location:- {data.location}</div>
        <div className=" mt-12 text-xl w-30">Cost:- {data.costperday}</div>
        <button
          className="bg-gray-300 ml-10 h-20 mt-5 px-5 rounded-2xl cursor-pointer hover:bg-gray-400"
          onClick={handleviewRequest}
        >
          View Request
        </button>
        <button
          className="bg-gray-300 ml-10 h-20 mt-5 px-5 rounded-2xl cursor-pointer hover:bg-red-400"
          onClick={handleDelete}
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default DisplaySellerPosts;
