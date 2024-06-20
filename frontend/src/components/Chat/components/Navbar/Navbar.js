import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Navbar.scss";
import { logout } from "../../../../store/actions/auth";
import Modal from "../../../Modal/Modal";
import { updateProfile } from "../../../../store/actions/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const user = useSelector((state) => state.authReducer.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const form = { firstName, lastName, gender, email, avatar };

    const formData = new FormData();

    for (let key in form) {
      formData.append(key, form[key]);
    }
    dispatch(updateProfile(formData)).then(() => {
      setShowProfileModal(false);
    });
  };
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
            <p onClick={() => setShowProfileModal(true)}>Update Profile</p>
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        )}

        {showProfileModal && (
          <Modal onClick={() => setShowProfileModal(false)}>
            <Fragment key="header">
              <h3 className="m-0">Update profile</h3>
            </Fragment>
            <Fragment key="body">
              <form onSubmit={onSubmit}>
                <div className="input-field">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    required
                    placeholder="First Name"
                    value={firstName}
                  />
                </div>
                <div className="input-field">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                  />
                </div>
                <div className="input-field">
                  <select
                    value={gender}
                    name=""
                    id=""
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="input-field">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="input-field">
                  <input
                    onChange={(e) => setAvatar(e.target.files[0])}
                    type="file"
                  />
                </div>
              </form>
            </Fragment>
            <Fragment key="footer">
              <button className="btn-success" onClick={onSubmit}>
                UPDATE
              </button>
            </Fragment>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Navbar;
