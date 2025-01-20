import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../style/adminOrderDetails.css';
import ApiService from '../../service/ApiService';

const ORDER_STATUS = [
  'PENDING',
  'CONFIRMED',
  'DELIVERING',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
];

const AdminOrderDetailsPage = () => {
  const { itemId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchOrderDetails(itemId);
  }, [itemId]);

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId);
      setOrderItems(response.orderItemList);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
  };

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderItemStatus(orderItemId, selectedStatus[orderItemId]);
      setMessage('Order item status was successfully updated');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.message ||
        'Unable to update order item status'
      );
    }
  };

  const getAvailableStatuses = (currentStatus) => {
    const currentIndex = ORDER_STATUS.indexOf(currentStatus);
    return ORDER_STATUS.slice(currentIndex + 1);
  };

  return (
    <div className="order-details-page">
      {message && <div className="message">{message}</div>}
      <h2>Order Details</h2>
      {orderItems.length ? (
        orderItems.map((orderItem) => (
          <div key={orderItem.id} className="order-item-details">
            <div className="details-container">
              {/* Left Section - Product Information */}
              <div className="product-info">
                <h3>Product Information</h3>
                <div className="image-container">
                  <img
                    src={orderItem.product.imageUrl}
                    alt={orderItem.product.name}
                  />
                </div>
                <div className="info-field">
                  <strong>Name:</strong>
                  <p>{orderItem.product.name}</p>
                </div>
                <div className="info-field">
                  <strong>Description:</strong>
                  <p>{orderItem.product.description}</p>
                </div>
                <div className="info-field">
                  <strong>Price:</strong>
                  <p>{orderItem.product.price}</p>
                </div>
              </div>

              {/* Right Section - Update Status */}
              <div className="status-change">
                <h3>Update Order Status</h3>
                <div className="info">
                  <div className="info-field">
                    <strong>Order Item ID:</strong>
                    <p>{orderItem.id}</p>
                  </div>
                  <div className="info-field">
                    <strong>Quantity:</strong>
                    <p>{orderItem.quantity}</p>
                  </div>
                  <div className="info-field">
                    <strong>Total Price:</strong>
                    <p>{orderItem.price}</p>
                  </div>
                  <div className="info-field">
                    <strong>Order Status:</strong>
                    <p>{orderItem.status}</p>
                  </div>
                  <div className="info-field">
                    <strong>Date Ordered:</strong>
                    <p>{new Date(orderItem.createdAt).toLocaleString()}</p>
                    
                  </div>
                </div>

                <h4>Change Status</h4>
                <div className="status-select-container">
                  <select
                    className="status-option"
                    value={selectedStatus[orderItem.id] || ''}
                    onChange={(e) =>
                      handleStatusChange(orderItem.id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select new status
                    </option>
                    {getAvailableStatuses(orderItem.status).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="update-status-container">
                  <button
                    className="update-status-button"
                    onClick={() => handleSubmitStatusChange(orderItem.id)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>

            {/* User and Address Information */}
            <div className="info">
              <h3>User Information</h3>
              <div className="info-field">
                <strong>Name:</strong>
                <p>{orderItem.user.name}</p>
              </div>
              <div className="info-field">
                <strong>Email:</strong>
                <p>{orderItem.user.email}</p>
              </div>
              <div className="info-field">
                <strong>Phone:</strong>
                <p>{orderItem.user.phoneNumber}</p>
              </div>
              <div className="info-field">
                <strong>Role:</strong>
                <p>{orderItem.user.role}</p>
              </div>

              <h3>Delivery Address</h3>
              <div className="info-field">
                <strong>Country:</strong>
                <p>{orderItem.user.address?.country}</p>
              </div>
              <div className="info-field">
                <strong>State:</strong>
                <p>{orderItem.user.address?.state}</p>
              </div>
              <div className="info-field">
                <strong>City:</strong>
                <p>{orderItem.user.address?.city}</p>
              </div>
              <div className="info-field">
                <strong>Street:</strong>
                <p>{orderItem.user.address?.street}</p>
              </div>
              <div className="info-field">
                <strong>Zip Code:</strong>
                <p>{orderItem.user.address?.zipCode}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default AdminOrderDetailsPage;