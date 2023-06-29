import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("GoldenCart");
  
  const parseData=JSON.parse(localCartData);
  if(!Array.isArray(parseData)) return [];
  return parseData;
};


const initialState = {
  cart:getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 50,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, flavour, wt,amount,bname, product,customize,detail) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, flavour,wt, amount,bname, product,customize,detail } });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };
  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

   // to clear the cart
   const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  // to add the data in localStorage
  // get vs set
  useEffect(() => {
    dispatch({ type: "CART_TOTAL_ITEM" });
    dispatch({ type: "CART_TOTAL_PRICE" });
    localStorage.setItem("GoldenCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };