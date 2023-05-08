import React from "react";
import { AiFillStar } from "react-icons/ai";
import currency from "../../../Currency";
import { useAuth } from "../../context/GlobalState";

const StoreItems = ({ id, description, price, evaluation, img }) => {
  const { getItemQuantity, addItemToCart, removeItemToCart, removeAllItem } =
    useAuth();

  const quantity = getItemQuantity(id);

  return (
    <article className="post Product">
      <div className="Product_img">
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
      <div className="center">
        {quantity === 0 ? (
          <button className="button" onClick={() => addItemToCart(id)}>
            add To Cart
          </button>
        ) : (
          <div className="center_add_to_cart">
            <div className="div_add_to_cart">
              <button
                className="button_cart"
                onClick={() => removeItemToCart(id)}
              >
                -
              </button>
              <span>
                <span className="number_to_cart">{quantity}</span>In Cart
              </span>
              <button className="button_cart" onClick={() => addItemToCart(id)}>
                +
              </button>
            </div>
            <button className="button_remove" onClick={() => removeAllItem(id)}>
              Remove
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default StoreItems;
