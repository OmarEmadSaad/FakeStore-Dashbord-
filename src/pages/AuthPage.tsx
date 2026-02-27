import { useState } from "react";
import { login, signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { InputChangeEvent, FormSubmitEvent } from "../types";
import Swal from "sweetalert2";
export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await dispatch(login({ username, password })).unwrap();
        Swal.fire({
          icon: "success",
          title: "Logged In!",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await dispatch(signup({ username, password })).unwrap();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Account created successfully.",
          confirmButtonColor: "#3b82f6",
        });
      }

      navigate("/");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  return (
    <div className="from flex items-center justify-center min-h-screen bg-gray-50">
      <div className="auth-card w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl text-blue-500 font-bold text-center mb-8">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="form-content flex flex-col gap-6"
        >
          <Input
            crossOrigin={undefined}
            label="Username"
            color="blue"
            size="lg"
            value={username}
            onChange={(e: InputChangeEvent) => setUsername(e.target.value)}
            className="text-gray-900"
          />

          {!isLogin && (
            <Input
              crossOrigin={undefined}
              label="Email"
              color="blue"
              size="lg"
              type="email"
              value={email}
              onChange={(e: InputChangeEvent) => setEmail(e.target.value)}
              className="text-gray-900"
            />
          )}

          <Input
            crossOrigin={undefined}
            label="Password"
            type="password"
            color="blue"
            size="lg"
            value={password}
            onChange={(e: InputChangeEvent) => setPassword(e.target.value)}
            className="text-gray-900"
          />

          <Button
            type="submit"
            size="lg"
            color="blue"
            variant="gradient"
            fullWidth
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>

          <p className="toggle-text text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 font-bold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
