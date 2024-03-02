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
          setInterval(() => {
            navigate("/");
          }, 1000);
        })
        .catch(() => {
          toast.success("Thanh toán không thành công");
          setInterval(() => {
            navigate("/");
          }, 1000);
        });
    };

    callback();
  });

  return null;
};

export default VNPayCallbackPage;
