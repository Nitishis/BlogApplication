import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  fetchBlogs,
  editCurrentBlog,
  markBlogAsShown,
} from "../../redux/actions/blogActions";
import { useNavigate } from "react-router-dom";
import {
  setDisplayedBlog,
} from "../../redux/reducers/blogReducer";

function FetchedBlog() {
  const [blog, setBlog] = useState(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, totalPages, status, error, editBlog } = useSelector(
    (state) => state.blogs
  );
  // console.log(blogs);
  const homeBlogs = useSelector((state) => state.blogs.homeBlogs);
  const { user } = useSelector((state) => state.auth);

  const isBlogInHome = (blogId) => {
    return homeBlogs.some((blog) => blog._id === blogId);
  };

  const handleShowBlog = (blogId) => {
    dispatch(markBlogAsShown(blogId));
    
    const selectedBlog = blogs.find(blog => blog.id === blogId);
    if (selectedBlog) {
      dispatch(setDisplayedBlog(selectedBlog));  // Set the blog in Redux for the displayed blog
    }
  };

  useEffect(() => {
    dispatch(fetchBlogs(page));
  }, [page, dispatch]);

  // Updated useEffect to safely access `blogs`
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setBlog(blogs[0]);
    } else {
      setBlog(null);
    }
  }, [blogs]);

  // Handlers for pagination buttons
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scroll(0,0)
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scroll(0,0)
    }
  };

  // Function to slice the blog content after complete sentences
  const sliceContentAfterSentences = (text, sentenceCount) => {
    const sentences = text.split(".");
    const slicedSentences = sentences.slice(0, sentenceCount).join(".") + ".";
    return slicedSentences;
  };

  const handleDelete = (id) => {
    if (id) {
      if (window.confirm("Are you sure you want to delete this blog?")) {
        dispatch(deleteBlog(id)).then(() => {
          const remainingBlogs = blogs.filter((blog) => blog._id !== id);
          if (remainingBlogs.length === 0 && page > 1) {
            setPage(page - 1);
          } else {
            setBlog(remainingBlogs[0] || null);
          }
        });
      }
    } else {
      console.log("Blog ID is invalid");
    }
  };

  const handleEdit = (blog) => {
    if (blog?._id) {
      const blogData = {
        blogName: blog.blogName,
        descriptionHeading: blog.descriptionHeading,
        description: blog.description,
        blogHeading: blog.blogHeading,
        writeAboutBlog: blog.writeAboutBlog,
        blogImage: blog.blogImage,
        insideBlogImage1: blog.insideBlogImage1,
        insideBlogImage2: blog.insideBlogImage2,
      };
      dispatch(editCurrentBlog({ id: blog._id, blogData }));
      navigate("/create-blog");
    } else {
      console.log("Blog ID is missing");
    }
  };

  if (blog) {
    const creationTime = new Date(blog.createdAt).toLocaleDateString();

    return (
      <>
        <div className="md:flex sm:felx-col mx-8 md:ml-56 md:mr-20">
          <div className="flex items-center">
            {/* Use the user's name dynamically in the header */}
            <h2 className="border-2 border-[#292a60] text-xl md:text-2xl text-[#292a60] font-bold text-center my-4 p-2">
              {user?.name ? `${user.name}'s Blog Posts` : "Blog Posts"}
            </h2>
          </div>

          <div className="h-auto md:w-[53.5%] lg:w-[63.5%] flex justify-end items-center gap-2 m-1">
            <button
              onClick={handlePrevious}
              className="join-item btn h-2 min-h-8 hover:bg-[#FC9C47] border-2 hover:border-[#292a60] border-[#292a60] rounded-none"
              disabled={page === 1}
            >
              Previous page
            </button>
            <span className="my-2 text-[#292a60] font-bold">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              className="join-item btn h-2 min-h-8 hover:bg-[#FC9C47] border-2 hover:border-[#292a60] border-[#292a60] rounded-none"
              disabled={page === totalPages}
            >
              Next page
            </button>
          </div>
        </div>

        {blog ? (
          <div className="h-auto md:w-[67.5%] md:mx-[220px] mx-8 border-2 border-[#292a60]">
            <div className="flex justify-between px-1 py-2 border-b-2 border-[#292a60] mb-1">
              <div>
                <h2 className="border-[#292a60] font-bold text-[#292a60] border-b-2 mt-1 ml-1">
                  {blog.blogName}
                </h2>
              </div>
              <div className="space-x-2">
                <button
                  className="my-btn-style px-0"
                  onClick={() => {

                    if(blog.isShown){
                      handleShowBlog(blog._id,false)
                    }else{
                      handleShowBlog(blog._id,true)
                    }
                  }}
                >
                  {blog.isShown ? "Remove" : "Show"}
                </button>
                <button
                  className="my-btn-style px-0"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="my-btn-style px-0"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="md:flex px-1">
              <div className="md:w-3/5">
                <img
                  src={`http://localhost:5000/uploads/${blog.blogImage}`}
                  alt="Blog Image"
                  className="w-[612px] h-[360px] object-cover"
                />
              </div>
              <div className="md:w-2/5 mt-1 md:m-0 md:mx-[2px] flex flex-col justify-end">
                <div className="bg-black bg-opacity-50 text-white p-4">
                  <span className="flex gap-2 sm:flex-col-reverse">
                    <h3 className="text-[#292a60] font-bold italic pb-1">
                      {blog.blogHeading}
                    </h3>
                    <h5>{creationTime}</h5>
                  </span>
                  <p className="text-sm text-justify">{blog.description}</p>
                </div>
              </div>
            </div>

            {/* Write About Blog Content with Images In Between */}
            <div className="p-2 text-justify">
              <p>{sliceContentAfterSentences(blog.writeAboutBlog, 10)}</p>

              {blog.insideBlogImage1 && (
                <div className="my-4">
                  <img
                    src={`http://localhost:5000/uploads/${blog.insideBlogImage1}
                  `}
                    alt="Inside Blog Image 1"
                    className="w-full h-auto my-4"
                  />
                </div>
              )}

              <p>
                {sliceContentAfterSentences(blog.writeAboutBlog.slice(200), 8)}
              </p>

              {blog.insideBlogImage2 && (
                <div className="my-4">
                  <img
                    src={`http://localhost:5000/uploads/${blog.insideBlogImage2}`}
                    alt="Inside Blog Image 2"
                    className="w-full h-auto my-4"
                  />
                </div>
              )}

              <p>{blog.writeAboutBlog.slice()}</p>
            </div>

            <div className="h-auto md:w-[53.5%] lg:w-[63.5%] md:mx-[270px] m-1 flex justify-end gap-2">
              <button
                onClick={handlePrevious}
                className="join-item btn h-2 min-h-8 hover:bg-[#FC9C47] border-2 hover:border-[#292a60] border-[#292a60] rounded-none"
                disabled={page === 1}
              >
                Previous page
              </button>
              <span className="my-2 text-[#292a60] font-bold">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                className="join-item btn h-2 min-h-8 hover:bg-[#FC9C47] border-2 hover:border-[#292a60] border-[#292a60] rounded-none"
                disabled={page === totalPages}
              >
                Next page
              </button>
            </div>
          </div>
        ) : (
          <p className="items-center text-[#e63b3b] font-bold mt-3 text-center">
            You Haven't created any Blog
          </p>
        )}
      </>
    );
  }
}

export default FetchedBlog;
