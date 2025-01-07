import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cleareditBlog } from "../../redux/reducers/blogReducer";
import axios from "axios";

const CreateBlog = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    blogName: "",
    descriptionHeading: "",
    description: "",
    blogHeading: "",
    writeAboutBlog: "",
  });

  const [files, setFiles] = useState({
    blogImage: null,
    insideBlogImage1: null,
    insideBlogImage2: null,
  });

  const editBlog = useSelector((state) => state.blogs.editBlog);
  // console.log(editBlog);

  useEffect(() => {
    const savedFormData = localStorage.getItem("createBlogFormData");
    const savedFiles = localStorage.getItem("createBlogFiles");

    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      setFormData(parsedFormData);
    }

    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      setFiles(parsedFiles);
    }
    if (editBlog && editBlog._id) {
      setFormData({
        blogName: editBlog.blogName || "",
        blogHeading: editBlog.blogHeading || "",
        description: editBlog.description || "",
        writeAboutBlog: editBlog.writeAboutBlog || "",
        descriptionHeading: editBlog.descriptionHeading || "",
      });
      setFiles({
        blogImage: editBlog.blogImage || null,
        insideBlogImage1: editBlog.insideBlogImage1 || null,
        insideBlogImage2: editBlog.insideBlogImage2 || null,
      });
    }
    return () => {
      // This cleanup function is triggered when the user leaves the page
      dispatch(cleareditBlog()); // Clear Redux state
      localStorage.removeItem("createBlogFormData"); // Clear localStorage data
      localStorage.removeItem("createBlogFiles"); // Clear localStorage files
    };
  }, [editBlog, dispatch]);

  useEffect(() => {
    localStorage.setItem("createBlogFormData", JSON.stringify(formData));
    localStorage.setItem("createBlogFiles", JSON.stringify(files));
  }, [formData, files]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogImageRef = useRef(null);
  const insideBlogImage1Ref = useRef(null);
  const insideBlogImage2Ref = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage(null);

    const formDataToSend = new FormData();
    formDataToSend.append("blogName", formData.blogName);
    formDataToSend.append("descriptionHeading", formData.descriptionHeading);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("blogHeading", formData.blogHeading);
    formDataToSend.append("writeAboutBlog", formData.writeAboutBlog);

    if (files.blogImage) formDataToSend.append("blogImage", files.blogImage);
    if (files.insideBlogImage1)
      formDataToSend.append("insideBlogImage1", files.insideBlogImage1);
    if (files.insideBlogImage2)
      formDataToSend.append("insideBlogImage2", files.insideBlogImage2);

    try {
      // If editBlog exists, perform an update (PUT request)
      const response =
        editBlog && editBlog._id
          ? await axios.put(
              `https://blogapplicationbackend-n1vm.onrender.com/api/blogs/${editBlog._id}`, // Pass the blog ID to the URL for updating
              formDataToSend,
              { headers: { "Content-Type": "multipart/form-data" } }
            )
          : await axios.post(
              "https://blogapplicationbackend-n1vm.onrender.com/api/blogs/create", // Use POST for creating a new blog
              formDataToSend,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

      if (response.data.success) {
        alert(
          editBlog && editBlog._id
            ? "Blog updated successfully!"
            : "Blog created successfully!"
        );

        // Reset form data and files after successful operation
        setFormData({
          blogName: "",
          descriptionHeading: "",
          description: "",
          blogHeading: "",
          writeAboutBlog: "",
        });

        setFiles({
          blogImage: null,
          insideBlogImage1: null,
          insideBlogImage2: null,
        });

        // Clear file input fields
        if (blogImageRef.current) blogImageRef.current.value = null;
        if (insideBlogImage1Ref.current)
          insideBlogImage1Ref.current.value = null;
        if (insideBlogImage2Ref.current)
          insideBlogImage2Ref.current.value = null;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message ||
            "An error occurred while creating/updating the blog."
        );
      } else {
        setErrorMessage("An error occurred while creating/updating the blog.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <h2 className="border-2 border-[#292a60] text-xl md:text-2xl text-[#292a60] font-bold text-center my-4 p-2 mx-8 md:mx-[220px]">
          CREATE YOUR BLOG
        </h2>
      </div>
      <div className="h-auto md:w-[67.5%] md:mx-[220px] mx-8 border-2 border-[#292a60]">
        <div className="mx-auto md:mx-0 p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blog Name */}
            <div>
              <label
                htmlFor="blogName"
                className="block text-sm font-medium text-[#292a60]"
              >
                Blog Name
              </label>
              <input
                type="text"
                id="blogName"
                name="blogName"
                value={formData.blogName}
                onChange={handleChange}
                placeholder="Blog name must be at most 100 characters."
                required
                className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
              />
            </div>

            {/* Blog Image */}
            <div>
              <label
                htmlFor="blogImage"
                className="block text-sm font-medium text-[#292a60]"
              >
                Image for Blog
              </label>
              <input
                type="file"
                id="blogImage"
                name="blogImage"
                onChange={handleFileChange}
                ref={blogImageRef}
                className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="block text-sm font-medium text-[#292a60]">
                Blog Description
              </h2>
              <div className="w-full space-y-1">
                <div className="w-full">
                  <label
                    htmlFor="descriptionHeading"
                    className="block text-sm font-medium text-[#292a60]"
                  >
                    Heading of Blog Description
                  </label>
                  <textarea
                    id="descriptionHeading"
                    name="descriptionHeading"
                    value={formData.descriptionHeading}
                    onChange={handleChange}
                    placeholder="Description heading must be at most 100 characters."
                    required
                    className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
                    rows="1"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-[#292a60]"
                  >
                    Description of Blog
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description must be at most 400 characters."
                    required
                    className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <h2 className="block text-sm font-medium text-[#292a60]">
                Image for Inside the Blog (Optional)
              </h2>

              <div>
                <label
                  htmlFor="insideBlogImage1"
                  className="block text-sm font-medium text-[#292a60]"
                >
                  Image 1
                </label>
                <input
                  type="file"
                  id="insideBlogImage1"
                  name="insideBlogImage1"
                  onChange={handleFileChange}
                  ref={insideBlogImage1Ref}
                  className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="insideBlogImage2"
                  className="block text-sm font-medium text-[#292a60]"
                >
                  Image 2
                </label>
                <input
                  type="file"
                  id="insideBlogImage2"
                  name="insideBlogImage2"
                  onChange={handleFileChange}
                  ref={insideBlogImage2Ref}
                  className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
                />
              </div>
            </div>

            {/* Blog Heading */}
            <div>
              <label
                htmlFor="blogHeading"
                className="block text-sm font-medium text-[#292a60]"
              >
                Heading of the Blog
              </label>
              <textarea
                id="blogHeading"
                name="blogHeading"
                value={formData.blogHeading}
                onChange={handleChange}
                placeholder="Blog heading must be at most 100 characters."
                required
                className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
                rows="1"
              />
            </div>

            {/* Write About Blog */}
            <div>
              <label
                htmlFor="writeAboutBlog"
                className="block text-sm font-medium text-[#292a60]"
              >
                Write your Blog from here..
              </label>
              <textarea
                id="writeAboutBlog"
                name="writeAboutBlog"
                value={formData.writeAboutBlog}
                onChange={handleChange}
                required
                className="mt-2 w-full p-3 border-2 border-[#292a60] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FC9C47] focus:border-transparent"
                rows="10"
                placeholder="Write about your blog here..."
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 p-3 border-2 border-[#292a60] text-[#292a60] font-semibold shadow-md bg-[#d9d8d6] hover:bg-[#fc9c47]"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : editBlog && editBlog._id
                ? "Save Changes"
                : "Create Blog"}
            </button>

            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
