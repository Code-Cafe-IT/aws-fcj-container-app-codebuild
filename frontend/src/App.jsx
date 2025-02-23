import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

// Import các màn hình
import LoginScreen from "./screens/auth/LoginScreen";
import OrderScreen from "./screens/order/OrderScreen";
import DeliveryScreen from "./screens/order/DeliveryScreen";
import OrderCreateScreen from "./screens/order/OrderCreateScreen";
import OrderViewScreen from "./screens/order/OrderViewScreen";
import ActiveOrdersScreen from "./screens/order/ActiveOrdersScreen";
import OrderEditScreen from "./screens/order/OrderEditScreen";
import TableScreen from "./screens/table/TableScreen";
import TableEditScreen from "./screens/table/TableEditScreen";
import ProductScreen from "./screens/product/ProductScreen";
import ProductEditScreen from "./screens/product/ProductEditScreen";
import ClientScreen from "./screens/client/ClientScreen";
import ClientEditScreen from "./screens/client/ClientEditScreen";
import CategoryScreen from "./screens/category/CategoryScreen";
import CategoryEditScreen from "./screens/category/CategoryEditScreen";
import UserScreen from "./screens/user/UserScreen";
import UserEditScreen from "./screens/user/UserEditScreen";
import ProfileScreen from "./screens/user/ProfileScreen";
import DashboardScreen from "./screens/DashboardScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import NotAuthorizedScreen from "./screens/NotAuthorizedScreen";

// Import các route handling
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

const MainRoutes = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Cấu hình route
  const routes = [
    {
      path: "/",
      element: <PrivateRoute />, // Protect private routes
      children: [
        { path: "active", element: <ActiveOrdersScreen /> },
        { path: "profile", element: <ProfileScreen /> },
        { path: "category/:id/edit", element: <CategoryEditScreen /> },
        { path: "category", element: <CategoryScreen /> },
        { path: "delivery", element: <DeliveryScreen /> },
        { path: "client/:id/edit", element: <ClientEditScreen /> },
        { path: "client", element: <ClientScreen /> },
        { path: "product/:id/edit", element: <ProductEditScreen /> },
        { path: "product", element: <ProductScreen /> },
        { path: "table/:id/edit", element: <TableEditScreen /> },
        { path: "table", element: <TableScreen /> },
        { path: "order/create/:id/table", element: <OrderCreateScreen /> },
        { path: "order/:id/edit", element: <OrderEditScreen /> },
        { path: "order/:id/view", element: <OrderViewScreen /> },
        { path: "order/create", element: <OrderCreateScreen /> },
        { path: "order", element: <OrderScreen /> },
        { path: "not-authorized", element: <NotAuthorizedScreen /> },
        { path: "", element: <DashboardScreen /> }, // Home
        { path: "/dashboard", element: <Navigate to={"/"} replace /> }, // Home
      ],
    },
    {
      path: "/user",
      element: <AdminRoute />, // Protect admin routes
      children: [
        { path: ":id/edit", element: <UserEditScreen /> },
        { path: "", element: <UserScreen /> }, // User home
      ],
    },
    { path: "*", element: <NotFoundScreen /> }, // Fallback for unknown routes
  ];

  // Áp dụng routes sử dụng useRoutes
  const routing = useRoutes(routes);

  return (
    <>
      <Header />
      <Menu />
      <div className="content-wrapper">{routing}</div>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
