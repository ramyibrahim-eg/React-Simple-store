import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/page/home/Home";
import Navbar from "./components/page/header/Navbar";
import NotFound from "./components/page/404/NotFound";
import Footer from "./components/page/footer/Footer";
import Signup from "./components/page/auth/Signup";
import Login from "./components/page/auth/Login";
import ForgetPassword from "./components/page/auth/ForgetPassword";
import Profile from "./components/page/auth/Profile";
import RequiredAuth from "./components/context/RequiredAuth";
import AlreadyRegistered from "./components/context/AlreadyRegistered";
import Checkout from "./components/page/checkout/Checkout";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/signup"
          element={
            <AlreadyRegistered>
              <Signup />
            </AlreadyRegistered>
          }
        />

        <Route
          path="/login"
          element={
            <AlreadyRegistered>
              <Login />
            </AlreadyRegistered>
          }
        />

        <Route
          path="/forget-password"
          element={
            <AlreadyRegistered>
              <ForgetPassword />
            </AlreadyRegistered>
          }
        />

        <Route
          path="/profile"
          element={
            <RequiredAuth>
              <Profile />
            </RequiredAuth>
          }
        />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
