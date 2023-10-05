import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URI } from '../App';
import { toast } from 'react-toastify';

const Orders = () => {

  const [orderss, setOrderss] = useState(null);
  const [requestData, setRequestData] = useState(new Date());
  useEffect(() => {
    const getAllOrders = async (req, res) => {
      await axios.get(`${URI}/orders/allOrders`)
        .then(response => {
          setOrderss(response.data);

        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    }
    getAllOrders();
  }, [requestData])

  const confirm = async (data, item, order, time) => {
    let msg = "";
    if (data === 1)
      msg = prompt("What is Price for this cake?");
    if (data === 2)
      msg = prompt("What is Problem with this cake?");

    await axios.post(`${URI}/orders/confirmOrder`, {
      data: data,
      suborder: item,
      order: order,
      time: time,
      msg: msg,
    })
      .then(response => {
        setRequestData(new Date());
        toast.success(response.data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // const getInvoice = async () => {
  //   await axios.get(`${URI}/orders/generatepdf`)
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }

  const getInvoice = async () => {
    try {
      const response = await axios.get(`${URI}/orders/generatepdf`, {
        responseType: 'arraybuffer', // Specify the response type as 'arraybuffer'
      });
  
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Create an <a> element and set its attributes for downloading
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'invoice.pdf';
  
      // Trigger a click event on the <a> element to start the download
      document.body.appendChild(a);
      a.click();
  
      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error fetching or handling PDF:', error);
    }
  };
  


  return (
    <>
      <div className="card card-body outercard">
       
        <h2>Orders</h2>
        <button className="btn btn-success" onClick={getInvoice}>Generate Invoice</button>
        <div className="row">

          {orderss ? orderss.map((order, index) => (
            <>
              {order.order.map((item, itemIndex) => (
                <>
                  {item.isConfirmed == "processing" ?
                    <div className="col-md-6" key={item.id}>
                      <div className="card mb-4 innercard">
                        <div className="card-body">
                          <div className="card-image">
                            <h4 className="card-title"> {item.name}</h4>
                            <img src={item.image[0]} alt="Cake" className="img" />
                            {item.customize ?
                              <>
                                <button className="btn btn-success" onClick={() => confirm(1, item, order, order.time)}>Accept</button>
                                <button className="btn btn-danger" onClick={() => confirm(2, item, order, order.time)}>Reject</button>
                              </>
                              :
                              <button className="btn btn-success" onClick={() => confirm("", item, order, "")}>Done</button>
                            }
                          </div>

                          <div className="card-details">
                            <p className="card-text">
                              <strong>Username:</strong> {order.user.name}
                            </p>
                            <p className="card-text">
                              <strong>Email:</strong> {order.user.email}
                            </p>
                            <p className="card-text">
                              <strong>MobileNo:</strong> {order.user.mobileno}
                            </p>
                            <p className="card-text">
                              <strong>Address:</strong> {order.address}
                            </p>
                            <p className="card-text">
                              <strong>Delivery Time:</strong> {order.time}
                            </p>



                            <p className="card-text">
                              <strong>Flavour:</strong> {item.flavour}
                            </p>
                            <p className="card-text">
                              <strong>Weight:</strong> {item.wt}
                            </p>
                            <p className="card-text">
                              <strong>Name on Cake:</strong> {item.bname}
                            </p>
                            <p className="card-text">
                              <strong>Quantity:</strong> {item.amount}
                            </p>
                            <p className="card-text">
                              <strong>Additional Detail:</strong> {item.detail}
                            </p>
                            <p className="card-text">
                              <strong>Customize:</strong> {item.customize ? 'Yes' : 'No'}
                            </p>


                          </div>
                        </div>
                      </div>
                    </div>
                    : ""}</>
              ))}
            </>
          )) : ""}
        </div>


      </div>
     
    </>
  )
}

export default Orders