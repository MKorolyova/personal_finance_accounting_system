import {Link} from "react-router-dom";
import React  from 'react';

export const Footer = () => {
    const today = new Date();
  
    return (
      <footer>

        <div className="footer-navigation">

          <ul className="footer-nav-list">

            <li className="footer-nav-item">
              <Link to="/Home" className="nav-link">
                <p className="nav-text">Home</p>
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link to="/Transactions" className="nav-link">
                <p className="nav-text">Transactions</p>
              </Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/Goals" className="nav-link">
                <p className="nav-text">Goals</p>
              </Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/Analytics" className="nav-link">
                <p className="nav-text">Analytics</p>
              </Link>
            </li>
          </ul>

        </div>
        <p className="footer-copy">Copyright &copy; {today.getFullYear()}</p>
      </footer>
    );
  };
