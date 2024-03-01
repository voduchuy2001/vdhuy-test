import api from "@/utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VNPayCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;

    const callback = async () => {
      await api
        .get(`/callback-vnpay${queryString}`)
        .then(() => {
          toast.success("Thanh toán thành công");
          navigate("/");
        })
        .catch(() => {
          toast.success("Thanh toán không thành công");
          navigate("/");
        });
    };

    callback();
  });

  return null;
};

export default VNPayCallbackPage;
