import React from "react";
import { createContext, useState, useContext,useEffect } from "react";
import { toast } from "react-hot-toast";

const context = createContext();
const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalquantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  useEffect(()=>{
    if(localStorage.getItem("cartItems")){
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    }
    if(localStorage.getItem("totalPrice")){
      setTotalPrice(JSON.parse(localStorage.getItem("totalPrice")))
    }
    if(localStorage.getItem("totalquantities")){
      setTotalQuantities(JSON.parse(localStorage.getItem("totalquantities")))
    }
  },[]);
  const incQty = () => {
      setQty(prevQty=>prevQty+1);
  };
  const decQty = () => {
      if(qty==1){
        return setQty(1);
      }
      setQty(prevQty=>prevQty-1);
  };

  const onAdd = (product, quantity) => {
      const checkProductInCart = cartItems.find(
        (item) => item._id === product._id
      );

      localStorage.setItem("totalPrice",JSON.stringify(totalPrice + (product.price* quantity)))
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    localStorage.setItem("totalquantities",JSON.stringify(totalquantities + quantity))

    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return {
            ...cartProduct
        }
      });

      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems",JSON.stringify(updatedCartItems));
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
      localStorage.setItem("cartItems",JSON.stringify([...cartItems, { ...product }]));
    }
    setQty(1);
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const toggleCartItemQuantity = (id,value)=>{
    foundProduct = cartItems.find(item=>item._id===id);
    if(value==="inc"){
      let testCartItems = cartItems.map(item=>{
        if(item._id===id){
          return {...item,quantity:item.quantity +1}
        }
        return item
      })
        setCartItems(testCartItems);
        localStorage.setItem("cartItems",testCartItems);
        
        localStorage.setItem("totalPrice",JSON.stringify(totalPrice + foundProduct.price))
        setTotalPrice(prevTotalPrice=>prevTotalPrice + foundProduct.price)
        localStorage.setItem("totalquantities",JSON.stringify(totalquantities + 1))
        setTotalQuantities(prevTotalQuantity=>prevTotalQuantity + 1)
    }else if(value==="dec"){
      let testCartItems = cartItems.map(item=>{
        if(item._id===id){
          return {...item,quantity:item.quantity -1}
        }
        return item
      })
        

        if(foundProduct.quantity>1){
          setCartItems(testCartItems);
          localStorage.setItem("cartItems",testCartItems);

          localStorage.setItem("totalPrice",JSON.stringify(totalPrice - foundProduct.price))
          setTotalPrice(prevTotalPrice=>prevTotalPrice - foundProduct.price)
          localStorage.setItem("totalquantities",JSON.stringify(totalquantities - 1))
          setTotalQuantities(prevTotalQuantity=>prevTotalQuantity - 1)
        }else{
            return
        }
    }
  }

  const onRemove = (product)=>{
    foundProduct = cartItems.find(item=>item._id===product._id);  
    const newCartItems = cartItems.filter(item=>item._id!==product._id); 

    localStorage.setItem("totalPrice",JSON.stringify(totalPrice - (foundProduct.price * foundProduct.quantity)))
    setTotalPrice(prevTotalPrice=>prevTotalPrice - (foundProduct.quantity * foundProduct.price));

    localStorage.setItem("totalquantities",JSON.stringify(totalquantities - foundProduct.quantity))
    setTotalQuantities(prevTotalQuantity=>prevTotalQuantity - foundProduct.quantity)
    setCartItems(newCartItems);
    localStorage.setItem("cartItems",JSON.stringify(newCartItems));
  }
  return (
    <context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalquantities,
        setTotalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove
      }}
    >
      {children}
    </context.Provider>
  );
};
export const useStateContext = () => useContext(context);
export default StateContext;
