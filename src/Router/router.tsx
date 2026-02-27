import { createBrowserRouter, Outlet } from "react-router-dom";

import { Navbar } from "../components/Layout/Navbar";
import { Footer } from "../components/Layout/Footer";
import { ProductsPage } from "../pages/ProductsPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { AuthPage } from "../pages/AuthPage";
import { CreateProductPage } from "../pages/CreateProductPage";
import { ProtectedRoute } from "../components/Layout/ProtectedRoute";
import { CartPage } from "../pages/cartPage";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <ProductsPage /> },
      { path: "/product/:id", element: <ProductDetailsPage /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/cart", element: <CartPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/create", element: <CreateProductPage /> }],
      },
    ],
  },
]);
