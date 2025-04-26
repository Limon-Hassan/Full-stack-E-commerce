import React from 'react';
import Container from '../Container/Container';

const Contact = () => {
  return (
    <>
      <section className="bg-[#FFF] ">
        <Container>
          <div className="main pt-[180px] mb-[140px] flex gap-[30px]">
            <div className="part_1 w-[386px]  bg-[#FFF] shadow-md shadow-black/10 rounded py-[50px] px-[35px]">
              <div className="border-b border-black/20">
                <div className="flex items-center gap-4  mb-[24px]">
                  <span className="bg-[#DB4444] focus:outline-none rounded-full px-[13px] py-[10px]">
                    <i class="fa-thin fa-phone text-[#FFf] text-[18px]"></i>
                  </span>
                  <span className="text-[16px] font-Poppipns_FONT font-semibold text-[#000] leading-6 ">
                    Call To Us
                  </span>
                </div>
                <p className="text-[16px] font-Poppipns_FONT font-normal text-[#000] leading-6 mb-[16px] ">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-[16px] font-Poppipns_FONT font-normal text-[#000] leading-6 mb-[32px]">
                  Phone: +8801611112222
                </p>
              </div>
              <div className="mt-[32px]">
                <div className="flex items-center gap-[16px] mb-[24px]">
                  <span className="bg-[#DB4444] focus:outline-none rounded-full px-[13px] py-[10px]">
                    <i class="fa-thin fa-envelope text-[#FFF] text-[18px]"></i>
                  </span>
                  <span className="text-[16px] font-Poppipns_FONT font-semibold text-[#000] leading-6 ">
                    Write To US
                  </span>
                </div>
                <p className="text-[16px] font-Poppipns_FONT font-normal text-[#000] leading-6 mb-[16px] ">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="text-[16px] font-Poppipns_FONT font-normal text-[#000] leading-6 mb-[16px] ">
                  Emails: customer@exclusive.com
                </p>
                <p className="text-[16px] font-Poppipns_FONT font-normal text-[#000] leading-6 ">
                  Emails: support@exclusive.com
                </p>
              </div>
            </div>
            <div className="w-[800px] py-[40px] px-[32px] bg-white shadow-md shadow-black/10 rounded">
              <div className="flex items-center gap-[16px] mb-[30px]">
                <div className="w-[300px] h-[50px]">
                  <label
                    htmlFor="name"
                    className="text-[15px] font-Poppipns_FONT font-[400]"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    className="border-border border rounded-md outline-none px-4 text-[15px] font-Poppipns_FONT font-normal text-black/50  w-full mt-1 py-3 focus:border-primary transition-colors duration-300 bg-[#F5F5F5]"
                  />
                </div>
                <div className="w-[300px] h-[50px]">
                  <label
                    htmlFor="name"
                    className="text-[15px] font-Poppipns_FONT font-[400]"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    className="border-border border rounded-md outline-none px-4 text-[15px] font-Poppipns_FONT font-normal text-black/50  w-full mt-1 py-3 focus:border-primary transition-colors duration-300 bg-[#F5F5F5]"
                  />
                </div>
                <div className="w-[300px] h-[50px]">
                  <label
                    htmlFor="name"
                    className="text-[15px] font-Poppipns_FONT font-[400]"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="number"
                    id="name"
                    placeholder="Your Phone"
                    className="border-border border rounded-md outline-none px-4 text-[15px] font-Poppipns_FONT font-normal text-black/50  w-full mt-1 py-3 focus:border-primary transition-colors duration-300 bg-[#F5F5F5]"
                  />
                </div>
              </div>
              <div className="w-[737px] h-[220px] mt-[75px]">
                <textarea
                  class="w-full  h-full text-[16px] font-Poppipns_FONT font-normal  text-black/50 p-4 bg-[#F5F5F5] border rounded border-gray-300 shadow-lg outline-none resize-none"
                  placeholder="Your Massage..."
                ></textarea>
              </div>
              <div className="text-right ">
                <button className="text-[16px] font-Poppipns_FONT font-medium text-[#FFF] leading-6 bg-[#DB4444] py-[16px] px-[48px] rounded mt-[35px] mb-[48px] ">
                  Send Massage
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
