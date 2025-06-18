import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const handlerequest = (props) => {
  const [show, setshow] = useState(true);
  const [ref, setref] = useState(false);
  const [temp, settemp] = useState(false);
  const [data, setdata] = useState([]);
  useEffect(() => {
    setdata(props.datas);
    if (props.datas.status === 1) {
      setshow(false);
      setref(true);
      settemp(false);
    } else if (props.datas.status === 2) {
      setshow(false);
      setref(false);
      settemp(true);
    }
  }, [props]);

  const handleshow = async () => {
    setshow(false);
    setref(true);
    settemp(false);
    try {
      const res = await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/request/update",
        {
          id: data._id,
          newstatus: 1,
        }
      );
    } catch (err) {
      console.log(err);
      alert(`error due to ${err}`);
    }
  };
  const handleref = async () => {
    setshow(false);
    setref(false);
    settemp(true);
    try {
      const res = await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/request/update",
        {
          id: data._id,
          newstatus: 2,
        }
      );
    } catch (err) {
      console.log(err);
      alert(`error due to ${err}`);
    }
  };

  return (
    <div>
      <div className="m-5 border-1 border-black p-6 rounded-xl ">
        <div className="flex justify-center">
          <div className="pb-3">{data.name}</div>
        </div>
        <div className="flex justify-center">
          <div className="pb-3">{data.date}</div>
        </div>
        {show && (
          <div className="flex justify-center gap-3">
            <button
              className="bg-green-200 py-2 px-4 rounded-2xl hover:bg-green-400 cursor-pointer border-1 border-black"
              onClick={handleshow}
            >
              Accept
            </button>
            <button
              className="bg-red-200 py-2 px-4 rounded-2xl hover:bg-red-400 cursor-pointer border-1 border-black"
              onClick={handleref}
            >
              Reject
            </button>
          </div>
        )}
        {ref && (
          <div className="flex justify-center gap-3">
            <button className="bg-green-400 py-2 px-13.5 rounded-2xl cursor-pointer border-1 border-black">
              Accepted
            </button>
          </div>
        )}
        {temp && (
          <div className="flex justify-center gap-3">
            <button className="bg-red-400 py-2 px-13.5 rounded-2xl  cursor-pointer border-1 border-black">
              Rejected
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default handlerequest;
