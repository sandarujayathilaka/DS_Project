import Logo from "@/components/Logo";
import useUserStore from "@/stores/auth";
import { Power } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="px-4 py-4 border-b border-black/10 flex justify-between items-center">
      <Logo />
      <Power onClick={handleLogout} className="cursor-pointer" />
    </div>
  );
};

export default Navbar;
