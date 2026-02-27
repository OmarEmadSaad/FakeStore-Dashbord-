export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email?: string;
  password?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ProductsState {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  sortOption: string;
  itemsPerPage: number;
}

export interface CartState {
  items: CartItem[];
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
