import Logo from "@/components/Logo";
import useUserStore from "@/stores/auth";
import { Power } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const uppercaseFirstLetter = user.name[0].toUpperCase();

  return (
    <div className="px-4 py-4 border-b border-black/10 flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-5">
        <span className="font-inter">Instructor</span>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.pn" alt="@shadcn" />
          <AvatarFallback className="bg-slate-300">
            {uppercaseFirstLetter}
          </AvatarFallback>
        </Avatar>
        <Power onClick={handleLogout} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
