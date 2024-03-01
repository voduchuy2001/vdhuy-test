import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  decreaseQuantity,
  deleteCartItem,
  increaseQuantity,
} from "@/redux/cartSlide";
import { IMAGE_BASE_URL } from "@/utils/constant";
import { formatCurrencyVND } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPage = () => {
  const carts = useSelector((state) => state.product.cartItem);
  const dispatch = useDispatch();

  const removeCartItem = (id) => {
    dispatch(deleteCartItem(id));
  };

  const increase = (id) => {
    dispatch(increaseQuantity(id));
  };

  const decrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l">
      <div className="h-full px-4 py-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Giỏ hành của bạn</CardTitle>
            <CardDescription>
              Tổng giá trị đơn hàng:{" "}
              {formatCurrencyVND(
                carts.reduce((total, cart) => total + cart.price * cart.qty, 0)
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-6">
                {carts.map((cart) => (
                  <div
                    className="flex items-center justify-between space-x-4"
                    key={cart.id}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`${IMAGE_BASE_URL}/${cart.image}`} />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {cart.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrencyVND(cart.price)} x {cart.qty}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => decrease(cart.id)}
                        className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.5 9.5H13.5"
                            stroke=""
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <input
                        defaultValue={cart.qty}
                        type="text"
                        id="number"
                        className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-secondary text-center"
                      />

                      <button
                        onClick={() => increase(cart.id)}
                        className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.75 9.5H14.25M9 14.75V4.25"
                            stroke=""
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => removeCartItem(cart.id)}
                        className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                      >
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                            cx="17"
                            cy="17"
                            r="17"
                            fill=""
                          />
                          <path
                            className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                            d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                            stroke="#EF4444"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-end">
                <div className="mr-2">
                  <Button>
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
                  </Button>
                </div>
                {carts.length > 0 && (
                  <Button variant="outline">
                    <Link to={"/checkout"}>Thanh toán</Link>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-2 w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
