import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...signupData } = formData;

    // Dispatch the signup action
    dispatch(signup(signupData)).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error(
          action.payload?.message || "Signup failed! Please try again."
        );
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white border-[#292a60] border-2 p-8 shadow-lg w-full max-w-md sm:w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#292a60]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              autoFocus
              className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
            />
          </div>

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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
            />
          </div>

          <div className="mb-4">
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#292a60]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 border-2 border-[#292a60] text-[#292a60] font-semibold bg-[#d9d8d6] hover:bg-[#fc9c47] transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />

        <div className="mt-4 text-center">
          <p className="text-sm text-[#292a60]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#eb8e3d] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
