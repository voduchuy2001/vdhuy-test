import api from "@/utils/axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleCallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const authorizationCode = queryParams.get("code");

    const callback = async () => {
      await api
        .get(`/callback/google?code=${authorizationCode}`)
        .then(() => {
          toast.success("Đăng nhập thành công");
          navigate("/");
        })
        .catch(() => navigate("/"));
    };

    callback();
  });

  return null;
};

export default GoogleCallbackPage;
