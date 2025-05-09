import React  from 'react';
import {Link} from "react-router-dom";


export const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/Home" className="nav-link">
            <p className="nav-text">Home</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Transactions" className="nav-link">
            <p className="nav-text">Transactions</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Goals" className="nav-link">
            <p className="nav-text">Goals</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Analytics" className="nav-link">
            <p className="nav-text">Analytics</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}


  
  
