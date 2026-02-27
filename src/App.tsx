import { Routes, Route } from "react-router-dom";

import NotFound from "./NotFound";
import { ProductsPage } from "./pages/ProductsPage";
import { AuthPage } from "./pages/AuthPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { CreateProductPage } from "./pages/CreateProductPage";
import { Navbar } from "./components/Layout/Navbar";
import { ProtectedRoute } from "./components/Layout/ProtectedRoute";
import { CartPage } from "./pages/cartPage";

const App = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />

    <main className="flex-1">
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<CreateProductPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </div>
);

export default App;
