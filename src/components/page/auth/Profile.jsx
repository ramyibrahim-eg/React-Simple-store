import React, { useRef, useState } from "react";
import { useAuth } from "../../context/GlobalState";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, updateUserEmail, updateUserPassword, logout } =
    useAuth();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();

  const passwordRef = useRef();

  const passwordConfirmRef = useRef();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password Do Not Match");
    }
    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        navigate("/profile");
        setMessage("Profile updated");
      })
      .catch(() => {
        setError("Failed To Update Account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/profile");
    } catch {
      setError("Failed To Logout");
    }
  };

  return (
    <div className="login">
      <div className="container login_container margin_top">
        <h1>Profile</h1>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <form onSubmit={handelSubmit}>
          <fieldset>
            <legend>Email</legend>
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser?.email}
              placeholder="Email"
            />
          </fieldset>

          <fieldset>
            <legend>Password</legend>
            <input type="password" ref={passwordRef} placeholder="Password" />
          </fieldset>

          <fieldset>
            <legend>Confirm Password</legend>
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="Confirm Password"
            />
          </fieldset>

          <button type="submit" className="button" disabled={loading}>
            Update
          </button>
        </form>
        <div className="checked">
          <button className="button" onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>
      <div className="checked">
        <Link to="/" className="cansel">
          Cansel
        </Link>
      </div>
    </div>
  );
};

export default Profile;
