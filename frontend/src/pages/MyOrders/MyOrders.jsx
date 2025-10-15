import React, { useState, useContext, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrder = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { Authorization: `Bearer ${token}` } });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleTrackOrder = (orderId, status) => {
        alert(`Order ID: ${orderId}\nStatus: ${status}\n\nThis is a demo tracking feature. In a real application, this would show detailed tracking information.`);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);


    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {order.items.map((item, itemIndex) => (
                                    <span key={itemIndex}>
                                        {item.name} x {item.quantity}
                                        {itemIndex === order.items.length - 1 ? '' : ', '}
                                    </span>
                                ))}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <div className="order-actions">
                                <button className="track-order-button" onClick={() => handleTrackOrder(order._id, order.status)}>Track Order</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrder;