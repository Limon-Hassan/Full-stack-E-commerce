import React, { useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { Link } from 'react-router-dom';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from '@material-tailwind/react';

const Nav = () => {
  let [cartcount, setCartCount] = useState(0);
  let [userNO, setuserNO] = useState(null);
  let [user, setUser] = useState(null);

  useEffect(() => {
    const updateCartCount = () => {
      const userId = localStorage.getItem('userId');
      const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];

      if (!userId || storedCartItems.length === 0) {
        setCartCount(0);
      } else {
        const count = storedCartItems.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        );
        setCartCount(count);
      }
    };

    updateCartCount();

    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setuserNO(true);
    } else {
      setuserNO(false);
    }
    const userInfo = localStorage.getItem('authuser');
    setUser(userInfo);
  }, []);

  return (
    <>
      <nav className="pt-[40px] pb-[20px] border-b border-[#000000]/20">
        <Container>
          <div className="flex justify-between items-center ">
            <Link to="/">
              <img src="/Logo.png" alt="Logo" />
            </Link>
            <ul className="flex">
              <li>
                <Link
                  to="/"
                  class="relative text-[16px] font-Poppipns_FONT leading-6 font-medium ml-[48px] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  class="relative text-[16px] font-Poppipns_FONT leading-6 font-medium ml-[48px] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  class="relative text-[16px] font-Poppipns_FONT leading-6 font-medium ml-[48px] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  About
                </Link>
              </li>
              {!user && (
                <li>
                  <Link
                    to="/sign-up"
                    class="relative text-[16px] font-Poppipns_FONT leading-6 font-medium ml-[48px] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                  >
                    Sign Up
                  </Link>
                </li>
              )}
            </ul>
            <div
              className={`${
                user ? 'w-[430px]' : 'w-[350px]'
              }  h-[40px] relative`}
            >
              <input
                className="w-full h-full rounded-[5px] pl-[20px] pr-[40px] placeholder:text-[12px] placeholder:text-[#000000]  placeholder:font-Poppipns_FONT pb-[5px] bg-[#F5F5F5] "
                placeholder="What are you looking for?"
                type="text"
              />
              <span className="absolute top-[8px] right-[10px] text-[15px] cursor-pointer  after:content-[''] after:absolute after:w-[30px] after:h-[30px] after:bg-[#000]/20 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
                <i class="fa-sharp fa-regular fa-magnifying-glass relative z-10"></i>
              </span>
            </div>
            {userNO === true && user && (
              <div className="flex items-center gap-[50px]">
                <div className="relative">
                  <Link to="/cart">
                    <i className="fa fa-shopping-cart text-2xl"></i>
                    {cartcount > 0 && (
                      <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartcount}
                      </span>
                    )}
                  </Link>
                </div>
                <Menu>
                  <MenuHandler className="w-[60px] h-[60px] rounded-full border-2 p-[3px] cursor-pointer  border-red-500">
                    <Avatar
                      variant="circular"
                      alt="tania andrew"
                      className="cursor-pointer"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                  </MenuHandler>
                  <MenuList>
                    <MenuItem className="flex items-center gap-2">
                      <Link className="flex items-center gap-2" to="/account">
                        <i class="fa-solid fa-circle-user text-base"></i>

                        <Typography variant="small" className="font-medium">
                          My Account
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2">
                      <Link className="flex items-center gap-2" to="#">
                        <i class="fa-solid fa-bag-shopping text-base"></i>
                        <Typography variant="small" className="font-medium">
                          My Orders
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2">
                      <Link className="flex items-center gap-2" to="#">
                        <i class="fa-regular fa-circle-xmark text-base"></i>
                        <Typography variant="small" className="font-medium">
                          My Returns & Cancellations
                        </Typography>
                      </Link>
                    </MenuItem>
                    <hr className="my-2 border-blue-gray-50" />
                    <MenuItem className="flex items-center gap-2 ">
                      <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                          fill="#90A4AE"
                        />
                      </svg>
                      <Typography variant="small" className="font-medium">
                        Sign Out
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            )}
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Nav;
