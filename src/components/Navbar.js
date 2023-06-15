import logo from './nysl_logo.png'
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars,  } from '@fortawesome/free-solid-svg-icons';
const Navbar = ()=> {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  
  const closeMobileMenu = ()=> setClick(false);
 
  

  return (
    <>
      
      <nav className='navbar'>
        <Link to='/' className='navbar-logo'>
        <Logo />
        Northside Youth Soccer League
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
            <Link to='/photo-board' className='nav-links' onClick={closeMobileMenu}>
              Photo Board
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/about-us' className='nav-links' onClick={closeMobileMenu}>
              About Us
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/sign-up' className='nav-links' onClick={closeMobileMenu}>
            <button className='btn'>Sign Up</button>
            </Link>
          </li>
        </ul>
      </nav>
     
    </>
  )
};


const Logo = () => (
  <>
  <img id="logo" src={ logo } alt="Northside Youth Soccer League Logo" />
  </>
);


export default Navbar;