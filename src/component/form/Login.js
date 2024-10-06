import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./Authprovider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be between 6 and 20 characters and contain at least one numeric digit, one uppercase, and one lowercase letter";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const userdata = {
      email,
      password,
    };

    try {
      const response = await axios.get("http://localhost:3001/registration");
      const users = response.data;

      const user = users.find((user) => user.email === userdata.email && user.password === userdata.password);

      if (user) {
        login(user.token);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login Failed";
      toast.error(errorMessage);
      console.log("Login Failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <ToastContainer />
        <h4 className="text-center text-2xl font-bold mb-4">Login Page</h4>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={`w-full p-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>

        <button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">
          Login
        </button>
        
        <div className="mt-3 text-center">
          <p>
            Do not have an account?{" "}
            <button className="text-blue-500 hover:underline" onClick={() => navigate("/registration")}>
              Registration
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
