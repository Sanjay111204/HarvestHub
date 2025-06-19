import React, { useState, useEffect } from "react";

const ResponseCard = ({ data }) => {
  const [status, setStatus] = useState("Waiting");

  useEffect(() => {
    if (data?.status === 1) {
      setStatus("Accepted");
    } else if (data?.status === 2) {
      setStatus("Rejected");
    } else {
      setStatus("Waiting");
    }
  }, [data]);

  const statusColor = {
    Accepted: "bg-green-600",
    Rejected: "bg-red-500",
    Waiting: "bg-yellow-400",
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden flex flex-col w-72">
      <img
        src={data.image}
        alt="Machine"
        className="h-40 w-full object-cover"
      />
      <div className="p-4 space-y-1 text-gray-800 text-sm">
        <div>
          <span className="font-semibold">Owner:</span> {data.name}
        </div>
        <div>
          <span className="font-semibold">Machine:</span> {data.machine}
        </div>
        <div>
          <span className="font-semibold">Location:</span> {data.location}
        </div>
        <div>
          <span className="font-semibold">Cost/Day:</span> ₹{data.costperday}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {data.phone}
        </div>
        <div>
          <span className="font-semibold">Date:</span> {data.date}
        </div>
      </div>
      <div className="p-4 pt-2">
        <div
          className={`text-white px-4 py-2 rounded-md text-center font-semibold ${statusColor[status]}`}
        >
          {status}
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
