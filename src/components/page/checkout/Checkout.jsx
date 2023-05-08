import React from "react";
import { useAuth } from "../../context/GlobalState";
import CartItem from "./CortItem";
import currency from "../../../Currency";
import data from "../../../data.json";

const Checkout = () => {
  const { cartItem, cartQuantity, currentUser } = useAuth();

  return (
    <>
      {cartQuantity === 0 ? (
        <p className="container empty_in_cart margin_top">Your cart is empty</p>
      ) : (
        <section className="checkout">
          <div className="container checkout_container margin_top">
            {currentUser ? (
              <p className="container name_user">
                Hello <span className="user_email">{currentUser.email}</span>
              </p>
            ) : (
              ""
            )}
            <>
              {cartItem.map((item) => (
                <CartItem {...item} key={item.id} />
              ))}
            </>
          </div>

          <div className="container checkout_right margin_top">
            <div className="subtotal">
              <p>
                Subtotal ( {cartQuantity} items: ){" "}
                <strong className="all_prices">
                  {currency(
                    cartItem.reduce((total, cartItem) => {
                      const item = data.find((i) => i.id === cartItem.id);
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0)
                  )}
                </strong>
              </p>
              <small className="subtotal_gift">
                <input type="checkbox" checked readOnly /> This order contains a
                gift
              </small>
              <button className="button">Proceed to Checkout</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Checkout;
