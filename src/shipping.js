import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { useShippingContext } from "./context/shipping_context";


 

function ShippingAddressForm() {
    const navigate = useNavigate();
    const {setshippingData} = useShippingContext();
  const [formData, setFormData] = useState({
    address: '',
    pincode: '',
    city: '',
  });
  const [date, setSelectedDateTime] = useState(null);


  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setshippingData(formData.address+","+formData.pincode+","+formData.city,date);
    navigate('/order')
    // You can add your form submission logic here
    // For example, send the form data to an API or perform validation
   
  };

  return (
    <Wrapper>
      <div className="container">
        <h2>Shipping Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliveryDate">Date of Delivery:</label> <br />
            <DatePicker
              selected={date}
              onChange={handleDateTimeChange}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
          <button type="submit">Proceed to Payment</button>
        </form>
      </div>
    </Wrapper>
  );
}

export default ShippingAddressForm;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: white; /* Pink background color */
 
 
  .container {
    background-color: white; /* White background for the container */
    padding: 20px;

    margin:0px 5px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    

   

    .form-group {
      margin-bottom: 10px;
    }

    input[type="text"],
    input[type="number"],
    input[type="date"] {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 16px;
    }

    button {
      background-color: #ff66b2; /* Pink background color for the button */
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 3px;
      font-size: 18px;
      cursor: pointer;
    }

    @media screen and (max-width: 400px) {
        
      .form-group {
        
        margin:0px 10px;
      }

      input[type="text"],
      input[type="number"],
      input[type="date"] {
        font-size: 14px;
      }

      button {
        font-size: 16px;
      }
    }
  }
`;
