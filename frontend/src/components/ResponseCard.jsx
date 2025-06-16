import React, { useState, useEffect } from "react";

const ResponseCard = (props) => {
  const [data, setdata] = useState([]);
  const [status, setstatus] = useState(0);
  const [show, setshow] = useState(true);
  const [ref, setref] = useState(false);
  const [temp, settemp] = useState(false);
  useEffect(() => {
    setdata(props.data);
    setstatus(data.status);
    if (props.data.status === 1) {
      setshow(false);
      setref(true);
      settemp(false);
    } else if (props.data.status === 2) {
      setshow(false);
      setref(false);
      settemp(true);
    }
  }, [props]);

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
      {show && (
        <div className="flex justify-center gap-3">
          <button className="bg-gray-500 py-2 px-13.5 rounded-2xl cursor-pointer">
            Waiting
          </button>
        </div>
      )}
      {ref && (
        <div className="flex justify-center gap-3">
          <button className="bg-green-400 py-2 px-13.5 rounded-2xl cursor-pointer">
            Accepted
          </button>
        </div>
      )}
      {temp && (
        <div className="flex justify-center gap-3">
          <button className="bg-red-400 py-2 px-13.5 rounded-2xl cursor-pointer">
            Rejected
          </button>
        </div>
      )}
    </div>
  );
};

export default ResponseCard;
