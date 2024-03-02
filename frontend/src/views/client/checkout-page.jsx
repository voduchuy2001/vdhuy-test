import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clearCart } from "@/redux/cartSlide";
import api from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const phoneRegex =
  /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/;

const formSchema = z.object({
  name: z.string().min(1, "Tên không được để trống."),
  email: z.string().email("Kiểm tra định dạng email."),
  address: z.string().min(6, "Địa chỉ nhận hàng không được để trống."),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Kiểm tra lại định dạng số điện thoại"),
  note: z.string().min(0),
  paymentMethod: z.string().refine((value) => {
    return value === "COD" || value === "VNPAY";
  }, "Phương thức thanh toán không hợp lệ."),
  bankCode: z
    .string()
    .refine(
      ({ paymentMethod, bankCode }) => {
        if (paymentMethod === "VNPAY") {
          return bankCode && bankCode.trim().length > 0;
        }
        return true;
      },
      {
        message:
          "Vui lòng nhập mã ngân hàng khi chọn phương thức thanh toán là VNPay.",
        path: ["bankCode"],
      }
    )
    .optional(),
});

const CheckoutPage = () => {
  const carts = useSelector((state) => state.product.cartItem);
  const [isLoading, setIsLoading] = useState(false);
  const [isVNPay, setIsVNPay] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderProducts = Object.values(carts).map((item) => [
    item.id,
    item.qty,
    item.price,
  ]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      paymentMethod: "COD",
      note: "",
      bankCode: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    await api
      .post("/order", {
        name: data.name,
        email: data.email,
        address: data.address,
        phoneNumber: data.phoneNumber,
        paymentMethod: data.paymentMethod,
        bankCode: data.bankCode,
        note: data.note,
        orderProducts: orderProducts,
      })
      .then((response) => {
        if (data.paymentMethod === "COD") {
          toast.success("Bạn đã đặt hàng thành công");
          dispatch(clearCart());
          return navigate("/");
        }

        window.location.href = response.data.data;
        dispatch(clearCart());
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l">
      <div className="h-full px-4 py-6 lg:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Lựa chọn phương thức thanh toán</CardTitle>
                <CardDescription>
                  Hoàn thành các thông tin sau trước khi đặt hàng
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Chọn phương thức thanh toán</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="COD"
                                onClick={() => setIsVNPay(false)}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              COD (Thanh toán khi nhận hàng)
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="VNPAY"
                                onClick={() => setIsVNPay(true)}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              VNPay (Thanh toán qua ví VNPay)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isVNPay && (
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="bankCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chọn ngân hàng</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn ngân hàng để thanh toán" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="NCB">NCB</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập họ và tên" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Địa chỉ email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập số điện thoại"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ nhận hàng</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập địa chỉ nhận hàng"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ghi chú</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ghi chú cho đơn hàng"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>

              <CardFooter className="justify-end ml-2 space-x-2">
                <Button asChild>
                  <span className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mr-2 w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                      />
                    </svg>
                    <Link to={"/"}>Tiếp tục mua sắm</Link>
                  </span>
                </Button>

                <Button variant="outline" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="m-2 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  )}
                  Đặt hàng
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutPage;
