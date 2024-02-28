import Socialite from "@/components/auth/socialite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
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

const formSchema = z.object({
  email: z.string().email("Kiểm tra định dạng email."),
});

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    await api
      .post("/forgot-password", data)
      .then(() => {
        toast.success("Vui lòng kiểm tra email");
        form.reset();
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
              Bạn quên mật khẩu
            </h1>
            <p className="text-muted-foreground text-sm">
              Đừng lo hãy thực hiện theo các bước sau
            </p>
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

                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Gởi đương dẫn khôi phục mật khẩu
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

export default ForgotPasswordPage;
