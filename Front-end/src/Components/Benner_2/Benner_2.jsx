import React, { useEffect, useRef, useState } from 'react';
import Container from '../../Container/Container';
import Slider from 'react-slick';
import axios from 'axios';

const Benner_2 = () => {
  const [allCategoryis, setallCategoryis] = useState([]); 
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const allcategories = () => {
    axios
      .get('http://localhost:5990/api/v1/category/getAllCategories')
      .then(response => {
        setallCategoryis(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const truncateDescription = description => {
    if (!description) return ''; // Handle missing description

    // Truncate based on word count
    const words = description.split(' ');
    if (words.length > 3) {
      return words.slice(0, 5).join(' ') + '...'; // Truncate to 10 words and add "..."
    }

    // Truncate based on character count
    if (description.length > 100) {
      return description.slice(0, 100) + '...'; // Truncate to 100 characters and add "..."
    }

    return description; // If no condition is met, return the original description
  };
  useEffect(() => {
    allcategories(); 
  }, []);

  return (
    <section className="mb-[80px]">
      <Container>
        <div className="mb-[40px]">
          <div className="flex items-center space-x-2 ">
            <span className="w-[20px] h-[40px] bg-red-500 rounded-md"></span>
            <span className="text-[#DB4444] text-[18px] font-Poppipns_FONT font-semibold leading-[20px]">
              Categories
            </span>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-[36px] font-semibold font-Poppipns_FONT leading-[48px] text-black mt-[25px]">
              Browse By Category
            </h2>
            <span className="flex items-center gap-[12px] ">
              <button
                className="bg-gray-100 hover:bg-gray-200 focus:outline-none rounded-full px-[12px] pt-[10px] pb-[9px]"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <i className="fa-solid fa-arrow-left text-[24px]"></i>
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 focus:outline-none rounded-full px-[12px] pt-[10px] pb-[9px]"
                onClick={() => sliderRef.current?.slickNext()}
              >
                <i className="fa-solid fa-arrow-right text-[24px]"></i>
              </button>
            </span>
          </div>
        </div>

        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {allCategoryis.length > 0 ? (
              allCategoryis.map((item, index) => (
                <div key={index}>
                  <div className="w-[230px] h-[230px]  p-[20px] flex justify-center items-center flex-col border border-[#000000]/30 rounded-lg bg-[#F5F5F5] cursor-pointer text-center">
                    <img
                      src={item.Image} 
                      alt={item.name} 
                      className=" w-[80px] mb-[18px] "
                    />
                    <span className="text-[20px] font-Poppipns_FONT font-medium text-[#000] leading-6 ">
                      {item.name}
                    </span>
                    <p className="text-[13px] font-Poppipns_FONT font-normal text-[#000] leading-6">
                      {truncateDescription(
                        item.description || 'No description available'
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading categories...</p> 
            )}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default Benner_2;
