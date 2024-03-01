import { Route, Routes } from "react-router-dom";
import HomePage from "@/views/client/home-page";
import ClientLayout from "@/views/layouts/client-layout";
import AuthLayout from "@/views/layouts/auth-layout";
import LoginPage from "@/views/auth/login-page";
import RegisterPage from "@/views/auth/register-page";
import AdminLayout from "@/views/layouts/admin-layout";
import DashboardPage from "@/views/admin/dashboard-page";
import NotFoundPage from "@/views/errors/not-found-page";
import GoogleCallbackPage from "@/views/client/google-callback-page";
import ProductPage from "@/views/admin/product-page";
import OrderPage from "@/views/admin/order-page";
import UserPage from "@/views/admin/user-page";
import ForgotPasswordPage from "@/views/auth/forgot-password-page";
import ResetPasswordPage from "@/views/auth/reset-password-page";
import SendVerifyPage from "@/views/auth/send-verify-page";
import VerifyPage from "@/views/auth/verify-page";
import CartPage from "@/views/client/cart-page";
import CheckoutPage from "./views/client/checkout-page";
import VNPayCallbackPage from "./views/client/vnpay-callback-page";

const App = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/user" element={<UserPage />} />
      </Route>

      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/callback-vnpay" element={<VNPayCallbackPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/verify" element={<SendVerifyPage />} />
        <Route path="/verify/:token" element={<VerifyPage />} />
      </Route>

      <Route path="/callback/google" element={<GoogleCallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
