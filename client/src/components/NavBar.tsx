import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [logoutUser] = useLogoutMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userInfo]);

  return (
    <nav>
      <ul className='navbar'>
        <li className='nav-item'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-item'>
          <Link to='/signup'>Sign Up</Link>
        </li>
        {/* If user is logged in, display Logout, else display Login */}
        {isLoggedIn ? (
          <>
            <li className='nav-item'>
              <Link to='/playlists'>My Playlists</Link>
            </li>
            <li className='nav-item'>
              <Link onClick={handleLogout} to='/logout'>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li className='nav-item'>
            <Link to='/login'>Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
