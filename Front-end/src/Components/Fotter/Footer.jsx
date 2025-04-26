import React from 'react';
import Container from '../../Container/Container';

const Footer = () => {
  return (
    <>
      <footer className=" bg-black ">
        <Container>
          <div className="main pb-[170px] flex justify-between  pt-[80px] ">
            <div>
              <img src="/Logo.png" alt="Logo" />
              <h3 className="text-[20px] font-Poppipns_FONT font-semibold text-white mb-[25px]">
                Subscribe
              </h3>
              <p className="text-[18px] font-Inter_FONT font-normal text-white leading-6 mb-[20px]">
                Get 10% off your first order
              </p>
              <div className="w-[230px] h-[50px] relative ">
                <input
                  className="w-full h-full rounded pl-[16px] pr-[45px] placeholder:text-[16px] placeholder:text-slate-500 placeholder:font-Poppipns_FONT placeholder:leading-6 text-[16px] font-Poppipns_FONT leading-6 text-white bg-transparent bg-black border border-[#FFF] outline-none"
                  placeholder="Enter your email"
                  type="text"
                />
                <i class="fa-thin fa-paper-plane-top absolute top-3 right-3 text-[#FFf] text-[24px] cursor-pointer "></i>
              </div>
              <div className="flex items-center gap-5 mt-[20px]">
                {[
                  { icon: 'fa-facebook-f', link: 'https://facebook.com' },
                  { icon: 'fa-x-twitter', link: 'https://twitter.com' },
                  { icon: 'fa-instagram', link: 'https://instagram.com' },
                  { icon: 'fa-linkedin-in', link: 'https://linkedin.com' },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group w-12 h-12 flex items-center justify-center text-white text-2xl cursor-pointer transition-all duration-300"
                  >
                    <i className={`fa-brands ${item.icon}`}></i>

                    <span className="absolute inset-0 bg-purple-500 rounded-full scale-0 transition-transform duration-300 group-hover:scale-100 opacity-50"></span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-[25px] text-[20px] leading-7 font-Poppipns_FONT font-semibold text-[#FFFFFF]">
                Support
              </h3>
              <p className="mb-[16px] text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 w-[175px] cursor-pointer ">
                111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
              </p>
              <p className="mb-[16px] text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 cursor-pointer ">
                exclusive@gmail.com
              </p>
              <p className=" text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 cursor-pointer ">
                +88015-88888-9999
              </p>
            </div>
            <div>
              <h3 className="mb-[25px] text-[20px] leading-7 font-Poppipns_FONT font-semibold text-[#FFFFFF]">
                Account
              </h3>
              <p className="mb-[16px] text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 cursor-pointer ">
                My Account
              </p>
              <p className="mb-[16px] text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 cursor-pointer ">
                Login / Register
              </p>
              <p className=" text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 mb-[16px] cursor-pointer ">
                Cart
              </p>
              <p className=" text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 mb-[16px] cursor-pointer ">
                Wishlist
              </p>
              <p className=" text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 cursor-pointer ">
                Shop
              </p>
            </div>
            <div>
              <h3 className="mb-[25px] text-[20px] leading-7 font-Poppipns_FONT font-semibold text-[#FFFFFF]">
                Quick Link
              </h3>
              <p className="mb-[16px] text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 cursor-pointer ">
                Privacy Policy
              </p>
              <p className="mb-[16px] text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 cursor-pointer ">
                Terms Of Use
              </p>
              <p className=" text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 mb-[16px] cursor-pointer ">
                FAQ
              </p>
              <p className=" text-[16px] font-Poppipns_FONT font-normal leading-6 text-[#FAFAFA] hover:text-purple-500 cursor-pointer ">
                Contact
              </p>
            </div>
          </div>
        </Container>
        <div className="w-full h-[2px] border-b border-slate-600 mb-[30px]"></div>
        <div className="text-center mx-auto text-[#FFF] text-[20px] leading-8 font-Poppipns_FONT font-semibold pb-4">
          Made it by Mahammud Hassan Limon
        </div>
      </footer>
    </>
  );
};

export default Footer;
