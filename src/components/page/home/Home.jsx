import React from "react";
import Product from "../products/Product";
import Slider from "../../../components/page/slider/Slider";

const Home = () => {
  return (
    <div className="container home_container margin_top">
      <Slider/>
      <Product />
    </div>
  );
};

export default Home;
