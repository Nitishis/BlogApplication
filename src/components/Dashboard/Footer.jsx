import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer text-[#292a60] p-4 flex items-center justify-between px-8 md:px-56">
      <div className="flex items-center gap-4">
        <img
          className="border-[#292a60] border-2 p-1"
          src="/logo.svg"
          alt="Logo"
          style={{ height: '38px' }} 
        />
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </div>
      <nav className="flex gap-4">
        <a href="#" className="text-2xl">
          <FaTwitter />
        </a>
        <a href="#" className="text-2xl">
          <FaYoutube />
        </a>
        <a href="#" className="text-2xl">
          <FaFacebookF />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
