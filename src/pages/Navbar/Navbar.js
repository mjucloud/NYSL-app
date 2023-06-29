import logo from '../../img/nysl_logo.png'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from '../MessageBoard/chat-auth';
import { faHome } from "@fortawesome/free-solid-svg-icons";



const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

      <nav className='navbar'>
        <Link to='/' className='navbar-logo'>
          <Logo />
          <span className='navbar-pageTitle'><span className='navbar-pageTitle1'>Northside</span>  <span className='navbar-pageTitle2'>Youth Soccer League</span></span>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <FontAwesomeIcon icon={click ? faTimes : faBars} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>

            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item' >
            <Link to='/games-info' className='nav-links' onClick={closeMobileMenu}>
              Games
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/rules-and-policies' className='nav-links' onClick={closeMobileMenu}>
              Rules & Policies
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/message-board' className='nav-links' onClick={closeMobileMenu}>
              Message Board
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/about-us' className='nav-links' onClick={closeMobileMenu}>
              About Us
            </Link>
          </li>
          <li className='nav-item'>
            {user?.displayName ? (

              <Link to='/sign-in' className='nav-links' onClick={handleSignOut}>
                Log Out
              </Link>
            ) : (
              <Link to='/sign-in' className='nav-links' onClick={closeMobileMenu}>
                Sign In
              </Link>
            )}
          </li>
        </ul>
        <Greetings />
      </nav>

    </>
  )
};
const Greetings = () => {
  const { user } = UserAuth();
  return (
    <div className="greetings ms-2 mt-1">

      {user?.displayName && (
        <>
          <FontAwesomeIcon icon={faHome} />
          <p className='mb-0 ms-1'>Welcome, {user.displayName}</p>
        </>
      )}
    </div>
  )
}

const Logo = () => (
  <>
    <img id="logo" src={logo} alt="Northside Youth Soccer League Logo" />
  </>
);


export default Navbar;