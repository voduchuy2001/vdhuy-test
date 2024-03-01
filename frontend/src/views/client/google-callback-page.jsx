import { login } from "@/redux/userSlice";
import api from "@/utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleCallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const authorizationCode = queryParams.get("code");

    const callback = async () => {
      await api
        .get(`/callback/google?code=${authorizationCode}`)
        .then((response) => {
          toast.success("Đăng nhập thành công");
          dispatch(login(response.data));
          navigate("/");
        })
        .catch(() => navigate("/"));
    };

    callback();
  });

  return null;
};

export default GoogleCallbackPage;
