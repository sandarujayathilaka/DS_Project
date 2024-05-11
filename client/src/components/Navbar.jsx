import React from "react";
// import LogoIcon from './assets/logo.svg';
import SearchIcon from "../assets/search.png";
import ShoppingCartIcon from "../assets/cart.png";

export default function Header() {
  return (
    <header className="header sticky top-0 bg-orange-100 shadow-md flex items-center justify-between px-8 py-2">
      {/* Logo */}
      <h1 className="w-3/12">
        <a href="/">
          {/* <img src={LogoIcon} alt="Logo" className="h-6 w-auto hover:text-cyan-500 duration-200" /> */}
        </a>
      </h1>

      {/* Navigation */}
      <nav className="nav font-semibold text-lg">
        <ul className="flex items-center">
          <li className="p-4 border-b-2 border-cyan-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer active">
            <a href="/">Home</a>
          </li>
          <li className="p-4 border-b-2 border-cyan-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer active">
            <a href="/">About</a>
          </li>
          <li className="p-4 border-b-2 border-cyan-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
            <a href="/">Courses</a>
          </li>
          <li className="p-4 border-b-2 border-cyan-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
            <a href="/">Tutors</a>
          </li>
          <li className="p-4 border-b-2 border-cyan-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
            <a href="/">My Learning</a>
          </li>
          <li className="p-4 border-b-2 border-cyan-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
            <a href="/">Teach with us</a>
          </li>
        </ul>
      </nav>

      {/* Buttons */}
      <div className="w-3/12 flex justify-end">
        <a href="/">
          <img
            src={SearchIcon}
            alt="Search"
            className="h-8 p-1 hover:text-cyan-500 duration-200"
          />
        </a>
        <a href="/">
          <img
            src={ShoppingCartIcon}
            alt="Shopping Cart"
            className="h-8 p-1 hover:text-cyan-500 duration-200"
          />
        </a>
        <button className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-md ml-4 hover:bg-cyan-600 duration-200">
          {" "}
          Log out{" "}
        </button>
      </div>
    </header>
  );
}
