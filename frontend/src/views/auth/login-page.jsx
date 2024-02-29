import Socialite from "@/components/auth/socialite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDispatch } from "react-redux";
import { login } from "@/redux/userSlice";

const formSchema = z.object({
  email: z.string().email("Kiểm tra định dạng email."),
  password: z.string().min(1, "Vui lòng nhập mật khẩu."),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    await api
      .post("/login", data)
      .then((response) => {
        toast.success("Đăng nhập thành công");
        dispatch(login(response.data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(() => {
        toast.error("Vui lòng kiểm tra thông tin tài khoản");
        form.reset();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Đăng nhập ngay
            </h1>
          </div>

          <div className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <div className="grid gap-1 mb-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-1 mb-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mật khẩu</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Mật khẩu"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Đăng nhập
                  </Button>
                </div>
              </form>
            </Form>

            <div className="text-center">
              <Button asChild variant="link">
                <Link to={"/register"}>Đăng kí ngay</Link>
              </Button>
            </div>

            <Socialite isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
