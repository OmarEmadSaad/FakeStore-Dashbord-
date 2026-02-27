import { useState } from "react";
import { updateQuantity, removeFromCart } from "../features/cart/cartSlice";
import {
  Typography,
  Button,
  Card,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

const TABLE_HEAD = ["Image", "Name", "Price", "Quantity", "Actions"];

export const CartPage = () => {
  const cartItems = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [removingId, setRemovingId] = useState<number | null>(null);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0,
  );

  const handleRemove = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      dispatch(removeFromCart(id));
      setRemovingId(null);
    }, 300);
  };

  const increaseQty = (id: number, currentQty: number) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const decreaseQty = (id: number, currentQty: number) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen bg-gray-50/30">
      <div className="flex justify-between items-center mb-10">
        <Typography variant="h3" color="blue-gray" className="font-black">
          Shopping Cart
        </Typography>
        <Button
          variant="text"
          color="blue"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Shop
        </Button>
      </div>

      <Card className="w-full overflow-hidden shadow-sm border border-blue-gray-50">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={`border-b border-blue-gray-100 bg-blue-gray-50/50 p-4 ${
                    head === "Actions" || head === "Quantity"
                      ? "text-center"
                      : ""
                  }`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70 uppercase text-[11px]"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-gray-50">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className={`transition-all duration-300 hover:bg-gray-50/50 ${
                      removingId === item.id
                        ? "opacity-0 -translate-x-4"
                        : "opacity-100"
                    }`}
                  >
                    <td className="p-4">
                      <Avatar
                        loading="lazy"
                        src={item.image}
                        alt={item.title}
                        size="md"
                        variant="rounded"
                        className="bg-white p-1 border border-blue-gray-50 object-contain"
                      />
                    </td>

                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold max-w-[200px] truncate"
                      >
                        {item.title}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="font-bold text-blue-gray-800"
                      >
                        ${item.price.toFixed(2)}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <IconButton
                          size="sm"
                          variant="outlined"
                          className="rounded-full w-8 h-8"
                          disabled={item.quantity <= 1}
                          onClick={() => decreaseQty(item.id, item.quantity)}
                        >
                          <span className="text-lg">-</span>
                        </IconButton>

                        <Typography className="text-sm font-bold w-4 text-center">
                          {item.quantity ?? 1}
                        </Typography>

                        <IconButton
                          size="sm"
                          variant="outlined"
                          className="rounded-full w-8 h-8"
                          onClick={() => increaseQty(item.id, item.quantity)}
                        >
                          <span className="text-lg">+</span>
                        </IconButton>
                      </div>
                    </td>

                    {/* Remove */}
                    <td className="p-4 text-center">
                      <Button
                        size="sm"
                        color="red"
                        variant="text"
                        className="hover:bg-red-50 normal-case"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="opacity-50"
                    >
                      Your cart is empty
                    </Typography>
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() => navigate("/")}
                    >
                      Start Shopping
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Checkout Section */}
      {cartItems.length > 0 && (
        <div className="mt-10 flex flex-col items-end gap-4 p-6 bg-white rounded-xl border border-blue-gray-50 shadow-sm">
          <div className="flex gap-20 items-center justify-center">
            <Typography variant="h6" color="blue-gray" className="opacity-60">
              Subtotal:
            </Typography>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              ${totalPrice.toFixed(2)}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};
