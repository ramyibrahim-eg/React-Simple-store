import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/GlobalState";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import Home from "../home/Home";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login } = useAuth();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();

  const passwordRef = useRef();

  const navigate = useNavigate();

  const location = useLocation();

  const redirectpage = location.state?.path || "/";

  const [value, setValue] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);

      navigate(redirectpage, { replace: true });
    } catch {
      setError("Failed To Login");
    }

    setLoading(false);
  };

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  return (
    <div className="login">
      <div className="container login_container margin_top">
        <h1>Sige in</h1>
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

          <button type="submit" className="button" disabled={loading}>
            Sige in
          </button>
        </form>

        <div className="center">
          <button onClick={handleClick} className="button font_size">
            <FcGoogle /> Signin With Google
          </button>
        </div>

        <div className="checked">
          Forget Password
          <Link to="/forget-password" className="link_button">
            Click here
          </Link>
        </div>
      </div>
      <div className="checked">
        Create your Account
        <Link to="/signup" className="link_button">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
