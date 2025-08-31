import { NavLink } from "react-router";
import React from "react";
import { LayoutDashboard, Users, UserPlus } from "lucide-react";


export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg p-4 flex flex-col md:h-screen border-r border-blue-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          Admin Panel
        </h2>
      </div>
      
      <nav className="flex flex-col gap-1">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-md transform scale-[1.02]"
                : "text-blue-700 hover:bg-blue-200 hover:text-blue-900 hover:shadow-sm hover:transform hover:scale-[1.01]"
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
    
        <NavLink
          to="members"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-md transform scale-[1.02]"
                : "text-blue-700 hover:bg-blue-200 hover:text-blue-900 hover:shadow-sm hover:transform hover:scale-[1.01]"
            }`
          }
        >
          <Users className="w-5 h-5" />
          Members
        </NavLink>
    
        <NavLink
          to="addmember"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-md transform scale-[1.02]"
                : "text-blue-700 hover:bg-blue-200 hover:text-blue-900 hover:shadow-sm hover:transform hover:scale-[1.01]"
            }`
          }
        >
          <UserPlus className="w-5 h-5" />
          Add Member
        </NavLink>
      </nav>
      
      {/* Optional: Add a subtle footer */}
      <div className="mt-auto pt-4 border-t border-blue-200">
        <div className="text-xs text-blue-600 text-center">
          Admin Dashboard v1.0
        </div>
      </div>
    </aside>
  );
}
