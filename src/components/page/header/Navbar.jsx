import React, { useState } from "react";
import logo from "./logo.webp";
import { Link, NavLink } from "react-router-dom";
import { GoThreeBars } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuth } from "../../context/GlobalState";

const Navbar = () => {
  const { currentUser, cartQuantity } = useAuth();

  const [isNavShoing, setIsNavShoing] = useState(false);

  document.addEventListener("click", function () {
    if (isNavShoing === true) {
      setIsNavShoing(false);
    }
  });

  const towClick = (e) => {
    e.stopPropagation();
    setIsNavShoing(!isNavShoing);
  };

  return (
    <nav>
      <div className="container nav_container">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>

        <div className="header_search">
          <input className="header-searchInput" type="text" />
          <BsSearch className="search_icon" />
        </div>

        <ul className={`nav_links ${isNavShoing ? "nav_show" : "nav_hide"}`}>
          <li className="nav_links">
            <NavLink to={currentUser ? "/profile" : "/login"}>
              <div className="header_option">
                <span className="header_option_Line_One">
                  Hello{" "}
                  {currentUser ? (
                    <span className="color">{currentUser.email}</span>
                  ) : (
                    "Gest"
                  )}
                </span>
                <span className="header_option_Line_Two">
                  {currentUser ? "profile" : "Sign In"}
                </span>
              </div>
            </NavLink>

            <NavLink to="/orders">
              <div className="header_option">
                <span className="header_option_Line_One">Returns</span>
                <span className="header_option_Line_Two">&amp; Orders</span>
              </div>
            </NavLink>

            <NavLink to="/checkout">
              <div className="header_option">
                <div className="header_option_number_cart">
                  <AiOutlineShoppingCart className="cart_icon" />
                  <span className="number_cart">{cartQuantity}</span>
                </div>
              </div>
            </NavLink>
          </li>
        </ul>
        <button className="nav_toggle_btn" onClick={towClick}>
          {isNavShoing ? (
            <FaTimes className="bars_icon" />
          ) : (
            <GoThreeBars className="bars_icon" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
