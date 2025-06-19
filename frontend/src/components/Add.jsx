import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoimg from "../assets/logo.png";
import { Input } from "./ui/input";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Add = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { a, b, c } = loc.state || {};

  const [Machine, setMachine] = useState("");
  const [ownerName, setownerName] = useState("");
  const [price, setprice] = useState(0);
  const [location, setlocation] = useState("");
  const [phno, setphno] = useState("");
  const [imagefile, setimagefile] = useState(null);
  const [token, settoken] = useState("");
  const [userid, setuserid] = useState("");
  const [name, setname] = useState("");

  useEffect(() => {
    settoken(a);
    setuserid(b);
    setname(c);
    const verify = async () => {
      try {
        await axios.get(
          "https://harvesthub-h4eh.onrender.com/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${a}` },
          }
        );
      } catch (error) {
        alert("Login is required..");
        navigate("/");
      }
    };
    verify();
  }, [a, b, c]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setimagefile(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePost = async () => {
    if (!Machine || !ownerName || !phno || !location || !price || !imagefile) {
      alert("Please fill all the * marked values");
      return;
    }
    try {
      await axios.post("https://harvesthub-h4eh.onrender.com/api/Seller/push", {
        user_id: userid,
        name: ownerName,
        machine: Machine,
        location,
        costperday: price,
        phone: phno,
        image64bit: imagefile,
      });
      alert("Successfully Posted");
      navigate("/Seller", { state: loc.state });
    } catch (err) {
      alert(`Problem due to ${err}`);
    }
  };

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
    <div className="bg-gray-100 min-h-screen font-body">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img src={logoimg} alt="Logo" className="h-10" />
          <h1 className="text-2xl font-logo text-green-700">HarvestHub</h1>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg font-semibold text-red-700"
        >
          {name || "Sign In"}
        </button>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 text-lg">
          <div>
            <label>
              Name<span className="text-red-600">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Name"
              value={ownerName}
              onChange={(e) => setownerName(e.target.value)}
              className="bg-gray-100 mt-1"
            />
          </div>

          <div>
            <label>
              Machine<span className="text-red-600">*</span>
            </label>
            <Select onValueChange={(value) => setMachine(value)}>
              <SelectTrigger className="bg-gray-100 mt-1">
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

          <div>
            <label>
              Location<span className="text-red-600">*</span>
            </label>
            <Select onValueChange={(value) => setlocation(value)}>
              <SelectTrigger className="bg-gray-100 mt-1">
                <SelectValue placeholder="Select location" />
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

          <div>
            <label>
              Cost per Day<span className="text-red-600">*</span>
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              className="bg-gray-100 mt-1"
            />
          </div>

          <div>
            <label>
              Phone Number<span className="text-red-600">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter phone number"
              value={phno}
              onChange={(e) => setphno(e.target.value)}
              className="bg-gray-100 mt-1"
            />
          </div>
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-lg mb-2">
            Add Image<span className="text-red-600">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-200 p-2 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-6">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-medium px-6 py-3 rounded-xl shadow-sm"
          onClick={() => navigate("/Seller", { state: loc.state })}
        >
          Back
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Add;
