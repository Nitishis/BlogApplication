import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Blogs - Fetches all blogs from the API
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (page = 1) => {
    try {
      const response = await fetch(`https://blogapplicationbackend-n1vm.onrender.com/api/blogs/all?page=${page}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      
      const data = await response.json();
      // console.log("Fetched Data:", data);  // Optionally log the response for debugging
      return data; // Returning the data to be stored in Redux
    } catch (error) {
      throw new Error(error.message || "An error occurred while fetching blogs");
    }
  });

// Delete Blog - Deletes a specific blog by its ID
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId, { dispatch }) => {
    try {
      const response = await fetch(`https://blogapplicationbackend-n1vm.onrender.com/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      // Dispatch action to remove the blog from the Redux store after successful deletion
      dispatch(removeBlog(blogId));
      return blogId; // Return the blogId to help update the state after deletion
    } catch (error) {
      throw new Error(error.message || "An error occurred while deleting the blog");
    }
  }
);

export const cleareditBlog = () => {
    return {
      type: "blogs/cleareditBlog", // Action to clear the edit blog data
    };
  };

// Edit Blog - Updates a blog by ID with the new data
export const editCurrentBlog = createAsyncThunk(
  "blogs/editCurrentBlog",
  async ({ id, blogData }) => {
    try {
      const response = await fetch(`https://blogapplicationbackend-n1vm.onrender.com/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (data.blog) {
        return data.blog; // Return the updated blog
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      throw new Error(error.message || "An error occurred while updating the blog");
    }
  }
);

export const markBlogAsShown = createAsyncThunk(
  'blogs/markAsShown',
  async (blogId, { dispatch }) => {
    const response = await fetch(`https://blogapplicationbackend-n1vm.onrender.com/api/blogs/${blogId}/show`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error('Failed to mark blog as shown');
    }

    const updatedBlog = await response.json();
    return updatedBlog.blog; // The updated blog object returned from the backend
  }
);
