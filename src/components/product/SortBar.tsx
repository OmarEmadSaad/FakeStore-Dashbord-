import { setSort } from "../../features/products/productsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

export const SortBar = () => {
  const dispatch = useAppDispatch();
  const sortOption = useAppSelector((s) => s.products.sortOption);

  return (
    <select
      value={sortOption}
      onChange={(e) => dispatch(setSort(e.target.value))}
      className="border border-gray-300 rounded-lg px-4 py-2 text-lg space"
    >
      <option value="default">Default Sorting</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name">Name: A-Z</option>
    </select>
  );
};
