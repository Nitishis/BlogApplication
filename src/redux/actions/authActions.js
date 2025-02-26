import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


// Signup Action
    export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://blogapplicationbackend-n1vm.onrender.com/api/auth/signup', userData);
        return response.data;
    } catch (error) {   
        return rejectWithValue(error.response.data);
    }
    });

// Login Action
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://blogapplicationbackend-n1vm.onrender.com/api/auth/login`, userData);
    // console.log(response.data);
    localStorage.setItem('token', response.data.jwtToken);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
