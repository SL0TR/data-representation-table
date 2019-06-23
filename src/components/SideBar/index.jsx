import React from 'react';
import './sidebar.css';

const SideBar = ({ sideBar, item, onSideBarClose }) => {

  return ( 
    <div className={ sideBar ? 'sidebar open' : 'sidebar'}>
      { item && (
        <div className="photo">
          <p className="id">{item.id}</p>
          <p className="title">{item.title}</p>
          <img src={item.url} alt="Test"/>
          <p className="details">{item.thumbnailUrl}</p>
        </div>
      ) }
      <button className="close-btn" onClick={onSideBarClose}>X</button>
      
    </div>
  );
}
 
export default SideBar;