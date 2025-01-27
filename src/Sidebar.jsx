import { Link } from "react-router-dom";
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
import { useState } from "react";
import cn from "./libs/utils";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: User, label: "Employee", path: null, isHeading: true },
    { icon: BarChart2, label: "Performance Report", path: "/performance-report" },
    { icon: FileText, label: "Things to Work On", path: "/things-to-work-on" },
    { icon: Brain, label: "AI Coach", path: "/AI-coach" },
    // { icon: UserCog, label: "HR Admin", path: null, isHeading: true },
    // { icon: FileText, label: "Performance Reports", path: "/performance-reports" },
    // { icon: BookOpen, label: "Analysis Guidelines", path: "/analysis-guidelines" },
    // { icon: Settings, label: "User Setup", path: "#" },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300 fixed",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2
          className={cn(
            "font-semibold transition-all duration-300",
            isCollapsed ? "text-sm text-center" : "text-xl"
          )}
        >
          {isCollapsed ? "PAA" : "Performance Analysis Agent"}
        </h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item, index) => {
          if (item.isHeading) {
            // Render heading-style item
            return (
              <div
                key={index}
                className={cn(
                  "px-4 py-3 text-gray-500 text-[12px] font-medium uppercase tracking-wide",
                  isCollapsed ? "hidden" : "block"
                )}
              >
                <item.icon size={20} className="mr-2 inline" />
                {item.label}
              </div>
            );
          }
          // Render regular link
          return (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors",
                isCollapsed ? "justify-center" : "space-x-3"
              )}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
