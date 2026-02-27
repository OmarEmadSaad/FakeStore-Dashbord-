import axiosInstance from "../../services/axiosInstance";
import { Product } from "../../types";

export const fetchProductsAPI = () =>
  axiosInstance.get<Product[]>("/products").then((res) => res.data);
export const fetchCategoriesAPI = () =>
  axiosInstance.get<string[]>("/products/categories").then((res) => res.data);
export const createProductAPI = (product: Omit<Product, "id" | "rating">) =>
  axiosInstance.post<Product>("/products", product).then((res) => res.data);
