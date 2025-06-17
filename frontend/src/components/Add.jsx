import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import logoimg from "../assets/logo.png";
import { SignInButton, SignIn, UserButton } from "@clerk/clerk-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { fetchUsers } from "@/hook/example";
import { useEffect } from "react";
import {
  Link,
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { Input } from "./ui/input";
import supabase from "@/utils/supabase";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const Add = () => {
  let navigate = useNavigate();
  const [Machine, setMachine] = useState("");
  const [ownerName, setownerName] = useState("");
  const [price, setprice] = useState(0);
  const [location, setlocation] = useState("");
  const [phno, setphno] = useState("");
  const [imagefile, setimagefile] = useState(null);
  const [token, settoken] = useState("");
  const [userid, setuserid] = useState("");
  const [name, setname] = useState("");
  const loc = useLocation();
  const { a, b, c } = loc.state || {};
  useEffect(() => {
    settoken(a);
    setuserid(b);
    setname(c);
    const verify = async () => {
      try {
        console.log(`token:${a}`);
        const res = await axios.get("http://localhost:1112/api/auth/profile", {
          headers: { Authorization: `Bearer ${a}` },
        });
      } catch (error) {
        alert("Login is required..");
        navigate("/");
      }
    };
    verify();
  }, [a, b, c]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setimagefile(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  async function handlePost() {
    if (!Machine || !ownerName || !phno || !location || !price || !imagefile) {
      alert("Please fill all the * marked values");
      return;
    } else {
      try {
        const res = await axios.post("http://localhost:1112/api/Seller/push", {
          user_id: userid,
          name: ownerName,
          machine: Machine,
          location,
          costperday: price,
          phone: phno,
          image64bit: imagefile,
        });
        alert("successfully Posted");
        navigate("/Seller", { state: loc.state });
      } catch (err) {
        alert(`problem due to ${err}`);
        console.log(err);
      }
    }
  }
  const machines = [
    "Tractor",
    "Plough",
    "Harvester",
    "Seeder",
    "Baler",
    "Sprayer",
    "Rotavator",
    "Cultivator",
    "Combine Harvester",
    "Tiller",
    "Thresher",
    "Transplanter",
    "Digger",
    "Reaper",
    "Mulcher",
  ];
  const locations = [
    "Agartala",
    "Ahmedabad",
    "Aizawl",
    "Amritsar",
    "Bangalore",
    "Bhopal",
    "Bhagalpur",
    "Bilaspur",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Daman",
    "Dehradun",
    "Delhi",
    "Dharamshala",
    "Durgapur",
    "Gangtok",
    "Gaya",
    "Guwahati",
    "Gwalior",
    "Haridwar",
    "Hyderabad",
    "Imphal",
    "Indore",
    "Itanagar",
    "Jaipur",
    "Jammu",
    "Jamshedpur",
    "Jodhpur",
    "Kanpur",
    "Kavaratti",
    "Kochi",
    "Kolkata",
    "Kozhikode",
    "Leh",
    "Lucknow",
    "Ludhiana",
    "Madurai",
    "Margao",
    "Mangalore",
    "Mumbai",
    "Mysore",
    "Nagpur",
    "Panaji",
    "Patna",
    "Port Blair",
    "Puducherry",
    "Pune",
    "Raipur",
    "Ranchi",
    "Shimla",
    "Shillong",
    "Siliguri",
    "Srinagar",
    "Surat",
    "Thiruvananthapuram",
    "Tiller",
    "Udaipur",
    "Varanasi",
    "Vadodara",
    "Warangal",
  ];

  return (
    <div className=" bg-gray-200 min-h-screen">
      <div className="flex p-5 bg-gray-50 align-middle ">
        <img src={logoimg} className="h-15 w-auto mr-3 pl-5"></img>
        <div className="pt-4 font-logo text-2xl">HarvestHub</div>
        <div className="ml-240 mt-5 ">
          {token ? (
            <div className="flex gap-3 ">
              <button
                className="bg-gray-400 p-2 rounded-xl hover:bg-red-400 cursor-pointer pt-3 ml-30 hover:text-black pb-2 px-5 font-body underline "
                onClick={() => {
                  navigate("/");
                }}
              >
                {name}
              </button>
            </div>
          ) : (
            <p className="underline ml-40">Sign_in</p>
          )}
        </div>
      </div>
      <div className="w-screen flex flex-row ">
        <div className="w-3/5 p-16 text-2xl font-body">
          <div className="flex">
            <div className="pt-1 pr-11 mr-17">
              Name<span className="text-red-600">*</span>:-
            </div>
            <Input
              type="text"
              placeholder="Enter Name"
              className="bg-gray-100 w-100 h-10 "
              value={ownerName}
              onChange={(e) => {
                setownerName(e.target.value);
              }}
            />
          </div>
          <div className="flex pt-15">
            <div className="pt-1 pr-5 mr-15">
              Machine<span className="text-red-600">*</span>:-
            </div>
            <Select onValueChange={(value) => setMachine(value)}>
              <SelectTrigger className="w-[200px] bg-gray-100 h-12">
                <SelectValue placeholder="Select machine" />
              </SelectTrigger>
              <SelectContent>
                {machines.map((machine) => (
                  <SelectItem
                    key={machine}
                    value={machine.toLowerCase().replace(/ /g, "_")}
                  >
                    {machine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex mt-15">
            <div className="pt-1 pr-5 mr-15">
              Location<span className="text-red-600">*</span>:-
            </div>
            <Select onValueChange={(value) => setlocation(value)}>
              <SelectTrigger className="w-[200px] bg-gray-100 h-10">
                <SelectValue placeholder="Select machine" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem
                    key={loc}
                    value={loc.toLowerCase().replace(/ /g, "_")}
                  >
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex mt-15">
            <div className="pt-1  mr-10">
              Cost-per-day<span className="text-red-600">*</span>:-
            </div>
            <Input
              type="number"
              placeholder="Enter Amount"
              className="bg-gray-100 w-50 h-10"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
          </div>
          <div className="flex mt-15">
            <div className="pt-1 pr-10 mr-17">
              Phone<span className="text-red-600">*</span>:-
            </div>
            <Input
              type="text"
              placeholder="Enter Phone Number"
              className="bg-gray-100 w-100 h-10 "
              value={phno}
              onChange={(e) => {
                setphno(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-2/5 p-5">
          <div className="font-body text-xl ">
            Add img<span className="text-red-600">*</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-300 cursor-pointer hover:bg-gray-400 rounded-md mt-8 w-50"
          />
        </div>
      </div>
      <div className="flex align-middle justify-center items-center">
        <button
          className="bg-gray-400 p-3 pl-5 pr-5 rounded-md cursor-pointer hover:bg-green-500"
          onClick={() => {
            handlePost();
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Add;
