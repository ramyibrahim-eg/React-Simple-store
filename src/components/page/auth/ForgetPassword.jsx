import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/GlobalState";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const emailRef = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      setLoading(true);

      await resetPassword(emailRef.current.value);

      setMessage("Check your inbox to get new password");
    } catch {
      setError("Failed to reset Password");
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <div className="container login_container margin_top">
        <h1>Forget Password</h1>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <form onSubmit={handelSubmit}>
          <fieldset>
            <legend>Email</legend>
            <input type="email" required ref={emailRef} placeholder="Email" />
          </fieldset>

          <button type="submit" className="button" disabled={loading}>
            Send
          </button>

          <div className="checked">
            <Link to="/login" className="link_button">
              Login
            </Link>
            <Link to="/signup" className="link_button">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
