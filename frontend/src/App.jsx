import React from "react";

import LoginPage from "./components/loginpage";
import BuyerPage from "./components/BuyerPage";
import SellerPage from "./components/SellerPage";
import RP from "./components/registerPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Add from "./components/Add";
import SP from "./components/signpage";
import VR from "./components/viewrequest";
import ShowStatus from "./components/ShowStatus";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <LoginPage />
        </div>
      ),
    },
    {
      path: "/Buyer",
      element: (
        <div>
          <BuyerPage />
        </div>
      ),
    },
    {
      path: "/Seller",
      element: (
        <div>
          <SellerPage />
        </div>
      ),
    },
    {
      path: "/sign",
      element: (
        <div>
          <SP />
        </div>
      ),
    },
    {
      path: "/Seller/Add",
      element: (
        <div>
          <Add />
        </div>
      ),
    },
    {
      path: "/register",
      element: (
        <div>
          <RP />
        </div>
      ),
    },
    {
      path: "/Seller/view",
      element: (
        <div>
          <VR />
        </div>
      ),
    },
    {
      path: "/Buyer/status",
      element: (
        <div>
          <ShowStatus />
        </div>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
