import React from "react";
import dataTableIcon from '../../static/data-table.svg';
import './navbar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <img className="navbar--logo" src={dataTableIcon} alt="data table icon"/> 
    </nav>
  );
}
