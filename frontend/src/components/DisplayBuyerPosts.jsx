"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Weight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const DisplayBuyerPosts = (props) => {
  const [data, setdata] = useState([]);
  const [date, setDate] = useState();
  useEffect(() => {
    setdata(props.data);
  }, [props]);

  const handleSendRequest = async () => {
    if (!date) {
      alert("Cant send request without filling date");
      return;
    }
    try {
      const onlyDate = new Date(date).toISOString().split("T")[0];
      const res = await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/request/push",
        {
          post_id: data._id,
          name: props.username,
          date: onlyDate,
          req_id: props.user_id,
          owner_name: data.name,
          machine: data.machine,
          location: data.location,
          costperday: data.costperday,
          phone: data.phone,
          image: data.image,
        }
      );
      alert("Request sent successfully");
    } catch (err) {
      console.log(err);
      alert(`error due to ${err}`);
    }
  };
  return (
    <div className="font-body border-1 border-black m-5 p-5 rounded-2xl text-l bg-gray-300">
      <img
        src={data.image}
        className="h-40 w-60 m-3 rounded-xl border-1 border-black"
      />
      <div className="flex justify-between w-63">
        <div className="ml-3">OwnerName </div>
        <div className="font-extrabold">{data.name}</div>
      </div>
      <div className="flex justify-between w-63">
        <div className="ml-3">Machine </div>
        <div className="font-extrabold">{data.machine}</div>
      </div>
      <div className="flex justify-between w-63">
        <div className="ml-3">Location </div>
        <div className="font-extrabold">{data.location}</div>
      </div>
      <div className="flex justify-between w-63">
        <div className="ml-3">CostPerDay </div>
        <div className="font-extrabold">{data.costperday}</div>
      </div>
      <div className="flex justify-between w-63">
        <div className="ml-3">Phno </div>
        <div className=" font-extrabold">{data.phone}</div>
      </div>
      <div className="flex mt-5 w-67 h-10 gap-3 mb-2 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="data-[empty=true]:text-muted-foreground w-[180px] justify-start text-left font-normal mt-2"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <button
          className="bg-gray-400 h-15 px-2  pt-1 rounded-2xl hover:bg-green-400 cursor-pointer "
          onClick={handleSendRequest}
        >
          Send Request
        </button>
      </div>
    </div>
  );
};

export default DisplayBuyerPosts;
