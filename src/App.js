import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Pagenotfound from './components/Pagenotfound';
import Register from './pages/Register';
import Login from "./pages/Login.jsx";
import PrivateRoute from "./Routes/Private.js";
import Dashboard from "./pages/Dashboard.jsx";
import AdminRoute from "./Routes/Admin.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminCreateProducts from './pages/Admin/AdminCreateProducts';
import AdminUpdateProducts from './pages/Admin/AdminUpdateProducts';
import AdminOrders from './pages/Admin/AdminOrders.jsx';
import AdminProducts from './pages/Admin/AdminProducts.jsx';
import AdminUsers from './pages/Admin/AdminUsers';
import ProductList from "./pages/ProductList.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Cart from './pages/Cart.jsx'
import Orders from "./pages/User/Orders.jsx";
import Profile from "./pages/User/Profile.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList/>}/>
      <Route path="/product/:slug" element={<SingleProduct/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<AdminCreateProducts />} />
          <Route path="admin/product/:slug" element={<AdminUpdateProducts />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/orders" element={<AdminOrders />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>

  );
}

export default App;

//<Route path="" element={<Dashboard />} />
/*<Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="" element={<Dashboard />} />
      </Route>*/