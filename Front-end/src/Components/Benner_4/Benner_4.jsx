import React from 'react';
import Container from '../../Container/Container';
import Footer from '../Fotter/Footer';

const Benner_4 = () => {
  return (
    <>
      <section className="mb-[150px]">
        <Container>
          <div className="flex items-center justify-center  gap-[88px]">
            <div className="text-center flex flex-col justify-center items-center">
              <div className="w-[80px] h-[80px] bg-black/30 rounded-full flex justify-center items-center mb-[30px]">
                <div className="w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center">
                  <span className="text-white text-[30px]">
                    <i class="fa-thin fa-truck-fast"></i>
                  </span>
                </div>
              </div>
              <h3 className="text-[20px] font-Inter_FONT font-bold mb-[10px] leading-6 text-[#000000] ">
                FREE AND FAST DELIVERY
              </h3>
              <p className="text-[14px] font-Inter_FONT font-medium text-[#000000] leading-[21px]">
                Free delivery for all orders over $140
              </p>
            </div>
            <div className="text-center  flex flex-col justify-center items-center">
              <div className="w-[80px] h-[80px] bg-black/30 rounded-full flex justify-center items-center mb-[30px]">
                <div className="w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center">
                  <span className="text-white text-[30px]">
                    <i class="fa-thin fa-headset"></i>
                  </span>
                </div>
              </div>
              <h3 className="text-[20px] font-Inter_FONT font-bold mb-[10px] leading-6 text-[#000000] ">
                24/7 CUSTOMER SERVICE
              </h3>
              <p className="text-[14px] font-Inter_FONT font-medium text-[#000000] leading-[21px]">
                Friendly 24/7 customer support
              </p>
            </div>
            <div className="text-center  flex flex-col justify-center items-center">
              <div className="w-[80px] h-[80px] bg-black/30 rounded-full flex justify-center items-center mb-[30px]">
                <div className="w-[60px] h-[60px] bg-black rounded-full flex justify-center items-center">
                  <span className="text-white text-[30px]">
                    <i class="fa-thin fa-shield-check"></i>
                  </span>
                </div>
              </div>
              <h3 className="text-[20px] font-Inter_FONT font-bold mb-[10px] leading-6 text-[#000000] ">
                MONEY BACK GUARANTEE
              </h3>
              <p className="text-[14px] font-Inter_FONT font-medium text-[#000000] leading-[21px]">
                We reurn money within 30 days
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Benner_4;
