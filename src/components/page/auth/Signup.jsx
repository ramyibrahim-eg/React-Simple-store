import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/GlobalState";

const Signup = () => {
  const { signup } = useAuth();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();

  const passwordRef = useRef();

  const passwordConfirmRef = useRef();

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password Do Not Match");
    }

    try {
      setError("");

      setLoading(true);

      await signup(emailRef.current.value, passwordRef.current.value);

      navigate("/");
    } catch {
      setError("Failed To Create An Account");
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <div className="container login_container margin_top">
        <h1>Sign up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handelSubmit}>
          <fieldset>
            <legend>Email</legend>
            <input type="email" required ref={emailRef} placeholder="Email" />
          </fieldset>

          <fieldset>
            <legend>Password</legend>
            <input
              type="password"
              required
              ref={passwordRef}
              placeholder="Password"
            />
          </fieldset>

          <fieldset>
            <legend>Confirm Password</legend>
            <input
              type="password"
              required
              ref={passwordConfirmRef}
              placeholder="Confirm Password"
            />
          </fieldset>

          <div className="checked">
            <input type="checkbox" checked value="checked" readOnly />
            By continuing, you agree to the Terms of Us & Privacy Policy
          </div>

          <button type="submit" className="button" disabled={loading}>
            Sign up
          </button>
        </form>
      </div>
      <div className="checked">
        Create your Account
        <Link to="/login" className="link_button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
