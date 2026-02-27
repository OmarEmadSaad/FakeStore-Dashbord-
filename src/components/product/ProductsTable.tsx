import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, Typography, Avatar, Button } from "@material-tailwind/react";
import { Product } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addToCart } from "../../features/cart/cartSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useMemo } from "react";
import Swal from "sweetalert2"; // استيراد SweetAlert2

interface Props {
  products: Product[];
  currentPage: number;
  itemsPerPage: number;
}

const TABLE_HEAD = ["Image", "Name", "Price", "Category", "Actions"];

export const ProductsTable = ({
  products,
  currentPage,
  itemsPerPage,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  const allProducts = useMemo(() => {
    const newProd = location.state?.newProduct;
    if (newProd) {
      const exists = products.some((p) => p.id === newProd.id);
      return exists ? products : [newProd, ...products];
    }
    return products;
  }, [products, location.state]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = allProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // دالة التعامل مع إضافة المنتج للعربة
  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      // إذا لم يكن مسجل دخول، أظهر التنبيه
      Swal.fire({
        title: "Login Required!",
        text: "You must be logged in to add products to your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth");
        }
      });
      return;
    }

    dispatch(addToCart(product));
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.title.substring(0, 20)}... added successfully!`,
      timer: 1500,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  };

  return (
    <Card className="h-full w-full overflow-auto mt-4 shadow-xl">
      {isAuthenticated && (
        <div className="flex justify-center py-4">
          <Link to="/create">
            <Button color="green" size="md" variant="outlined">
              + Add Product
            </Button>
          </Link>
        </div>
      )}

      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${
                  head === "Actions" ? "text-center" : ""
                }`}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-90"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => {
              const isLast = index === currentProducts.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={product.id} className="hover:bg-blue-50 transition">
                  <td className={classes}>
                    <Avatar
                      src={product.image}
                      alt={product.title}
                      size="md"
                      className="border border-blue-gray-100"
                    />
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-bold">
                      {product.title.length > 30
                        ? product.title.substring(0, 30) + "..."
                        : product.title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-bold text-green-600"
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-medium">
                      {product.category}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        size="sm"
                        color="blue"
                        variant="outlined"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        Details
                      </Button>
                      <Button
                        size="sm"
                        color="green"
                        onClick={() => handleAddToCart(product)} // استخدام الدالة الجديدة
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="p-8 text-center text-gray-500">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
};
