import React, { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import currency from "../../../Currency";
import data from "../../../data";

const Slider = () => {
  const [i, setI] = useState(0);
  const { description, price, evaluation, img } = data[i];

  const btnLeft = () => {
    setI((prev) => prev - 1);
    if (i < 0) {
      setI(data.length - 1);
    }
  };

  const btnRight = () => {
    setI((prev) => prev + 1);
    if (i >= data.length - 1) {
      setI(0);
    }
  };

  return (
    <section className="slider slider_border">
      <div className="containt slider_containt">
        <div className="slider">
          <div className="slider_img">
            <img src={img} alt={description} />
          </div>
          <p className="description">{description}</p>
          <div className="center">
            <p className="price">{currency(price)}</p>
          </div>
          <div className="center">
            <p className="evaluation">
              {Array(evaluation)
                .fill()
                .map((_, i) => (
                  <AiFillStar className="evaluation_icon" key={i} />
                ))}
            </p>
          </div>
        </div>
      </div>
      <div className="slider_btn_container">
        <button className="slider_btn">
          <IoIosArrowDropleftCircle className="btn_next" onClick={btnLeft} />
        </button>
        <button className="slider_btn">
          <IoIosArrowDroprightCircle className="btn_next" onClick={btnRight} />
        </button>
      </div>
    </section>
  );
};

export default Slider;
