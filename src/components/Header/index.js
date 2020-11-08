import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
            <div className="logotype">
              <Link to="/"><span>Alexey Rybalko</span></Link>
            </div>
            <ul className="menu">
              <li className="menu__item">
                <Link to="/projects">Projects</Link>
              </li>
              <li className="menu__item">
                <Link to="/about">About</Link>
              </li>
              <li className="menu__item">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Header;