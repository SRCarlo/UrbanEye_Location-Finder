import React from "react";
import { FaGithub, FaLaptopCode } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const githubUrl = "https://github.com/SRCarlo";

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "12px 0",
        fontWeight: "600",
        fontSize: "1rem",
        color: "#2d2c2cff",
        userSelect: "none",
        letterSpacing: "1.5px",
        backgroundColor: "transparent",
        borderTop: "1px solid #b5ababff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        flexShrink: 0,
        height: "40px",
      }}
      aria-label="Footer"
    >
      <span>© {currentYear}</span>
      <span>Developed by</span>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#000000ff",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        aria-label="Cyber GitHub profile"
      >
        Cyber <FaLaptopCode aria-hidden="true" />
      </a>
    </footer>
  );
};

export default Footer;
