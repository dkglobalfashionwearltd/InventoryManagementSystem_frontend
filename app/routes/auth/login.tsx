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
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "~/components/loading";
import { toast } from "sonner";
import { LoadingTyping } from "~/components/loading-components/loading-typing";
import { getToken } from "~/components/getLocalStorage";
import { LoginRequest } from "~/redux/features/auth/authSlice";
import { Checkbox } from "~/components/ui/checkbox";

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
  const { data, loading } = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const token = getToken();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [checkingAuth, setCheckingAuth] = useState(true); // ✅ start as true
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    dispatch(
      LoginRequest({
        req: formData,
      })
    );
    setAttemptedLogin(true);
  };

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
                    <Label htmlFor="userName">User Name</Label>
                    <Input
                      id="userName"
                      name="userName"
                      type="text"
                      required
                      value={formData.userName}
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

                  <div className="">
                    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
                      <Checkbox
                        checked={formData.rememberMe}
                        onCheckedChange={(checked: boolean) =>
                          setFormData({ ...formData, rememberMe: checked })
                        }
                        id="remember"
                        className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          Remember Me
                        </p>
                      </div>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">
                    {loading ? (
                      <LoadingSpinner className="flex items-center justify-center" />
                    ) : (
                      "Login"
                    )}
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
