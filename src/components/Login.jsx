import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        navigate("/");
      } else {
        toast("Invalid credentials or user not found");
      }
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 border-2 border-[#292a60] shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-[#292a60] text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#292a60]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoFocus
              className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#292a60]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 border-2 border-[#292a60] text-[#292a60] font-semibold bg-[#d9d8d6] hover:bg-[#fc9c47] transition duration-300"
          >
            Login
          </button>
        </form>

        <ToastContainer />

        <div className="mt-4 text-center">
          <p className="text-sm text-[#292a60]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#eb8e3d] hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
