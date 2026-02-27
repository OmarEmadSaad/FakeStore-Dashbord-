import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import Swal from "sweetalert2";
export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const product = useAppSelector((s) =>
    s.products.products.find((p) => p.id === Number(id)),
  );

  useEffect(() => {
    if (!product) dispatch(fetchProducts());
  }, [dispatch, product]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h5" color="blue-gray" className="animate-pulse">
          Loading Product Details...
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
      <Card className="w-full flex flex-col md:flex-row shadow-2xl overflow-hidden bg-white">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-full md:w-5/12 shrink-0 rounded-none bg-white flex items-center justify-center p-8 border-r border-gray-50"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-32 w-15 object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </CardHeader>

        <CardBody className=" flex flex-col justify-center">
          <Typography
            variant="small"
            color="blue"
            className="uppercase font-bold mb-2 tracking-wider"
          >
            {product.category}
          </Typography>

          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-3 font-black leading-tight"
          >
            {product.title}
          </Typography>

          <div className="flex items-center gap-2 mb-4">
            <Typography variant="h5" color="green" className="font-bold">
              ${product.price.toFixed(2)}
            </Typography>
          </div>

          <Typography
            color="gray"
            className="mb-8 font-normal leading-relaxed text-gray-600 italic"
          >
            {product.description}
          </Typography>

          <div className="flex flex-wrap gap-4 mt-auto">
            <Button
              size="md"
              color="green"
              variant="outlined"
              onClick={() => {
                if (!isAuthenticated) {
                  Swal.fire({
                    icon: "warning",
                    title: "Login Required",
                    text: "You must login first to add products to cart.",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Go to Login",
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
                  title: "Added!",
                  text: "Product added to cart successfully.",
                  timer: 1500,
                  showConfirmButton: false,
                });
              }}
              className="px-6 py-2.5 normal-case shadow-md hover:shadow-lg transition-all"
            >
              Add To Cart
            </Button>

            <Button
              size="md"
              variant="outlined"
              color="blue-gray"
              onClick={() => navigate("/")}
              className="px-6 py-2.5 normal-case border-gray-300 hover:bg-gray-50 transition-all"
            >
              Back to Shop
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
