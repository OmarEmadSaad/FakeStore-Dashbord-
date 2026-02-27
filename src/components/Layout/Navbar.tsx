import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { ShoppingCart } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const Navbar = () => {
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const cartItems = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-red-500">
          Bosta
        </Link>
        <span className="text-lg font-medium">
          Welcome{" "}
          <span className="ml-2 text-light-blue-500">{user?.username}</span>
        </span>
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Button
                variant="outlined"
                color="red"
                size="md"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>

              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 hover:bg-gray-100 rounded-full transition"
              >
                <ShoppingCart size={28} className="text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </>
          ) : (
            <Link to="/auth">
              <Button color="blue" size="md" variant="outlined">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
