import React, { useState, useEffect } from "react";
import logoimg from "../assets/logo.png";
import { useClerk } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";

const loginpage = () => {
  const { openSignIn } = useClerk();
  const [buyer, setbuyer] = useState(false);
  const [Seller, setSeller] = useState(false);
  const [token, settoken] = useState("");
  const [userid, setuserid] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();
  const { a, b, c } = loc.state || {};

  useEffect(() => {
    settoken(a);
    setuserid(b);
    setname(c);
  }, [a, b, c]);

  const handleSignin = async () => {
    if (token) {
      navigate("/Buyer", { state: loc.state });
      return;
    }
    navigate("/Sign");
  };

  function buyerfunc() {
    if (token) {
      navigate("/Buyer", { state: loc.state });
      return;
    }
    setbuyer(true);
    const temp = {
      x: true,
      y: Seller,
    };
    navigate("/sign", { state: temp });
  }

  function Sellerfunc() {
    if (token) {
      navigate("/Seller", { state: loc.state });
      return;
    }
    setSeller(true);
    const temp = {
      x: buyer,
      y: true,
    };
    navigate("/sign", { state: temp });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center">
          <img src={logoimg} alt="Logo" className="h-10 w-auto mr-3" />
          <h1 className="text-2xl font-bold text-green-700">HarvestHub</h1>
        </div>

        <div className="flex items-center gap-4">
          {token ? (
            <button
              className="bg-green-100 text-green-800 px-4 py-2 rounded-xl hover:bg-green-200 transition font-medium"
              onClick={() => {}}
            >
              {name}
            </button>
          ) : (
            <p
              onClick={handleSignin}
              className="text-green-600 underline cursor-pointer hover:text-green-800 transition"
            >
              Sign In
            </p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-green-800">
          Welcome to HarvestHub
        </h2>
        <p className="text-lg max-w-2xl mb-4 text-gray-700">
          HarvestHub is the go-to platform for renting and lending farming
          equipment. Whether you're a farmer in need or someone looking to earn
          by sharing, we make it secure and local.
        </p>
        <p className="text-xl text-green-700 mb-8">
          Go Green{" "}
          <span className="material-symbols-outlined align-middle">eco</span>
        </p>

        {/* Feature highlights */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mb-10 text-left">
          <div className="bg-white rounded-xl shadow p-5 border-t-4 border-green-500">
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              🚜 Easy Equipment Access
            </h3>
            <p className="text-gray-600 text-sm">
              Find the right tools without buying them. Rent from farmers near
              you with just a few clicks.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 border-t-4 border-green-500">
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              💼 Earn by Lending
            </h3>
            <p className="text-gray-600 text-sm">
              Let your idle tools work for you. List your equipment and start
              earning with confidence and security.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 border-t-4 border-green-500">
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              🔒 Secure Transactions
            </h3>
            <p className="text-gray-600 text-sm">
              All rentals are protected and verified. We prioritize trust, so
              you can focus on what matters most — your farm.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={buyerfunc}
            className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-green-700 transition shadow-md"
          >
            Rent Equipment
          </button>
          <button
            onClick={Sellerfunc}
            className="bg-white border border-green-600 text-green-700 px-6 py-3 rounded-xl text-lg hover:bg-green-50 transition shadow-md"
          >
            Lend My Equipment
          </button>
        </div>
      </main>
    </div>
  );
};

export default loginpage;
