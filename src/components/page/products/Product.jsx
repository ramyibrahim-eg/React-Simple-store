import React, { useState } from "react";
import data from "../../../data.json";
import StoreItems from "./StoreItems";
import spinner from "./spinner.gif";
import LoadingSpinnerButton from "./LoadingSpinnerButton";

const Product = () => {
  const [i, setI] = useState(3);
  const [showButton, setShowButton] = useState(true);

  const [loading, setLoading] = useState(false);

  let readMore = data.slice(0, i);

  const readMoreItem = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setI((prev) => prev + 3);
      if (i > data.length - 4) {
        setShowButton(false);
      }
    }, 2000);
  };

  return (
    <section className="Product">
      <div className="container Product_container">
        {readMore.map((item) => (
          <StoreItems {...item} key={item.id} />
        ))}
      </div>
      <div className="center">
        {showButton && (
          <LoadingSpinnerButton
            className="button"
            onClick={readMoreItem}
            title={"Load More"}
            loading={loading}
          ></LoadingSpinnerButton>
        )}
      </div>
    </section>
  );
};

export default Product;
