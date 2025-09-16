import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
const fetchOrders = async () => {
  try {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }
    );
    setData(response.data.orders);
    console.log("Full Response:", response.data);

  } catch (error) {
    console.error("Error fetching orders:", error);
    
  }
};


     useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);


  return (
    <div>

    </div>
  )
}

export default MyOrders