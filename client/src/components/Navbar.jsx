import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useUserStore from "@/stores/auth";
import Logo from "./Logo";
import { ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/tutors", label: "Tutors" },
    { to: "/my-learning", label: "My Learning" },
    { to: "/teach-with-us", label: "Teach with us" },
  ];

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const uppercaseFirstLetter = user?.name[0].toUpperCase();

  return (
    <header className="header sticky top-0  shadow-md flex items-center justify-between px-8 py-4">
      <h1 className="w-3/12">
        <Link to="/">
          <Logo />
        </Link>
      </h1>

      <ul className="flex items-center">
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "p-4 mx-1 pb-3 font-inter font-semibold text-main border-b-2 border-main"
                  : "p-4 mx-1 pb-3 font-inter font-semibold text-[#444444] border-b-2 border-main border-opacity-0 hover:border-opacity-100 hover:text-main duration-200"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="w-3/12 flex justify-end items-center">
        <Link to="/">
          <ShoppingCart className="mr-6" style={{ transform: "scaleX(-1)" }} />
        </Link>

        {user !== null ? (
          <>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.pn" alt="@shadcn" />
              <AvatarFallback className="bg-slate-300">
                {uppercaseFirstLetter}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="green"
              className="font-semibold ml-4"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="green" className="font-semibold ml-4">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="green" className="font-semibold ml-4">
                Sign up
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
