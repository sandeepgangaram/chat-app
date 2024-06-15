import { useSelector } from "react-redux";
import "./Navbar.scss";

const Navbar = () => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div id="navbar">
      <h2>Chat.io</h2>
      <div id="profile-menu">
        <p>
          {user.firstName} {user.lastName}
        </p>
        <img src="" alt="Avatar" />
      </div>
    </div>
  );
};

export default Navbar;
