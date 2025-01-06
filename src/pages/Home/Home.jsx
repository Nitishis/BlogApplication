import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DemoBlog from "../Blog/DemoBlog";
import UserCreatedBlog from "./UserCreatedBlog.jsx";

function Home() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleCreateBlogClick = () => {
    if (token) {
      navigate("/create-blog");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
    <UserCreatedBlog/>
      <div className="h-auto md:w-[67.5%] md:mx-[220px] mx-8 my-2 py-4 border-2 border-[#292a60] flex flex-col items-center justify-center">
        <h2>Create a unique and beautiful blog easily.</h2>

        {/* Button for creating a blog, with conditional redirection */}
        <button
          className="bg-[#FC9C47] font-semibold text-lg p-2 mt-3"
          onClick={handleCreateBlogClick}
        >
          CREATE YOUR BLOG
        </button>
      </div>
    </>
  );
}

export default Home;
