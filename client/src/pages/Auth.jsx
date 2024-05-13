import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/forms/auth/Login";
import Signup from "@/components/forms/auth/Signup";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <div className="min-h-screen bg-slate-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-main to-dark-green shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <Tabs defaultValue={path ? path : "login"} className="md:w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" onClick={() => navigate("/login")}>
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" onClick={() => navigate("/signup")}>
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Login />
              </TabsContent>
              <TabsContent value="signup">
                <Signup />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
