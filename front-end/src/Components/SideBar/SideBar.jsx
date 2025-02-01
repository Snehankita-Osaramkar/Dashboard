import React from "react";
import "./SideBar.scss";
import { FileText, Home, LogOut, Settings, Users, X } from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, closeSidebar, windowWidth }) => {
  return (
    <aside className={`sideBar ${isOpen ? "open" : "closed"}`}>
      {/* Close button (only for mobile) */}
      {
        (windowWidth <= 900) && 
      <button className="close-btn" onClick={closeSidebar}>
        <X size={24} />
      </button>
      }

      <nav>
        <Link to="/" onClick={closeSidebar}>
          <button>
            <Home />
            <span>Dashboard</span>
          </button>
        </Link>
        <Link to="/vendor" onClick={closeSidebar}>
          <button>
            <Users />
            <span>Vendors</span>
          </button>
        </Link>
        <Link to="/reports" onClick={closeSidebar}>
          <button>
            <FileText />
            <span>Reports</span>
          </button>
        </Link>
        <Link to="/admin/addvendor" onClick={closeSidebar}>
          <button>
            <Settings />
            <span>Add New Vendor</span>
          </button>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="logout">
        <button onClick={() => alert("Logging out...")}>
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

