import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
    toast.success("Successfully logged out!");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-black text-lg font-bold">Eventbrite</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/eventForm"
                  className="ml-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black"
                >
                  Event Form
                </Link>
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="ml-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black"
                    >
                      Login
                    </Link>
                    <Link
                      to="/registration"
                      className="ml-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black"
                    >
                      Registration
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="ml-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
