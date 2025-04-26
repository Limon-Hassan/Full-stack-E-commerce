import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authReducer'; 
import cartReducer from './slice/Cartslice'; 

const store = configureStore({
  reducer: {
    auth: authReducer, 
    cart: cartReducer, 
  },
});

export default store;
