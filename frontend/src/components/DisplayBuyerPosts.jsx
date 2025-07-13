import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DisplayBuyerPosts = ({ data, username, user_id }) => {
  const [date, setDate] = useState(null);

  const handleSendRequest = async () => {
    if (!date) {
      alert("Please select a date before sending the request.");
      return;
    }

    const onlyDate = new Date(date).toISOString().split("T")[0];

    try {
      await axios.post(
        "https://harvesthub-h4eh.onrender.com/api/request/push",
        {
          post_id: data._id,
          name: username,
          date: onlyDate,
          req_id: user_id,
          owner_name: data.name,
          machine: data.machine,
          location: data.location,
          costperday: data.costperday,
          phone: data.phone,
          image: data.image,
        }
      );
      alert("Request sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Error sending request. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden flex flex-col">
      <img
        src={data.image}
        alt="Machine"
        className="h-40 w-full object-cover"
      />
      <div className="p-4 space-y-1 text-gray-800 text-sm">
        <div>
          <span className="font-semibold">Owner:</span> {data.owner_name}
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
      </div>

      <div className="p-4 pt-2 flex flex-col gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal border border-gray-300"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="text-gray-400">Select a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={handleSendRequest}
          className="bg-green-600 hover:bg-green-700 text-white w-full rounded-md font-semibold"
        >
          Send Request
        </Button>
      </div>
    </div>
  );
};

export default DisplayBuyerPosts;
