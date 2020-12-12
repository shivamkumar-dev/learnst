import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      className='navbar navbar-expand-lg navbar-dark bg-dark'
      aria-label='Eighth navbar example'
    >
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Learnst: Learn & Test
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarsExample07'
          aria-controls='navbarsExample07'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarsExample07'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item active'>
              <NavLink className='nav-link' aria-current='page' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='quizzes'>
                Quizzes
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='resources'>
                Resources
              </NavLink>
            </li>
          </ul>
          <button type='button' class='btn btn-outline-warning me-3'>
            Login
          </button>
          <button type='button' class='btn btn-outline-warning me-3'>
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
