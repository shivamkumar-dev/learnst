import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const Navbar = () => {
  const user = getCurrentUser();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
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
            <li className='nav-item'>
              <Link className='nav-link' to='/quizzes'>
                Quizzes
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/resources'>
                Resources
              </Link>
            </li>
          </ul>
          {!user && (
            <>
              <Link className='nav-link' to='/login'>
                <button type='button' className='btn btn-outline-warning'>
                  Login
                </button>
              </Link>
              <Link className='nav-link' to='/signup'>
                <button type='button' className='btn btn-outline-warning'>
                  Signup
                </button>
              </Link>
            </>
          )}
          {user && (
            <>
              <p className='navbar-brand'>{user.name}</p>
              <Link className='nav-link' to='/logout'>
                <button type='button' className='btn btn-outline-warning'>
                  Logout
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
