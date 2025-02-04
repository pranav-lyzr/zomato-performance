import { useState } from "react";
import { User, UserCog } from "lucide-react";
import logo from './assets/main logo.png';

const Navbar = ({ onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState("employee");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    onRoleChange(role);
  };

  return (
    <div className="top-0 left-0 right-0 sticky">
      {/* Demo Banner */}
      <div className="bg-[#f7f2fe] h-8  w-full mx-auto">
        <p className="text-sm text-[#292929] font-semibold pt-1.5 text-center mx-auto">Demo App by Lyzr. Need a customized agent?<a target="_blank" href="https://www.lyzr.ai/book-demo/" className="text-purple-500 font-semibold border-2 border-purple-400 cursor-pointer bg-[#ffffff] p-1 px-1.5 rounded-xl hover:text-[#8923e8]  hover:shadow-lg ml-2">Speak to a specialist</a></p>
      </div>
      {/* Main Navbar */}
      <div className="bg-white shadow-sm px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Bank Icon" 
              className="h-12 w-auto pr-2 border-r border-r-[#9d9d9d]"
            />
            <div className="items-baseline space-x-1">
              <h1 className="text-l font-bold text-gray-900">Performance Analysis</h1>
              <h1 className="text-2xl -mt-2 font-bold text-purple-500">Agent</h1>
            </div>
          </div>
          {/* Role Selection */}
          <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-lg">
            <button
              onClick={() => handleRoleChange("employee")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                selectedRole === "employee"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <User size={20} />
              <span>Employee</span>
            </button>
            <button
              onClick={() => handleRoleChange("admin")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                selectedRole === "admin"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <UserCog size={20} />
              <span>HR Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
