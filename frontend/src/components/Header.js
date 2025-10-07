// frontend/src/components/Header.js
import { useEffect, useState } from "react";
import { devLog } from "../utils/logger";
import Menu from "./Menu";
import "../styles/header.css";

const Header = ({ roles = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    devLog("info", "[Header] Component mounted.");
    devLog("debug", "[Header] Roles passed to Menu:", roles);
  }, []);

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Friendly Happiness</h1>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      <Menu roles={roles} isOpen={menuOpen} />
    </header>
  );
};

export default Header;
