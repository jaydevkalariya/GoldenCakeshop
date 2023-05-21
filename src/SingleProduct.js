import { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/productcontex";
import PageNavigation from "./components/PageNavigation";
import { Container } from "./styles/Container";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "./components/star"
import Cake from "./api";
import AddToCart from "./components/AddToCart";





const SingleProduct = () => {
  const { getSingleProduct, isLoading, singleProduct } =useProductContext();
  const { id } = useParams();
  let x=  Math.random()
  const {
    id: alias,
    name,
    price,
    description,
    category,
    stars,
    reviews,
    image,
    flavours,
    weight
  } = singleProduct;
 
  useEffect(() => {
    getSingleProduct(Cake.filter((curr)=>{
        return curr.id===id;
    }));
  }, []);

  



  if (isLoading) {
    return <div className="page_loading">Loading.....</div>;
  }



  return (
    <Wrapper>
      
      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <img src={image} width="100%" height="70%"/>

           <div className="delivery_details">
            <h3 style={{fontWeight:"bold"}}>Delivery Details & Instructions :</h3>
           <ol>
            <li>The delicious cake is hand-delivered by our delivery boy in a good quality cardboard box.</li>
            <li>Candle and knife will be delivered as per the availability</li>
            <li>After receiving, Please do not squeeze the sides of the box</li>
            <li>Please keep it cool and away from direct sunlight</li>
            <li>Immediately cover any leftover cake and refrigerate it</li>
           </ol>
           </div>
      
          </div>

          {/* product dAta  */}
          <div className="product-data" style={{boxShadow:"5px 5px 5px 5px lightgrey"}}>
            <h2>{name}</h2>
            <h3>{category} Cake</h3>
            <p><Star stars={stars} reviews={reviews}/></p>
            <p className="product-data-price">
             
              Price: {(Math.round(price + ((price *x * (9))/100))) - ((Math.round(price + ((price * x * (9))/100)))%10)}
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: {price}
            </p>
             <p style={{fontWeight:"bold"}}> Product Highlights: </p>
            <pre style={{fontSize:"1.4rem",marginTop:"-2rem"}}>{description}</pre>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Fast Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>Fresh & spongy</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Golden Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 days freshness </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> In Stock</span>
              </p>
              </div>
             <AddToCart product={singleProduct} />
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
 .delivery_details{
  margin-top:2rem;
  font-size:1.7rem;
 }
 ol{
  margin:1rem;
  text-indent:1rem;
 
 }
 li{
  padding:0.5rem;
 }
  .container {
    padding: 3rem 0;
  }
  .product-data {
    padding:2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;
      .product-warranty-data {
        text-align: center;
        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }
    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;
      span {
        font-weight: bold;
      }
    }
    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }
  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
    height:200px;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
  @media (max-width: 400px) {
    padding: 0 2.4rem;
    .product-data{
       margin-top:5rem;
    }
  }
`;

export default SingleProduct;