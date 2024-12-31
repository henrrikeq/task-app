import React, { useState } from 'react';
import './Sidebar.css'; // Make sure to import the CSS file

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <ul className="sidebar-menu">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Tasks</a></li>
          <li><a href="#">Messages</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </div>
      <button className="open-btn" onClick={toggleSidebar}>
        ☰
      </button>
    </div>
  );
};

export default Sidebar;
