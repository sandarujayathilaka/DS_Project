import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="bg-blue-500">
      {/* Horizontal Header (for larger screens) */}
      <div className="hidden lg:flex justify-between items-center p-4">
        {/* Logo or Brand */}
        <div className="text-white text-lg font-bold">Your Brand</div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/dashboard">
            <Button className=" text-black bg-white hover:text-white hover:bg-blue-600">Dashboard</Button>
          </Link>
          <Link to="/student">
            <Button className="text-black bg-white hover:text-white hover:bg-blue-600">Student</Button>
          </Link>
          <Link to="/instructor">
            <Button className="text-black bg-white hover:text-white hover:bg-blue-600">Instructor</Button>
          </Link>
          <Link to="/course">
            <Button className="text-black bg-white hover:text-white hover:bg-blue-600">Courses</Button>
          </Link>
          <div className="text-black bg-white hover:text-white hover:bg-blue-600 rounded-lg">
            <Button className="text-black bg-white hover:text-white hover:bg-blue-600" onClick={toggleProfileMenu}>
              Username
            </Button>
            {showProfileMenu && (
              <div className="text-black bg-white rounded-lg">
                <Link to="/profile">
                  <Button className="w-[96px] text-black bg-white hover:text-white hover:bg-blue-600 block" onClick={toggleProfileMenu}>
                    My Profile
                  </Button>
                </Link>
                <Link to="/logout">
                  <Button className="w-[96px] text-black bg-white hover:text-white hover:bg-blue-600 block" onClick={toggleProfileMenu}>
                    Logout
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vertical Sidebar with Toggle Button (for smaller screens) */}
      <div className="lg:hidden">
        {/* Hamburger Icon */}
        <div className="flex justify-between items-center p-4">
          {/* Logo or Brand */}
          <div className="text-white text-lg font-bold">Your Brand</div>

          {/* Hamburger Icon Button */}
          <Button onClick={toggleSidebar} className="text-blue-500 bg-white hover:bg-blue-600 hover:text-white focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>

        {/* Sidebar Navigation (conditionally rendered) */}
        {sidebarOpen && (
          <div className="bg-blue-700">
            <Link to="/dashboard">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-blue-600 p-3 block" onClick={toggleSidebar}>Dashboard</Button>
            </Link>
            <Link to="/student">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-blue-600  p-3 block" onClick={toggleSidebar}>Student</Button>
            </Link>
            <Link to="/instructor">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-blue-600  p-3 block" onClick={toggleSidebar}>Instructor</Button>
            </Link>
            <Link to="/course">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-blue-600  p-3 block" onClick={toggleSidebar}>Courses</Button>
            </Link>
            <div className="text-white ">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-blue-600  p-2 block" onClick={toggleProfileMenu}>
                Username
              </Button>
             
            </div>
            {showProfileMenu && (
                <div className="">
                  <Link to="/profile">
                    <Button className="text-black w-[96px] ml-3 mb-1 bg-white hover:text-white hover:bg-blue-600  block" onClick={toggleSidebar}>
                      My Profile
                    </Button>
                  </Link>
                  <Link to="/logout">
                    <Button className="text-black w-[96px] ml-3 mb-1 bg-white hover:text-white hover:bg-blue-600  block" onClick={toggleSidebar}>
                      Logout
                    </Button>
                  </Link>
                </div>
              )}
          </div>
          
        )}
      </div>
      
    </div>
  );
}
