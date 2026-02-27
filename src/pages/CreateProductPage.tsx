import { useEffect, useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateProductPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setError("Failed to load categories"));
  }, []);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !form.title ||
      !form.description ||
      !form.price ||
      !form.category ||
      !form.image
    ) {
      return "All fields are required";
    }

    if (Number(form.price) <= 0) {
      return "Price must be a positive number";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          image: form.image,
        }),
      });

      if (!response.ok) throw new Error("Failed to create product");

      const newProduct = await response.json();

      Swal.fire({
        icon: "success",
        title: "Product created successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/", {
        state: { newProduct },
      });

      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-lg rounded-2xl p-10 flex flex-col Space-long"
      >
        <Button
          variant="text"
          color="blue"
          onClick={() => navigate("/")}
          className="flex justify-end "
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
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-center font-bold"
        >
          Create Product
        </Typography>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Input
          crossOrigin={undefined}
          label="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />

        <Input
          crossOrigin={undefined}
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
          required
        />

        <div>
          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full border text-blue-gray-500 border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Input
          crossOrigin={undefined}
          label="Image URL"
          value={form.image}
          onChange={(e) => handleChange("image", e.target.value)}
          required
        />

        <Button
          type="submit"
          size="md"
          variant="outlined"
          disabled={loading}
          className="mt-2"
        >
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
};
