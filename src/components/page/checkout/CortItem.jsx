import React from "react";
import data from "../../../data.json";
import currency from "../../../Currency";
import { AiFillStar } from "react-icons/ai";
import { useAuth } from "../../context/GlobalState";

const CartItem = ({ id, quantity }) => {
  const { addItemToCart, removeAllItem } = useAuth();

  const item = data.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <section className="cartItem">
      <div className="container cartItem_container">
        <article className="post cartItem">
          <div className="cartItem_img">
            <img src={item.img} alt={item.description} />
          </div>

          <div className="cartitem_info">
            <p className="description">{item.description}</p>
            <div className="all_info">
              <div className="center">
                <p className="price">{currency(item.price)}</p>
              </div>
              <div className="center">
                <p className="evaluation">
                  {Array(item.evaluation)
                    .fill()
                    .map((_, i) => (
                      <AiFillStar className="evaluation_icon" key={i} />
                    ))}
                </p>
              </div>
              <div className="center">
                {quantity === 0 ? (
                  <button
                    className="button"
                    onClick={() => addItemToCart(item.id)}
                  >
                    add To Cart
                  </button>
                ) : (
                  <div className="center_add_to_cart">
                    <div className="div_add_to_cart">
                      <button
                        className="button_cart colors"
                        onClick={() => removeAllItem(item.id)}
                      >
                        &times;
                      </button>
                      <span>
                        <span className="number_to_cart">{quantity}</span>In
                        Cart
                      </span>
                      <button
                        className="button_cart"
                        onClick={() => addItemToCart(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="center">
                <p className="all_price">{currency(item.price * quantity)}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CartItem;
