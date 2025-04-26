import React, { useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Benner_1 = () => {
  let [fewProducts, setProducts] = useState([]);
  let getfewProduct = () => {
    axios
      .get('http://localhost:5990/api/v1/products/getProducts')
      .then(Response => {
        setProducts(Response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getfewProduct();
  }, []);
  const truncateDescription = description => {
    if (!description) return ''; 

    const words = description.split(' ');
    if (words.length > 3) {
      return words.slice(0, 8).join(' ') + '...';
    }

    if (description.length > 150) {
      return description.slice(0, 150) + '...';
    }

    return description;
  };
  return (
    <>
      <section className="mt-[150px] mb-[80px]">
        <Container>
          <div className="border-b border-[#000]/20">
            <div className="mb-[40px]">
              <div className="flex items-center space-x-2 ">
                <span className="w-[20px] h-[40px] bg-red-500 rounded-md"></span>
                <span className="text-[#DB4444] text-[18px] font-Poppipns_FONT  font-semibold leading-[20px]">
                  Features
                </span>
              </div>

              <h2 className="text-[36px] font-Inter_FONT font-semibold leading-[48px] text-black mt-[25px]">
                Features Products
              </h2>
            </div>

            <div className="flex gap-[30px] items-start justify-between">
              {fewProducts.length > 0 ? (
                fewProducts.slice(0, 4).map(item => (
                  <div key={item._id} className="text-center">
                    <div className="w-[270px] h-[250px] bg-[#F5F5F5] items-center justify-center flex rounded-[4px] relative group overflow-hidden">
                      <div className="text-[12px] font-Poppipns_FONT bg-[#DB4444] py-[8px] px-[12px] font-medium text-[#FAFAFA] leading-[18px] rounded-[4px] absolute top-[12px] left-[12px]">
                        -40%
                      </div>

                      <img
                        src={item.Photo}
                        alt={item.name}
                        className="w-[130px] object-cover"
                      />

                      <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF] flex items-center justify-center absolute top-[12px] right-[12px] cursor-pointer">
                        <i className="fa-regular fa-heart"></i>
                      </div>

                      <button className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-[16px] leading-6 font-Poppipns_FONT font-medium transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Add To Cart
                      </button>
                    </div>

                    <h3 className="text-[18px] text-left font-Poppipns_FONT font-medium leading-6 text-[#000000] mt-[16px] mb-[10px]">
                      {item.name}
                    </h3>

                    <div className="flex gap-[12px] items-center mb-[10px]">
                      <span className="text-[16px] font-Poppipns_FONT font-bold text-[#DB4444] ">
                        ${item.price}
                      </span>
                      <span className="text-[16px] font-Poppipns_FONT font-bold text-[#000000]/50 line-through">
                        $160
                      </span>
                    </div>
                    <div className="text-left mb-[10px]">
                      <span className="text-[14px] font-Poppipns_FONT font-normal leading-6 text-[#000000]/50">
                        {truncateDescription(
                          item.description || 'No description available'
                        )}
                      </span>
                    </div>
                    <div className="flex gap-[10px]">
                      <span className="text-[#FFAD33] flex">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className="text-[14px] font-Poppipns_FONT font-semibold leading-[21px] text-[#000000]/50">
                        (88)
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div>loading .....</div>
              )}
            </div>

            <div className="text-center mt-[50px] mb-[60px]">
              <Link
                to="/product"
                className="text-[18px] font-Poppipns_FONT font-medium text-[#fff] bg-[#DB4444] leading-6 py-[16px] px-[48px] rounded-[4px]"
              >
                View All Products
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Benner_1;

