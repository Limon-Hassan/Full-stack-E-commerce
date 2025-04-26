import React, { useEffect, useState } from 'react';
import Container from '../Container/Container';
import axios from 'axios';

const orderStatus = () => {
  let [orderInfo, setOrderInfo] = useState(null);
  const orderId = localStorage.getItem('orderId');

  useEffect(() => {
    let orderstauts = async () => {
      try {
        let response = await axios.get(
          `http://localhost:5990/api/v1/checkout/getCheckout`,
          { params: { orderId } }
        );
        if (response.status === 200) {
          setOrderInfo(response.data.orderSummary);
          console.log(response.data);
        }
      } catch (error) {
        console.log(response.data.msg);
        toast.error(error.response?.data?.msg || 'An error occurred');
      }
    };

    orderstauts();
  }, []);
  return (
    <section>
      <Container>
        <div className=" p-6 bg-white rounded-md shadow">
          <h2 className="text-lg font-semibold mt-[50px] mb-[20px]">
            Order ID : <span className="font-bold">{orderId?.slice(-6)}</span>
          </h2>
          <p className="text-gray-500 mb-[60px]">
            Thank you. Your order has been Confirmed.
          </p>
          <div className="flex justify-between items-center mb-12 relative px-4">
            {['Cart', 'Delivery & Payment', 'Summary', 'Done'].map(
              (label, index) => {
                const currentStep = 3; 
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div
                    key={index}
                    className="flex-1 relative z-10 flex flex-col items-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-600'
                          : isCurrent
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span
                      className={`mt-2 text-base font-medium ${
                        isCurrent ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {label}
                    </span>

                    {index !== 3 && (
                      <div className="absolute top-6 left-1/2 w-full h-1 -z-10">
                        <div
                          className={`h-1 w-full ${
                            index < currentStep - 1
                              ? 'bg-green-500'
                              : index === currentStep - 1
                              ? 'bg-gradient-to-r from-green-500 to-gray-300'
                              : 'bg-gray-300'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
          <div className="scrollbar-thick overflow-y-scroll h-[400px] mb-8">
            {orderInfo?.cartItems?.map((item, index) => (
              <div
                key={index}
                className="flex items-center  justify-between border rounded-md p-4 mb-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product?.Photo?.[0]}
                    alt={item.product?.name}
                    className="w-20 h-20 object-center rounded-md"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {item.product?.name}
                    </p>
                  </div>
                </div>
                <p className="font-medium">Qty ({item?.quantity})</p>
                <p className="font-bold text-lg">${item?.price}</p>
              </div>
            ))}
          </div>

          {orderInfo && (
            <div className="border rounded-md p-4 mb-6">
              <h4 className="font-semibold text-lg mb-4">Order Summary</h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderInfo.subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Charge</span>
                  <span>${orderInfo.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-${orderInfo.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total</span>
                  <span>${orderInfo.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="border rounded-md p-4">
              <h4 className="font-semibold mb-2">Customer</h4>
              <p className="text-sm">👤 John Smith</p>
              <p className="text-xs text-gray-500">1 Order</p>
            </div>
            <div className="border rounded-md p-4">
              <h4 className="font-semibold mb-2 flex justify-between">
                Customer Information
                <span className="text-blue-500 cursor-pointer text-sm">✎</span>
              </h4>
              <p className="text-sm">📧 john.smith1@gmail.com</p>
              <p className="text-sm">📞 +91 94256 32056</p>
            </div>
            <div className="border rounded-md p-4">
              <h4 className="font-semibold mb-2 flex justify-between">
                Shipping Address
                <span className="text-blue-500 cursor-pointer text-sm">✎</span>
              </h4>
              <p className="text-sm">John Smith</p>
              <p className="text-sm">123 Elm Street, Anytown, USA 12345</p>
              <p className="text-xs text-blue-500 mt-1 cursor-pointer">
                📍 select on map
              </p>
            </div>
            <div className="border rounded-md p-4">
              <h4 className="font-semibold mb-2">Billing Address</h4>
              <p className="text-sm">Same as shipping address</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default orderStatus;
