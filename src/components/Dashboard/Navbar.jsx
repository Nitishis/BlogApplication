import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/authReducer";
import { ToastContainer } from "react-toastify";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Get the current user from the Redux store
  const { user } = useSelector((state) => state.auth);
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); 
    setActiveTab('home'); // Reset activeTab to 'home' on logout
    navigate('/');
  };

  const handleMenuClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Reset activeTab to 'home' when the user logs out (token is removed)
    if (!user && !token) {
      setActiveTab('home');
    }
  }, [user, token]); // Dependency array ensures it triggers when user or token changes

  return (
    <div className="navbar md:pl-14">
      <div className="navbar-start md:pl-40">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ${isMenuOpen ? "block" : "hidden"}`}
          >
            <li>
              <Link
                to="/"
                className={`text-xl border-b-2 ${activeTab === 'home' ? 'border-[#FC9C47]' : 'border-[#292a60]'} bg-[#FC9C47] rounded-none`}
                onClick={() => handleMenuClick('home')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`text-xl border-b-2 ${activeTab === 'blog' ? 'border-[#FC9C47]' : 'border-[#292a60]'} bg-[#FC9C47] rounded-none`}
                onClick={() => handleMenuClick('blog')}
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="hover:bg-[#FC9C47] border-[#292a60] border-2 text-xl"
        >
          <img src="/logo.svg" alt="Logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal">
          <li className="mr-8">
            <span className="relative group text-xl text-[#292a60] font-semibold cursor-pointer">
              <Link
                to="/"
                onClick={() => setActiveTab('home')}
                className={activeTab === 'home' ? 'text-[#FC9C47]' : ''}
              >
                HOME
              </Link>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[2px] bg-[#292a60]"></span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-[#FC9C47] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </li>
          <li className="mr-8">
            <span className="relative group text-xl text-[#292a60] font-semibold cursor-pointer">
              <Link
                to="/blog"
                onClick={() => setActiveTab('blog')} 
                className={activeTab === 'blog' ? 'text-[#FC9C47]' : ''}
              >
                BLOGS
              </Link>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[2px] bg-[#292a60]"></span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-[#FC9C47] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </li>
        </ul>
      </div>

      <div className="navbar-end justify-center gap-2">
        {user || token ? (
          <div className="flex items-center space-x-2">
            <span>Welcome</span>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-4 rounded-full ring ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>{" "}
            <span className="text-[#292a60] font-medium">{user ? user.name : "Guest"}</span>
            <button
              onClick={handleLogout}
              className=" btn bg-[#FC9C47] rounded-none border-[#292a60] border-2 pb-1 min-h-[2rem] h-[2rem] hover:bg-[#fc9b47c6] hover:border-[#292a60] text-[#292a60] "
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="my-btn-style">
              LogIn
            </Link>
            <Link to="/signup" className="my-btn-style px-0">
              SignUp
            </Link>
          </>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Navbar;
