import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  deleteBlog,
  editCurrentBlog,
  markBlogAsShown,
} from "../actions/blogActions";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    displayedBlog: null,
    displayedtotalPage: 0,
    totalPages: 0,
    loading: false,
    editBlog: null,
    status: "idle",
    error: null,
  },
  reducers: {
    cleareditBlog: (state) => {
      state.editBlog = null;
    },
    setDisplayedBlog: (state, action) => {
      state.displayedBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.totalPages = action.payload.totalPages;

        state.displayedBlog = action.payload.displayedBlogs;
        

        state.displayedtotalPage = action.payload.totaldisplayedPages;

        // console.log("Fetched Blogs:", action.payload.blogs); // Check the data
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        // Remove the blog from state.blogs by id
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Edit Current Blog
      .addCase(editCurrentBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCurrentBlog.fulfilled, (state, action) => {
        const blogs = Array.isArray(state.blogs) ? [...state.blogs] : [];

        console.log("Action Payload ID:", action.payload._id);
        console.log(
          "Current State Blogs IDs:",
          blogs.map((blog) => blog._id)
        );

        const index = blogs.findIndex((blog) => {
          console.log("Comparing:", blog._id, "with", action.payload._id);
          return blog._id.trim() === action.payload._id.trim(); // Trim to avoid whitespaces causing mismatch
        });

        if (index !== -1) {
          console.log("Found blog, updating...");
          blogs[index] = action.payload; // Update the blog in the array
          state.blogs = blogs; // Update the state with the new array
        } else {
          console.log(`Blog with id ${action.payload._id} not found in state.`);
        }

        state.loading = false;
        state.editBlog = action.payload;
      })

      .addCase(editCurrentBlog.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(markBlogAsShown.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (blog) => blog.id === action.payload.id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        // Optionally, set the blog as displayed in another component
        state.displayedBlog = action.payload;
      });
  },
});

export const {
  cleareditBlog,
  addBlogToHome,
  removeBlogFromHome,
  setHomeBlogs,
  setDisplayedBlog,
} = blogSlice.actions; // Export the setHomeBlogs action

export default blogSlice.reducer;
