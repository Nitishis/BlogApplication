import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../redux/actions/blogActions";
import DemoBlog from "../Blog/DemoBlog";

const UserCreatedBlog = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1); // Current page state

  useEffect(() => {
    dispatch(fetchBlogs(page)); // Fetch blogs based on current page
  }, [dispatch, page]);

  const { user } = useSelector((state) => state.auth);
  const displayedBlogs = useSelector((state) => state.blogs.displayedBlog);
  // console.log(displayedBlogs);
  const totalPages = useSelector((state) => state.blogs.displayedtotalPage);

  // Check if there are any blogs to display
  if (!displayedBlogs || displayedBlogs.length === 0) {
    return <DemoBlog/>;
  }

  // Function to slice content after a certain number of sentences
  const sliceContentAfterSentences = (content, numOfSentences) => {
    const sentences = content.split("."); // Split by periods (sentences)
    return sentences.slice(0, numOfSentences).join(".") + ".";
  };

  // Handle previous page logic
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle next page logic
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

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

      {/* Map through currentBlogs */}
      {Array.isArray(displayedBlogs) &&
        displayedBlogs.map((blog) => {
          const creationTime = new Date(blog.createdAt).toLocaleDateString();

          return (
            <div
              key={blog._id}
              className="h-auto md:w-[67.5%] md:mx-[220px] mx-8 border-2 border-[#292a60]"
            >
              <div className="flex justify-between px-1 py-2 border-b-2 border-[#292a60] mb-1">
                <div>
                  <h2 className="border-[#292a60] font-bold text-[#292a60] border-b-2 mt-1 ml-1">
                    {blog.blogName}
                  </h2>
                </div>
              </div>
              <div className="md:flex px-1">
                <div className="md:w-3/5">
                  <img
                    src={`https://blogapplicationbackend-n1vm.onrender.com/uploads/${blog.blogImage}`}
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
                      src={`https://blogapplicationbackend-n1vm.onrender.com/uploads/${blog.insideBlogImage1}`}
                      alt="Inside Blog Image 1"
                      className="w-full h-auto my-4"
                    />
                  </div>
                )}

                <p>
                  {sliceContentAfterSentences(
                    blog.writeAboutBlog.slice(200),
                    8
                  )}
                </p>

                {blog.insideBlogImage2 && (
                  <div className="my-4">
                    <img
                      src={`https://blogapplicationbackend-n1vm.onrender.com/uploads/${blog.insideBlogImage2}`}
                      alt="Inside Blog Image 2"
                      className="w-full h-auto my-4"
                    />
                  </div>
                )}

                <p>{blog.writeAboutBlog.slice()}</p>
              </div>
            </div>
          );
        })}

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
    </>
  );
};

export default UserCreatedBlog;
