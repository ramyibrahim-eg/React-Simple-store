import React from "react";
import {
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillFacebook,
} from "react-icons/ai";
import { FaYoutubeSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer_title">
        CopyRights &copy;{" "}
        <Link to="https://disgin.website/" target="_blank">
          Ramy Ibrahim
        </Link>
      </p>
      <div className="social_icons">
        <Link>
          <AiFillLinkedin />
        </Link>
        <Link>
          <AiFillTwitterSquare />
        </Link>
        <Link>
          <AiFillFacebook />
        </Link>
        <Link>
          <FaYoutubeSquare />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
