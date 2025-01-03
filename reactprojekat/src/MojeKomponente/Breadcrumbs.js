import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();

  // Razbijanje trenutne putanje na delove
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="breadcrumbs">
      <ul>
        <li>
          <Link to="/">Početna</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <li key={to}>
              <Link to={to}>{value}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
