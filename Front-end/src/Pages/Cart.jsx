import React, { useEffect, useState } from 'react';
import Container from '../Container/Container';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const userId = localStorage.getItem('userId');
  const [summary, setSummary] = useState({
    originalPrice: 0,
    additionalFees: 0,
    totalPrice: 0,
  });

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
          console.log(cartResponse.data.cartItems);
          setCartData(cartResponse.data.cartItems);
          setSummary(summaryResponse.data.summary);
        }
      } catch (error) {
        console.log('Error fetching cart data', error);
        toast.error('Please add to cart first');
      }
    };

    fetchCartData();
  }, [userId]);

  const handleQuantityChange = async (cartId, action) => {
    let id = cartId;
    try {
      const response = await axios.put(
        `http://localhost:5990/api/v1/cart/IncrementCart/${id}`,
        null,
        {
          params: { action },
        }
      );
      if (response.status === 200) {
        const updatedCartItem = response.data.data;
        setCartData(prevCart =>
          prevCart.map(item =>
            item._id === updatedCartItem._id
              ? {
                  ...item,
                  quantity: updatedCartItem.quantity,
                  totalPrice: updatedCartItem.totalPrice,
                }
              : item
          )
        );

        toast.success(
          `Quantity ${
            action === 'increment' ? 'increased' : 'decreased'
          } successfully!`
        );
      }
    } catch (error) {
      console.log(response.data.msg);
      toast.error(error.response?.data?.msg || 'An error occurred');
    }
  };
  const handleRemove = async item => {
    let id = item.cartItemId;
    try {
      const response = await axios.delete(
        `http://localhost:5990/api/v1/cart/DeleteCart/${id}`
      );

      localStorage.removeItem('cart');

      setCartData(prevItems =>
        prevItems.filter(cartItem => cartItem._id !== id)
      );

      toast.success('Item removed from cart');
    } catch (error) {
      console.error(
        'Failed to Delete cart:',
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.msg || 'An error occurred');
    }
  };
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mb-[200px]">
        <Container>
          <div className="mx-auto w-full px-4 2xl:px-0">
            <h2 className="text-xl font-semibold font-Poppipns_FONT text-gray-900 dark:text-white sm:text-2xl">
              Shopping Cart
            </h2>
            {cartData.length > 0 ? (
              <div className="mt-6 sm:mt-8 md:gap-6 lg:items-start xl:gap-8 w-full">
                <div className="  flex-none scrollbar-thick overflow-y-scroll h-[400px] mb-8 ">
                  {cartData.length > 0 ? (
                    cartData.map(item => (
                      <div key={item._id} className="space-y-6 ">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <a href="#" className="shrink-0 md:order-1">
                              <img
                                className="w-[150px] h-[130px] object-center"
                                src={item.product.Photo[0]}
                                alt={item.product.name}
                              />
                            </a>

                            <label for="counter-input" className="sr-only">
                              Choose quantity:
                            </label>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.cartItemId,
                                      'decrement'
                                    )
                                  }
                                  disabled={item.quantity && item.quantity <= 1}
                                  id="decrement-button"
                                  data-input-counter-decrement="counter-input"
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                >
                                  <svg
                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M1 1h16"
                                    />
                                  </svg>
                                </button>
                                <input
                                  type="text"
                                  id="counter-input"
                                  data-input-counter
                                  className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                  placeholder=""
                                  value={item.quantity}
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.cartItemId,
                                      'increment'
                                    )
                                  }
                                  disabled={item.quantity >= item.product.stock}
                                  id="increment-button"
                                  data-input-counter-increment="counter-input"
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                >
                                  <svg
                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 dark:text-white">
                                  {item.product.price || 'No price found'}
                                </p>
                              </div>
                            </div>

                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                              <a
                                href="#"
                                className="text-base font-Poppipns_FONT font-medium text-gray-900 hover:underline dark:text-white"
                              >
                                {item.product.name || 'No name found'}
                              </a>

                              <div className="flex items-center gap-4">
                                <button
                                  type="button"
                                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                                >
                                  <svg
                                    className="me-1.5 h-5 w-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                    />
                                  </svg>
                                  Add to Favorites
                                </button>

                                <button
                                  onClick={() => handleRemove(item)}
                                  type="button"
                                  className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                >
                                  <svg
                                    className="me-1.5 h-5 w-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M6 18 17.94 6M18 18 6.06 6"
                                    />
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
                <div className=" mt-6 flex justify-between space-y-6 lg:mt-0 lg:w-full">
                  <div className="space-y-4 w-[330px] mt-[25px] h-[200px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                    <form className="space-y-4">
                      <div>
                        <label
                          for="voucher"
                          className="mb-2 block text-[16px] font-Poppipns_FONT font-medium text-gray-900 dark:text-white"
                        >
                          Do you have a voucher or gift card?
                        </label>
                        <input
                          type="text"
                          id="voucher"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder=""
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
                      >
                        Apply Code
                      </button>
                    </form>
                  </div>

                  <div className="space-y-4 rounded-lg border w-[470px] border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                    <p className="text-xl font-Poppipns_FONT font-semibold text-gray-900 dark:text-white">
                      Order summary
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-Poppipns_FONT font-normal text-gray-500 dark:text-gray-400">
                            Original price
                            <span className='ml-2'>total items ({summary.totalQuantity})</span>
                          </dt>
                          <dd className="text-base font-Poppipns_FONT  font-medium text-gray-900 dark:text-white">
                            ${summary.originalPrice}
                          </dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-Poppipns_FONT  font-normal text-gray-500 dark:text-gray-400">
                            Additional Fees
                          </dt>
                          <dd className="text-base font-Poppipns_FONT  font-medium text-gray-900 dark:text-white">
                            ${summary.additionalFees}
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-Poppipns_FONT  font-normal text-gray-500 dark:text-gray-400">
                            Shipping Cost
                          </dt>
                          <dd className="text-base font-Poppipns_FONT  font-medium text-gray-900 dark:text-white">
                            ${summary.shippingCost}
                          </dd>
                        </dl>
                      </div>
                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-Poppipns_FONT  font-bold text-gray-600 dark:text-white">
                          SubTotal
                        </dt>
                        <dd className="text-base font-Poppipns_FONT  font-medium text-gray-900 dark:text-white">
                          ${summary.subTotal}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-Poppipns_FONT  font-normal text-red-400 dark:text-gray-400">
                          Discount
                        </dt>
                        <dd className="text-base font-Poppipns_FONT  font-medium text-red-500 dark:text-white">
                          <span className="mr-2">(-)</span>${summary.discount}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-[18px] mt-2 font-Poppipns_FONT  font-bold text-gray-900 dark:text-white">
                          Total
                        </dt>
                        <dd className="text-base font-Poppipns_FONT  font-bold text-gray-900 dark:text-white">
                          ${summary.totalPrice}
                        </dd>
                      </dl>
                    </div>

                    <Link
                      to="/checkout"
                      className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5  font-medium text-white bg-blue-500 hover:bg-blue-600 text-[18px] font-Poppipns_FONT "
                    >
                      Proceed to Checkout
                    </Link>

                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[16px] font-Inter_FONT font-normal text-gray-500 dark:text-gray-400">
                        or
                      </span>
                      <Link
                        to="/product"
                        className="inline-flex items-center gap-2 text-[16px] font-medium text-blue-500 underline hover:no-underline dark:text-blue-600 "
                      >
                        Continue Shopping
                        <span className="w-5 h-5">
                          <i className="fa-sharp fa-regular fa-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full  text-center flex justify-center items-center font-Poppipns_FONT font-bold text-[30px]">
                You don't have any carts!
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Cart;
