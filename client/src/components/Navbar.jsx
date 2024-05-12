import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../assets/search.png";
import ShoppingCartIcon from "../assets/cart.png";
import { Button } from "./ui/button";

export default function Header() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/tutors", label: "Tutors" },
    { to: "/my-learning", label: "My Learning" },
    { to: "/teach-with-us", label: "Teach with us" },
  ];

  return (
    <header className="header sticky top-0  shadow-md flex items-center justify-between px-8 py-2">
      <h1 className="w-3/12">
        <Link to="/">Logo</Link>
      </h1>

      <ul className="flex items-center">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className="p-4 border-b-2 border-main border-opacity-0 hover:border-opacity-100 hover:text-main duration-200 active"
          >
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <div className="w-3/12 flex justify-end">
        <Link to="/">
          <img
            src={SearchIcon}
            alt="Search"
            className="h-8 p-1 hover:text-dark-green duration-200"
          />
        </Link>
        <Link to="/">
          <img
            src={ShoppingCartIcon}
            alt="Shopping Cart"
            className="h-8 p-1 hover:text-dark-green duration-200"
          />
        </Link>

        <Button className="bg-main font-semibold ml-4 hover:bg-dark-green duration-200">
          Log out
        </Button>
        <Button className="bg-main font-semibold ml-4 hover:bg-dark-green duration-200">
          <Link to="/login">Log in</Link>
        </Button>
      </div>
    </header>
  );
}
