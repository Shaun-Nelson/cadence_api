import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch(`/api/login`);

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.logged_in);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <nav>
      <ul className='navbar'>
        <li className='nav-item'>
          <Link to='/'>Home</Link>
        </li>
        {/* If user is logged in, display Logout, else display Login */}
        {isLoggedIn ? (
          <li className='nav-item'>
            <Link to='/logout'>Logout</Link>
          </li>
        ) : (
          <li className='nav-item'>
            <Link to='/login'>Login</Link>
          </li>
        )}
        <li className='nav-item'>
          <Link to='/signup'>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
