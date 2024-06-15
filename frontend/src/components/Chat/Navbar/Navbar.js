import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Navbar.scss";
import { logout } from "../../../store/actions/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div id="navbar">
      <h2>Chat.io</h2>
      <div
        onClick={() => setShowProfileOptions(!showProfileOptions)}
        id="profile-menu"
      >
        <img width="40" height="40" src={user.avatar} alt="Avatar" />
        <p>
          {user.firstName} {user.lastName}
        </p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" />
        {showProfileOptions && (
          <div id="profile-options">
            <p>Update Profile</p>
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
