import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useUserStore from "@/stores/auth";
export default function Header(props) {
  const { children } = props;
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleLogout = () => {
    setSidebarOpen(!sidebarOpen);
    setUser(null);
    navigate("/");
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div>
    <div className="bg-green-700">
      
      <div className="hidden lg:flex justify-between items-center p-4">
        
        <div className="text-white text-lg font-bold">EduFlex</div>

       
        <div className="flex space-x-4">
          <Link to="/admin/dashboard">
            <Button className=" text-black bg-white hover:text-white hover:bg-green-700">Dashboard</Button>
          </Link>
          <Link to="/admin/students">
            <Button className="text-black bg-white hover:text-white hover:bg-green-700">Student</Button>
          </Link>
          <Link to="/admin/instructors">
            <Button className="text-black bg-white hover:text-white hover:bg-green-700">Instructor</Button>
          </Link>
          <Link to="/admin/courses">
            <Button className="text-black bg-white hover:text-white hover:bg-green-700">Courses</Button>
          </Link>
          <div className="text-black bg-white hover:text-white hover:bg-green-700 rounded-lg">
            <Button className="text-black bg-white hover:text-white hover:bg-green-700 w-24" onClick={toggleProfileMenu}>
             {user.name}
            </Button>
            {showProfileMenu && (
              <div className="text-black bg-white rounded-lg">
                <Link to="/admin/profile">
                  <Button className="w-[96px] text-black bg-white hover:text-white hover:bg-green-700 block" onClick={toggleProfileMenu}>
                    My Profile
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="w-[96px] text-black bg-white hover:text-white hover:bg-green-700 block" onClick={toggleProfileMenu}>
                    Logout
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
      
        <div className="flex justify-between items-center p-4">
          
          <div className="text-white text-lg font-bold">EduFlex</div>

         
          <Button onClick={toggleSidebar} className="text-green-500 bg-white hover:bg-green-700 hover:text-white focus:outline-none">
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

        {sidebarOpen && (
          <div className="bg-green-600">
            <Link to="/admin/dashboard">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-green-700 p-3 block" onClick={toggleSidebar}>Dashboard</Button>
            </Link>
            <Link to="/admin/students">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-green-700  p-3 block" onClick={toggleSidebar}>Student</Button>
            </Link>
            <Link to="/admin/instructors">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-green-700  p-3 block" onClick={toggleSidebar}>Instructor</Button>
            </Link>
            <Link to="/admin/courses">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-green-700  p-3 block" onClick={toggleSidebar}>Courses</Button>
            </Link>
            <div className="text-white ">
              <Button className="text-black w-[96px] ml-1 mb-1 bg-white hover:text-white hover:bg-green-700  p-2 block" onClick={toggleProfileMenu}>
                {user.name}
              </Button>
             
            </div>
            {showProfileMenu && (
                <div className="">
                  <Link to="/admin/profile">
                    <Button className="text-black w-[96px] ml-3 mb-1 bg-white hover:text-white hover:bg-green-700  block" onClick={toggleSidebar}>
                      My Profile
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="text-black w-[96px] ml-3 mb-1 bg-white hover:text-white hover:bg-green-700  block" onClick={handleLogout}>
                      Logout
                    </Button>
                  </Link>
                </div>
              )}
          </div>
          
        )}
      </div>
    
    </div>
    {children}
    </div>
  );
}
