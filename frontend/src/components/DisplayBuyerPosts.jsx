import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const DisplayBuyerPosts = (props) => {
  const [data, setdata] = useState([]);
  const [date, setdate] = useState("");
  useEffect(() => {
    setdata(props.data);
  }, [props]);

  const handleSendRequest = async () => {
    if (!date) {
      alert("Cant send request without filling date");
      return;
    }
    try {
      const res = await axios.post("http://localhost:1112/api/request/push", {
        post_id: data._id,
        name: props.username,
        date,
        req_id: props.user_id,
        owner_name: data.name,
        machine: data.machine,
        location: data.location,
        costperday: data.costperday,
        phone: data.phone,
        image: data.image,
      });
      alert("Request sent successfully");
    } catch (err) {
      console.log(err);
      alert(`error due to ${err}`);
    }
  };
  return (
    <div className="font-body border-1 border-black m-5 p-5 rounded-2xl text-l">
      <img src={data.image} className="h-40 w-60 m-3" />
      <div className="flex justify-between w-63">
        <div className="ml-3">OwnerName </div>
        <div className="">{data.name}</div>
      </div>
      <div className="flex justify-between w-63">
        <div className="ml-3">Machine </div>
        <div className="">{data.machine}</div>
      </div>
      <div className="flex justify-between w-63">
        <div className="ml-3">Location </div>
        <div className="">{data.location}</div>
      </div>
      <div className="flex justify-between w-63">
        <div className="ml-3">CostPerDay </div>
        <div className="">{data.costperday}</div>
      </div>
      <div className="flex justify-between w-63">
        <div className="ml-3">Phno </div>
        <div className="">{data.phone}</div>
      </div>
      <div className="flex mt-5 w-67 h-10  ">
        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => {
            setdate(e.target.value);
          }}
          className="ml-3 mr-2 bg-gray-100 border-black border-1 rounded-md pl-3 w-37  "
        ></input>
        <button
          className="bg-gray-300 h-13 pt-1 rounded-2xl hover:bg-green-400 cursor-pointer "
          onClick={handleSendRequest}
        >
          Send Request
        </button>
      </div>
    </div>
  );
};

export default DisplayBuyerPosts;
