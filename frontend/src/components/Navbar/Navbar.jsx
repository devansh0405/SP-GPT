import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Navbar = () => {
  const { setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("moodleToken");
    localStorage.removeItem("moodleUsername");
    localStorage.removeItem("moodlePassword");
    sessionStorage.clear();
    navigate("/login");
  };

  // Fetch unread count from backend
  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/gmail/unread", {
        headers: { token },
      });
      setUnreadCount(res.data.length);
    } catch (err) {
      console.error("Error fetching unread:", err.message);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="logo">SP-GPT</h1>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-module"
          onClick={() => setMenu("module")}
          className={menu === "module" ? "active" : ""}
        >
          Our Modules
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-icons relative">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/notifications")}
          >
            <img className="icon noti" src={assets.notification} alt="" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <Link to="/chatbot">
            <img className="icon" src={assets.chatbot} alt="" />
          </Link>
          <img className="icon" src={assets.dark_theme} alt="" />
        </div>

        <div className="navbar-profile">
          <img className="profile_icon" src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={() => navigate("/my-progress")}>
              <img src={assets.bag_icon} alt="" />
              <p>My Progress</p>
            </li>
            <hr />
            <li onClick={logout}>
              <img src={assets.logout_icon} alt="" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
