import Nav from './Components/Ab_Navber/Nav';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './Components/Fotter/Footer';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Otp from './Pages/otpsent';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import CheckOut from './Pages/CheckOut';
import OrderStatus from './Pages/orderStatus';
import Account from './Pages/Account';
import ProductDetails from './Pages/ProductDetails';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import ProtectedRoute from './Protected/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Myorder from './Pages/Myorder';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<Product />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/account" element={<Account />} />
            <Route path="/OrderStatus" element={<OrderStatus />} />
            <Route path="/My-Order" element={<Myorder />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/otpsent" element={<Otp />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
