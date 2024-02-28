import api from "@/utils/axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const VerifyPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      await api
        .get(`/verify/${token}`)
        .then(() => {
          toast.success("Xác thực thành công");
          navigate("/");
        })
        .catch(() => {
          toast.error("Xác thực không thành công");
          navigate("/");
        });
    };

    verify();
  });

  return null;
};

export default VerifyPage;
