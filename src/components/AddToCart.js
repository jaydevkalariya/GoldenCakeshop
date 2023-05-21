import { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart_context";
import { useEffect } from "react";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);
 
  const intialFlavour=product.flavours ? product.flavours[0]: "";
  const intialWeight=product.weight ? product.weight[0]: " ";

  const [flavour,setFlavour]=useState(intialFlavour)
  const [wt,setweight]=useState(intialWeight)

  //set everytime intial value as first flavour for every products added in cart
  useEffect(() => { setFlavour(intialFlavour);setweight(intialWeight)}, [intialFlavour,intialWeight] )

const fun1=(e)=>{
  setFlavour(e.target.value);
}
const fun2=(e)=>{
  setweight(e.target.value);
}

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
     setAmount(amount+1);
  };
  
  return (
    <>
    <Wrapper style={{margin:"auto"}}>
        
           <div className="box">
          
              <div style={{margin:"0 1rem"}}>
                
               Flavours:<select name="flavour" onChange={fun1} value={flavour}>
                 {
                  product.flavours? product.flavours.map((curr,i)=>{
                  return <option key={i}>{curr}</option>
                }):""}
               </select>
               </div>
               <div style={{margin:"0 1rem"}}>
               Weight(in kg): <select name="weight" onChange={fun2} value={wt}>
                {
                   product.weight? product.weight.map((curr,i)=>{
                  return <option key={i}>{curr}</option>
                }):""}
               </select>
               </div>
              
               {console.log(flavour)}
               {console.log(wt)}
               </div>
           
      
      {/* add to cart  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

<NavLink to="/cart" onClick={() => addToCart(product.id, flavour,wt, amount, product)}>
        <Button className="btn">Add To Cart</Button>
      </NavLink>
    </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  
 .box{
  display:flex;
  margin-bottom:1rem;
  padding:0 2rem;
  font-size:1.5rem;
  width:100%;
 }
    
    @media (max-width: 400px) {
      .btn{
        margin:0 13rem;
        padding:1rem 1rem;
      }
      
    }
    @media (min-width: 401px) {
      .btn{
        margin:0 15rem;
      }
      
    }

 
  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
     margin-bottom: 1rem;
     display: flex;
     justify-content: center;
     align-items: center;
     font-size: 1.4rem;
    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }
    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;