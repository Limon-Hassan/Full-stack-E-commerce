import React, { useEffect, useState } from 'react';
import Container from '../Container/Container';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ProductDetails = () => {
  const location = useLocation();
  const [reviews, setReviews] = useState({});
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const userId = localStorage.getItem('userId');
  const product = location.state;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const handleClickSubmit = async product => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('You must be logged in to add to cart!');
      return;
    }

    try {
      const payload = {
        user: userId,
        product: product._id,
        quantity: 1,
      };

      await axios.post('http://localhost:5990/api/v1/cart/addtocart', payload, {
        withCredentials: true,
      });

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingProductIndex = cart.findIndex(
        item => item.Product_id === product._id
      );

      if (existingProductIndex === -1) {
        const newProduct = {
          Product_id: product._id,
          name: product.name,
          price: product.price,
          rating: product.rating || 0,
          review: product.review || [],
          photo: product.Photo,
          brand: product.brand || '',
          category: product.category || [],
          description: product.description || '',
          sold: product.sold || 0,
          createdAt: product.createdAt || new Date(),
          updatedAt: product.updatedAt || new Date(),
          quantity: 1,
        };

        cart.push(newProduct);
        localStorage.setItem('cart', JSON.stringify(cart));

        toast.success('Product added to cart!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg || 'Something went wrong', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!rating || !comment) return alert('Please fill in all fields');

    try {
      const response = await axios.post(
        `http://localhost:5990/api/v1/products/add-review`,
        {
          user: userId,
          productId: product._id,
          rating,
          comment,
        }
      );

      setRating(0);
      setHover(0);
      setComment('');

      toast.success(response.data.message || 'Review submitted successfully!');
    } catch (error) {
      console.error(
        'Failed to submit review:',
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };
  let fetchReviews = async () => {
    let productId = product._id;
    try {
      const response = await axios.get(
        `http://localhost:5990/api/v1/products/getReviews`,
        {
          params: { productId },
        }
      );

      if (response.status === 200) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.log('Error fetching cart data', error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <>
      <section className="mt-[180px] mb-[120px]">
        <Container>
          <h3 className="text-[25px] mt-[-100px] mb-[50px] font-Poppipns_FONT font-medium text-black leading-7">
            Product Details
          </h3>
          {product ? (
            <div className="w-full flex justify-between ">
              <div className="flex items-center gap-[30px]">
                <div className="flex flex-col gap-4">
                  <div className="w-[120px] h-[110px] rounded-lg bg-[#F5F5F5] p-4">
                    <img
                      src={product.Photo}
                      alt={product.name}
                      className="w-full h-full  rounded-lg"
                    />
                  </div>
                  <div className="w-[120px] h-[110px] rounded-lg bg-[#F5F5F5] p-4">
                    <img
                      src={product.Photo}
                      alt={product.name}
                      className="w-full h-full  rounded-lg"
                    />
                  </div>
                  <div className="w-[120px] h-[110px] rounded-lg bg-[#F5F5F5] p-4">
                    <img
                      src={product.Photo}
                      alt={product.name}
                      className="w-full h-full  rounded-lg"
                    />
                  </div>
                  <div className="w-[120px] h-[110px] rounded-lg bg-[#F5F5F5] p-4">
                    <img
                      src={product.Photo}
                      alt={product.name}
                      className="w-full h-full  rounded-lg"
                    />
                  </div>
                </div>
                <div className=" w-[500px] h-[485px] bg-[#F5F5F5] rounded  flex justify-center items-center">
                  <img
                    src={product.Photo}
                    alt={product.name}
                    className="w-[400px] h-[385px] object-center"
                  />
                </div>
              </div>

              <div className="ml-[150px]">
                <div className="border-b-2 border-black/20">
                  <h2 className="text-2xl font-Inter_FONT mb-[16px] font-semibold">
                    {product.name}
                  </h2>
                  <div className="flex items-center mt-2 text-gray-600">
                    ⭐⭐⭐⭐⭐{' '}
                    <span className="ml-2 text-sm">({product.rating})</span>
                    <span className="ml-4 text-green-500">In Stock</span>
                  </div>
                  <p className="text-2xl font-Inter_FONT font-bold mt-[16px] mb-[24px]">
                    {product.price}
                  </p>
                  <p className="text-[14px] font-Poppipns_FONT font-normal text-[#000000] leading-5 w-[381px] mb-[24px]">
                    {product.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center">
                  <span className="font-medium">Colours:</span>
                  <button className="w-6 h-6 bg-red-500 rounded-full ml-[24px]"></button>
                  <button className="w-6 h-6 bg-gray-300 rounded-full ml-[8px]"></button>
                </div>

                <div className="mt-4 flex items-center">
                  <button
                    onClick={() => handleClickSubmit(product)}
                    className="text-[20px]  bg-red-400 text-white  rounded py-2 px-8 hover:bg-red-600 ease-in-out duration-300"
                  >
                    Add to Cart
                  </button>
                  <ToastContainer />
                  <button className="ml-4 text-[20px] bg-red-500 text-white px-6 py-2 rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full  text-center flex justify-center items-center font-Poppipns_FONT font-bold text-[30px]">
              You have don't selected any product !
            </div>
          )}

          <div className="mt-12">
            <div className="border-t-2 pt-4">
              <h3 className="text-xl font-semibold mb-4">Reviews</h3>
              <div className="flex gap-2 items-center mb-8">
                <span className="font-medium">⭐⭐⭐⭐⭐ Total</span>
                <span className="text-gray-500">({product.totalReviews})</span>
              </div>
              {Array.isArray(reviews) &&
                reviews.map(item => (
                  <div className="mb-6">
                    <div className="bg-[#F5F5F5] p-4 rounded-md">
                      <h4 className="text-lg font-semibold">
                        {item.user?.name}
                      </h4>
                      <p className="text-gray-600">{item.comment}</p>
                    </div>
                  
                  </div>
                ))}

              <h3 className="text-xl font-semibold mb-4 mt-[35px]">
                Add Your Review
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Rating:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHover(starValue)}
                          onMouseLeave={() => setHover(0)}
                          className="text-2xl"
                          aria-label={`Rate ${starValue} star`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={
                              (hover || rating) >= starValue
                                ? '#3B82F6'
                                : 'none'
                            }
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`w-6 h-6 ${
                              (hover || rating) >= starValue
                                ? 'text-blue-500'
                                : 'text-gray-400'
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.374h6.708c.969 0 1.371 1.24.588 1.81l-5.424 3.938 2.07 6.373c.3.922-.755 1.688-1.54 1.117L12 17.768l-5.423 3.938c-.784.571-1.838-.195-1.54-1.117l2.07-6.373-5.424-3.938c-.783-.57-.38-1.81.588-1.81h6.708l2.07-6.374z"
                            />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <textarea
                  className="w-full p-3 rounded-md border border-gray-300"
                  rows="4"
                  placeholder="Write your review here..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="mt-4 bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
              
            </div>
          </div>

          <div className="mb-[40px] mt-[120px]">
            <div className="flex items-center space-x-2">
              <span className="w-[20px] h-[40px] bg-red-500 rounded-md"></span>
              <span className="text-[#DB4444] text-[18px] font-Poppipns_FONT font-semibold leading-[20px]">
                Related Item
              </span>
            </div>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              <div className="1">
                <div>
                  <div className="w-[270px] h-[250px] bg-[#F5F5F5] items-center justify-center flex rounded-[4px] relative group overflow-hidden">
                    <div className="text-[12px] font-Poppipns_FONT bg-[#DB4444] py-[8px] px-[12px] font-medium text-[#FAFAFA] leading-[18px] rounded-[4px] absolute top-[12px] left-[12px]">
                      -40%
                    </div>
                    <img src="/image_1.png" alt="image_1" />
                    <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF] flex items-center justify-center mt-[-190px] ml-[200px] absolute">
                      <i class="fa-regular fa-heart cursor-pointer"></i>
                    </div>
                    <button class="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-[16px] leading-6 font-Poppipns_FONT font-medium transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Add To Cart
                    </button>
                  </div>
                  <h3 className="text-[18px] font-Poppipns_FONT font-medium leading-6 text-[#000000] mt-[16px] mb-[10px]">
                    HAVIT HV-G92 Gamepad
                  </h3>
                  <div className="flex gap-[12px] items-center mb-[10px]">
                    <span className="text-[16px] font-Poppipns_FONT font-bold text-[#DB4444] ">
                      $120
                    </span>
                    <span className="text-[16px] font-Poppipns_FONT font-bold text-[#000000]/50 line-through">
                      $160
                    </span>
                  </div>
                  <div className="flex gap-[10px]">
                    <span className="text-[#FFAD33] flex">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </span>
                    <span className="text-[14px] font-Poppipns_FONT font-semibold leading-[21px] text-[#000000]/50">
                      (88)
                    </span>
                  </div>
                </div>
              </div>
              <div className="2">
                <div>
                  <div className="w-[270px] h-[250px] bg-[#F5F5F5] items-center justify-center flex rounded-[4px] relative group overflow-hidden">
                    <div className="text-[12px] font-Poppipns_FONT bg-[#DB4444] py-[8px] px-[12px] font-medium text-[#FAFAFA] leading-[18px] rounded-[4px] absolute top-[12px] left-[12px]">
                      -35%
                    </div>
                    <img src="/keyboard.png" alt="keyboard" />
                    <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF] flex items-center justify-center mt-[-190px] ml-[200px] absolute">
                      <i class="fa-regular fa-heart cursor-pointer"></i>
                    </div>
                    <button class="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-[16px] leading-6 font-Poppipns_FONT font-medium transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Add To Cart
                    </button>
                  </div>
                  <h3 className="text-[18px] font-Poppipns_FONT font-medium leading-6 text-[#000000] mt-[16px] mb-[10px]">
                    AK-900 Wired Keyboard
                  </h3>
                  <div className="flex gap-[12px] items-center mb-[10px]">
                    <span className="text-[16px] font-Poppipns_FONT font-bold text-[#DB4444] ">
                      $960
                    </span>
                    <span className="text-[16px] font-Poppipns_FONT font-bold text-[#000000]/50 line-through">
                      $1160
                    </span>
                  </div>
                  <div className="flex gap-[10px]">
                    <span className="text-[#FFAD33] flex">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </span>
                    <span className="text-[14px] font-Poppipns_FONT font-semibold leading-[21px] text-[#000000]/50">
                      (88)
                    </span>
                  </div>
                </div>
              </div>
              <div className="3">
                <div>
                  <div className="w-[270px] h-[250px] bg-[#F5F5F5] items-center justify-center flex rounded-[4px] relative group overflow-hidden">
                    <div className="text-[12px] font-Poppipns_FONT bg-[#DB4444] py-[8px] px-[12px] font-medium text-[#FAFAFA] leading-[18px] rounded-[4px] absolute top-[12px] left-[12px]">
                      -30%
                    </div>
                    <img src="/monitor.png" alt="monitor" />
                    <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF] flex items-center justify-center mt-[-190px] ml-[200px] absolute">
                      <i class="fa-regular fa-heart cursor-pointer"></i>
                    </div>
                    <button class="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-[16px] leading-6 font-Poppipns_FONT font-medium transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Add To Cart
                    </button>
                  </div>
                  <h3 className="text-[18px] font-Poppipns_FONT font-medium leading-6 text-[#000000] mt-[16px] mb-[10px]">
                    IPS LCD Gaming Monitor
                  </h3>
                  <div className="flex gap-[12px] items-center mb-[10px]">
                    <span className="text-[16px] font-Poppipns_FONT font-bold text-[#DB4444] ">
                      $120
                    </span>
                    <span className="text-[16px] font-Poppipns_FONT font-bold text-[#000000]/50 line-through">
                      $160
                    </span>
                  </div>
                  <div className="flex gap-[10px]">
                    <span className="text-[#FFAD33] flex">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </span>
                    <span className="text-[14px] font-Poppipns_FONT font-semibold leading-[21px] text-[#000000]/50">
                      (88)
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="w-[270px] h-[250px] bg-[#F5F5F5] items-center justify-center flex rounded-[4px] relative group overflow-hidden">
                    <div className="text-[12px] font-Poppipns_FONT bg-[#DB4444] py-[8px] px-[12px] font-medium text-[#FAFAFA] leading-[18px] rounded-[4px] absolute top-[12px] left-[12px]">
                      -20%
                    </div>
                    <img src="/chair.png" alt="chair" />
                    <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF] flex items-center justify-center mt-[-190px] ml-[200px] absolute">
                      <i class="fa-regular fa-heart cursor-pointer"></i>
                    </div>
                    <button class="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-[16px] leading-6 font-Poppipns_FONT font-medium transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Add To Cart
                    </button>
                  </div>
                  <h3 className="text-[18px] font-Poppipns_FONT font-medium leading-6 text-[#000000] mt-[16px] mb-[10px]">
                    S-Series Comfort Chair
                  </h3>
                  <div className="flex gap-[12px] items-center mb-[10px]">
                    <span className="text-[16px] font-Poppipns_FONT font-bold text-[#DB4444] ">
                      $120
                    </span>
                    <span className="text-[16px] font-Poppipns_FONT font-bold text-[#000000]/50 line-through">
                      $160
                    </span>
                  </div>
                  <div className="flex gap-[10px]">
                    <span className="text-[#FFAD33] flex">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </span>
                    <span className="text-[14px] font-Poppipns_FONT font-semibold leading-[21px] text-[#000000]/50">
                      (88)
                    </span>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
