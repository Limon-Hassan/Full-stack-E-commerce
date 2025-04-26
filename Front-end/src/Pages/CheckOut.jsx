import React, { useEffect } from 'react';
import Container from '../Container/Container';
import Checkbox from './Checkbox';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CheckOut = () => {
  let navigate = useNavigate();
  let [cartItems, setCartItems] = useState([]);
  let [totalSummery, setTotalSummery] = useState({});
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [saveInfo, setSaveInfo] = useState(false);
  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
  });
  const handlePaymentChange = paymentMethod => {
    setSelectedPayment(paymentMethod);
  };
  useEffect(() => {
    if (!userId || userId === 'null') {
      console.warn('User ID not found in localStorage');
      toast.error('Please log in to view cart');
      return;
    }

    const fetchCartData = async () => {
      try {
        const cartResponse = await axios.get(
          `http://localhost:5990/api/v1/cart/getcartInfo/${userId}`,
          { withCredentials: true }
        );

        const summaryResponse = await axios.get(
          `http://localhost:5990/api/v1/cart/getCartSummery/${userId}`,
          { withCredentials: true }
        );

        if (cartResponse.status === 200 && summaryResponse.status === 200) {
          setCartItems(cartResponse.data.cartItems);
          setTotalSummery(summaryResponse.data.summary);
        }
      } catch (error) {
        console.log('Error fetching cart data', error);
        toast.error('Please add to cart first');
      }
    };

    fetchCartData();
  }, [userId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const userid = localStorage.getItem('userId');

      const checkoutData = {
        name: formData.fullName,
        address: formData.address,
        Apartment: formData.apartment,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        paymentMethod: selectedPayment,
      };
      const response = await axios.post(
        `http://localhost:5990/api/v1/checkout/checkOut/${userid}`,
        checkoutData
      );
      if (response.status === 201) {
        const orderId = response.data.order._id;
        localStorage.setItem('orderId', orderId);
        localStorage.removeItem('cart');
        toast.success(response?.data?.msg || 'Sucessfully Order Placed');
        navigate('/OrderStatus');
      }
    } catch (error) {
      console.error('Error during checkout process:', error);
      toast.error(error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <>
      <section className="mt-[30px] mb-[100px]">
        <Container>
          <h3 className="text-[36px] font-Poppipns_FONT font-medium leading-[30px] text-[#000] mb-[34px]">
            Billing Details
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mainpart flex gap-[170px]">
              <div>
                <div className="w-[470px] mb-[50px] h-[50px]">
                  <label
                    htmlFor="name"
                    className="text-[15px] font-Poppipns_FONT font-[400]"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    id="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="border-border border rounded-md outline-none px-4 text-[15px] font-Poppipns_FONT font-normal text-black/50  w-full mt-1 py-3 focus:border-primary transition-colors duration-300 bg-[#F5F5F5]"
                  />
                </div>

                <div className="w-[470px] mb-[50px] h-[50px]">
                  <label
                    htmlFor="name"
                    className="text-[15px] font-Poppipns_FONT font-[400]"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="address"
                    id="name"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Street Address"
                    className="border-border border rounded-md outline-none px-4 text-[15px] font-Poppipns_FONT font-normal text-black/50  w-full mt-1 py-3 focus:border-primary transition-colors duration-300 bg-[#F5F5F5]"
                  />
                </div>
                <div className="w-[470px] mb-[50px] h-[50px]">
                  <label
                    htmlFor="name"
                    className="text-[15px] font-Poppipns_FONT font-[400]"
                  >
                    Apartment, floor, etc. (optional)
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="apartment"
                    id="name"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Apartment, floor, etc. (optional)"
                    className="border-border border rounded-md outline-none px-4 text-[15px] font-Poppipns_FONT font-normal text-black/50  w-full mt-1 py-3 focus:border-primary transition-colors duration-300 bg-[#F5F5F5]"
                  />
                </div>
                <div className="w-[470px] mb-[50px] h-[50px]">
                  <label
                    htmlFor="name"
                    className="text-[15px] font-Poppipns_FONT font-[400]"
                  >
                    Town/City <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    id="name"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Town/City"
                    className="border-border border rounded-md outline-none px-4 text-[15px] font-Poppipns_FONT font-normal text-black/50  w-full mt-1 py-3 focus:border-primary transition-colors duration-300 bg-[#F5F5F5]"
                  />
                </div>
                <div className="w-[470px] mb-[50px] h-[50px]">
                  <label
                    htmlFor="name"
                    className="text-[15px] font-Poppipns_FONT font-[400]"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    id="name"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number"
                    className="border-border border rounded-md outline-none px-4 text-[15px] font-Poppipns_FONT font-normal text-black/50  w-full mt-1 py-3 focus:border-primary transition-colors duration-300 bg-[#F5F5F5]"
                  />
                </div>
                <div className="w-[470px] mb-[50px] h-[50px]">
                  <label
                    htmlFor="name"
                    className="text-[15px] font-Poppipns_FONT font-[400]"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                    className="border-border border rounded-md outline-none px-4 text-[15px] font-Poppipns_FONT font-normal text-black/50  w-full mt-1 py-3 focus:border-primary transition-colors duration-300 bg-[#F5F5F5]"
                  />
                  <div className="flex gap-4 items-center mt-[24px]">
                    <Checkbox
                      label="Save this information for faster check-out next time"
                      checked={saveInfo}
                      onChange={() => setSaveInfo(!saveInfo)}
                    />
                  </div>
                </div>
              </div>

              <div className="part-2 w-[465px]">
                <div className="w-full h-[230px] mb-[40px] scrollbar-thick overflow-y-scroll p-3 shadow-sm shadow-black/20 rounded-lg bg-white">
                  {cartItems.length > 0 ? (
                    cartItems.map(item => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between  ml-[10px] border-b border-black/20"
                      >
                        <div className="flex items-center gap-5 mb-[20px] mt-[16px]">
                          <img
                            className="w-[70px] h-[55px] object-center"
                            src={item.product.Photo[0]}
                            alt={item.product.name}
                          />
                          <span className="text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#000]">
                            {item.product.name}
                          </span>
                        </div>
                        <span className="text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#000]">
                          ${item.product.price}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div>You haven't any carts!</div>
                  )}
                </div>
                <div className="flex justify-between items-center border-b border-black/20 ">
                  <h3 className="text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#000] mb-[16px] mt-[20px]">
                    Subtotal:
                  </h3>
                  <span className="text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#000]">
                    ${totalSummery.subTotal}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-[16px] mt-4">
                  <h3 className="text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#000] ">
                    Total:
                  </h3>
                  <span className="text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#000]">
                    ${totalSummery.totalPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-[16px]">
                  <div className="flex items-center gap-5">
                    <Checkbox
                      label="Bank"
                      ClassName="rounded-full"
                      checked={selectedPayment === 'bank'}
                      onChange={() => handlePaymentChange('bank')}
                    />
                  </div>
                  <span className="flex gap-2">
                    <img
                      className="w-[42px] h-[28px]"
                      src="/Bkash.png"
                      alt="Bkash"
                    />
                    <img
                      className="w-[42px] h-[28px]"
                      src="/Visa.png"
                      alt="Visa"
                    />
                    <img
                      className="w-[42px] h-[28px]"
                      src="/Mastercard.png"
                      alt="Mastercard"
                    />
                    <img
                      className="w-[42px] h-[28px]"
                      src="/Nagad.png"
                      alt="Nagad"
                    />
                  </span>
                </div>
                <div className="flex items-center gap-5 mb-[34px]">
                  <Checkbox
                    label="Cash on Delivery"
                    ClassName="rounded-full"
                    checked={selectedPayment === 'cash on delivery'}
                    onChange={() => handlePaymentChange('cash on delivery')}
                  />
                </div>
                <div className="flex items-center gap-5 w-[527px] mb-[48px]">
                  <input
                    onChange={handleChange}
                    className="w-[260px] h-[56px] rounded px-[24px] bg-transparent border border-black text-[#000]/50 text-[16px] font-Poppipns_FONT font-normal placeholder:text-[16px] placeholder:font-Poppipns_FONT outline-none  "
                    placeholder="Coupon Code"
                    type="text"
                  />
                  <button className="text-[14px] font-Poppipns_FONT font-medium text-[#FFF] leading-6 py-[16px] px-[48px] bg-[#DB4444] rounded ">
                    Apply Coupon
                  </button>
                </div>
                <button className="text-[18px] font-Poppipns_FONT font-medium text-[#FFF] leading-6 py-[16px] px-[48px] bg-[#DB4444] rounded ">
                  Order
                </button>
                <ToastContainer />
              </div>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};

export default CheckOut;
