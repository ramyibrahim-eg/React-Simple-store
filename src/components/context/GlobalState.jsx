import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, provider } from "../../firebase";

const initialCartItem = localStorage.getItem("item-in-cart")
  ? JSON.parse(localStorage.getItem("item-in-cart"))
  : [];

const GlobalState = createContext({});

const Globalprovider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const [cartItem, setCartItem] = useState(initialCartItem);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  };

  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };

  // buy item to cart
  const getItemQuantity = (id) => {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  };

  const addItemToCart = (id) => {
    setCartItem((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeItemToCart = (id) => {
    setCartItem((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeAllItem = (id) => {
    setCartItem((currItems) => currItems.filter((item) => item.id !== id));
  };

  const cartQuantity = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem("item-in-cart", JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    const unUser = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
    return () => {
      unUser();
    };
  }, [currentUser]);

  return (
    <GlobalState.Provider
      value={{
        currentUser,
        signup,
        login,
        resetPassword,
        logout,
        updateUserEmail,
        updateUserPassword,
        cartItem,
        getItemQuantity,
        addItemToCart,
        removeItemToCart,
        removeAllItem,
        cartQuantity,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export default Globalprovider;

export const useAuth = () => {
  return useContext(GlobalState);
};
