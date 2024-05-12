import Logo from "@/components/Logo";
import useUserStore from "@/stores/auth";
import axios from "axios";
import { Power } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("https://udemy.dev/api/users/signout")
      .then((response) => {
        // console.log(response.data);
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.error?.message || error.message);
      });
  };

  return (
    <div className="px-4 py-4 border-b border-black/10 flex justify-between items-center">
      <Logo />
      <Power onClick={handleLogout} className="cursor-pointer" />
    </div>
  );
};

export default Navbar;
