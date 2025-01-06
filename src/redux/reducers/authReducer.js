import { createSlice } from "@reduxjs/toolkit";
import { signup, login } from "../actions/authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,  // Load user from localStorage if available
    token: localStorage.getItem("token") || null,  // Load token from localStorage
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");  // Remove user data from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup Handlers
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        alert("Account created successfully");
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload?.message || "An error occurred during signup";
        state.loading = false;
      })

      // Login Handlers
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // Store user data and token in localStorage
        state.user = { name: action.payload.name, email: action.payload.email };
        state.token = action.payload.jwtToken;
        localStorage.setItem("token", action.payload.jwtToken);
        localStorage.setItem("user", JSON.stringify(state.user)); // Save user data to localStorage
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload?.message || "An error occurred during login";
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
