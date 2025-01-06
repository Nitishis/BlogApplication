import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";
import Home from "../pages/Home/Home";
import Blog from "../pages/Blog/Blog";
import CreateBlog from "../pages/Blog/CreateBlog";
import Footer from "../components/Dashboard/Footer";
import Login from "../components/Login";
import Register from "../components/Registration";
import PrivateRoute from "./privateRoute";

// Define routes
const routes = [
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/blog",
    element: (
      <>
        <Navbar />
        <Blog />
      </>
    ),
  },
  {
    path: "/create-blog",
    element: (
      <PrivateRoute>
        <Navbar />
        <CreateBlog />
        <Footer />
      </PrivateRoute>
    ), 
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
];

// Create the browser router
const router = createBrowserRouter(routes);

export default router;
