import axios from "axios";
import React, { useEffect, useState } from "react";

const HandleRequest = (props) => {
  const [show, setShow] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.datas);
    if (props.datas.status === 1) {
      setShow(false);
      setAccepted(true);
    } else if (props.datas.status === 2) {
      setShow(false);
      setRejected(true);
    }
  }, [props]);

  const handleAccept = async () => {
    setShow(false);
    setAccepted(true);
    try {
      await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/request/update",
        {
          id: data._id,
          newstatus: 1,
        }
      );
    } catch (err) {
      console.error(err);
      alert(`Error: ${err}`);
    }
  };

  const handleReject = async () => {
    setShow(false);
    setRejected(true);
    try {
      await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/request/update",
        {
          id: data._id,
          newstatus: 2,
        }
      );
    } catch (err) {
      console.error(err);
      alert(`Error: ${err}`);
    }
  };

  return (
    <div className="w-full max-w-md p-6 m-4 bg-white border border-gray-300 rounded-2xl shadow-sm font-body">
      <div className="text-center mb-3">
        <p className="text-xl font-semibold text-green-800">{data.name}</p>
        <p className="text-gray-600">
          Requested Date:{" "}
          <span className="font-medium text-black">
            {data.date?.split("T")[0]}
          </span>
        </p>
      </div>

      {show && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleAccept}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-xl"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-xl"
          >
            Reject
          </button>
        </div>
      )}

      {accepted && (
        <div className="flex justify-center mt-4">
          <span className="bg-green-100 text-green-800 font-semibold px-6 py-2 rounded-xl">
            Accepted
          </span>
        </div>
      )}

      {rejected && (
        <div className="flex justify-center mt-4">
          <span className="bg-red-100 text-red-800 font-semibold px-6 py-2 rounded-xl">
            Rejected
          </span>
        </div>
      )}
    </div>
  );
};

export default HandleRequest;
