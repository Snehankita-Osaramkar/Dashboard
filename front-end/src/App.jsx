import { useContext, useState, useEffect } from "react";
import "./App.css";
import EnhancedVendorListView from "./Components/EnhancedVendorListView/EnhancedVendorListView.jsx";
import EnhancedVendorDashboard from "./Components/EnhancedVendorDashboard/EnhancedVendorDashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar.jsx";
import { ThemeContext, ThemeProvider } from "./Context/ThemeContext";
import ToggleTheme from "./Components/ToggleTheme/ToggleTheme.jsx";
import AddNewVendorForm from "./Components/AddNewVendorForm/AddNewVendorForm.jsx";
import UpdateVenderData from "./Components/UpdateVenderData/UpdateVenderData.jsx";
import { Menu, X } from "lucide-react";
import Reports from "./Components/Reports/Reports.jsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ThemeWrapper />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function ThemeWrapper() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { themeState } = useContext(ThemeContext);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={`${themeState} parent-container`}>
      {/* Sidebar for large screens (always visible) */}
      {windowWidth > 900 && <SideBar isOpen={true} windowWidth={windowWidth}/>}

      {/* Hamburger Menu (Only for mobile) */}
      {windowWidth <= 900 && (
        <div className="hamburger" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={30} /> : <Menu size={30} />}
        </div>
      )}

      {/* Sidebar for small screens (toggle on click) */}
      {windowWidth <= 900 && (
        <>
          <SideBar isOpen={isSidebarOpen} closeSidebar={closeSidebar} windowWidth={windowWidth}/>
          {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
        </>
      )}

      <ToggleTheme />
      <Routes>
        <Route path="/" element={<EnhancedVendorDashboard />} />
        <Route path="/vendor" element={<EnhancedVendorListView />} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/admin/addvendor" element={<AddNewVendorForm />} />
        <Route path="/admin/vendor/:id" element={<UpdateVenderData />} />
      </Routes>
    </div>
  );
}

export default App;

