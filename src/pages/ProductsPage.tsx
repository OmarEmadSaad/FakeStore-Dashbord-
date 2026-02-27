import { useEffect, useMemo, useState } from "react";
import {
  fetchProducts,
  fetchCategories,
  setPage,
} from "../features/products/productsSlice";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { Loader } from "lucide-react";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { SortBar } from "../components/product/SortBar";
import { EmptyState } from "../components/ui/EmptyState";
import { ProductsTable } from "../components/product/ProductsTable";
import { Pagination } from "../components/ui/Pagination";

export const ProductsPage = () => {
  const dispatch = useAppDispatch();

  const {
    products,
    loading,
    error,
    sortOption,
    categories,
    currentPage,
    itemsPerPage,
  } = useAppSelector((s) => s.products);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;
  }, [products, selectedCategory]);

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    if (sortOption === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sortOption === "name")
      sorted.sort((a, b) => a.title.localeCompare(b.title));

    return sorted;
  }, [filteredProducts, sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="animate-spin" size={40} />
      </div>
    );

  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => dispatch(fetchProducts())} />
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between mb-8 gap-4 flex-wrap">
        <SortBar />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-lg space"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <EmptyState message="No products yet!" />
      ) : (
        <>
          <ProductsTable
            products={sortedProducts}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />

          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={(page) => dispatch(setPage(page))}
          />
        </>
      )}
    </div>
  );
};
