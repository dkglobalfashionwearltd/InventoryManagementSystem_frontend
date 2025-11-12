import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import ThemeToggler from "~/components/dark-mode/mode-toggler";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { loginUser } from "~/redux/features/auth/authSliceNew";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "~/components/loading";
import { toast } from "sonner";
import { LoadingTyping } from "~/components/loading-components/loading-typing";
import { useToken } from "~/components/getToken";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | DK Global | Inventory Management System" },
    {
      name: "description",
      content: "Welcome to Tanvirul's digital world login page!",
    },
  ];
}

const Login = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const dispatch = useAppDispatch();
  const { loginData: data, loading } = useAppSelector(
    (state) => state.loginNew
  );
  const navigate = useNavigate();
  const token = useToken();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [checkingAuth, setCheckingAuth] = useState(true); // ✅ start as true
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []); // 👈 empty dependency array — runs only once

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (!checkingAuth && token) {
      navigate("/dashboard", { replace: true });
    }
  }, [checkingAuth, token, navigate]);

  // ✅ Show toast after login attempt
  useEffect(() => {
    if (!attemptedLogin || !data) return;
    const showToast = data.success ? toast.success : toast.error;
    showToast(data.statusCode ?? data?.code, {
      description: data.message,
      position: "top-right",
      richColors: true,
    });
    if (data?.success) {
      navigate("/dashboard", { replace: true });
    }
  }, [attemptedLogin, data, navigate]);

  // ✅ Handle form logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formData;
    if (username && password) {
      dispatch(
        loginUser({
          baseUrl: "https://localhost:7189",
          data: { username, password, rememberMe: true },
        })
      );
      setAttemptedLogin(true);
    }
  };

  // ✅ Loading State
  if (checkingAuth || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <LoadingTyping />
      </div>
    );
  }

  // ✅ Don't show form if logged in
  if (token || data?.success) return null;

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-black p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="bg-transparent border-white">
            <CardHeader>
              <div className="flex max-sm:gap-4 sm:justify-between">
                <CardTitle className="text-2xl">Login</CardTitle>
                <div className="max-sm:bg-gray-800 rounded-full">
                  <ThemeToggler />
                </div>
              </div>
              <CardDescription>
                Enter your <span className="text-yellow-300">username</span>{" "}
                below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">User Name</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        required
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    {loading ? (
                      <LoadingSpinner className="flex items-center justify-center" />
                    ) : (
                      "Login"
                    )}
                  </Button>

                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
