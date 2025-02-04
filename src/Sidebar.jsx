import { Link } from "react-router-dom";
import { useState } from "react";
import {
  User,
  BarChart2,
  Brain,
  UserCog,
  FileText,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ currentRole }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: User, label: "Employee", path: null, isHeading: true, role: "employee" },
    { icon: BarChart2, label: "Performance Report", path: "/", role: "employee" },
    { icon: FileText, label: "Things to Work On", path: "/things-to-work-on", role: "employee" },
    { icon: Brain, label: "AI Coach", path: "/AI-coach", role: "employee" },
    { icon: UserCog, label: "HR Admin", path: null, isHeading: true, role: "admin" },
    { icon: FileText, label: "Performance Reports", path: "/performance-reports", role: "admin" },
    { icon: BookOpen, label: "Analysis Guidelines", path: "/analysis-guidelines", role: "admin" },
    { icon: Settings, label: "User Setup", path: "#", role: "admin" },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.role === currentRole);
  
  console.log(currentRole, filteredMenuItems); // Debugging the role and filtered items

  return (
    <div
      className={`h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300 fixed top-30.5 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className={`font-semibold transition-all duration-300 ${isCollapsed ? "text-sm text-center" : "text-xl"}`}>
          {isCollapsed ? "PAA" : "Performance Analysis Agent"}
        </h2>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-gray-100 rounded-lg">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div> */}
      <nav className="mt-4">
        {filteredMenuItems.map((item, index) => (
          item.isHeading ? (
            <div
              key={index}
              className={`px-4 py-3 text-gray-500 text-[12px] font-medium uppercase tracking-wide ${isCollapsed ? "hidden" : "block"}`}
            >
              <item.icon size={20} className="mr-2 inline" />
              {item.label}
            </div>
          ) : (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${isCollapsed ? "justify-center" : "space-x-3"}`}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
