import api from "@/utils/axios";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Socialite = ({ isLoading }) => {
  const redirect = async (provider) => {
    await api
      .get(`redirect/${provider}`)
      .then((response) => {
        window.location.href = response.data.data;
      })
      .catch(() =>
        toast.error("Có lỗi xảy ra vui lòng tải lại trang và thử lại")
      );
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            hoặc tiếp tục với
          </span>
        </div>
      </div>

      <Button
        onClick={() => redirect("google")}
        variant="outline"
        disabled={isLoading}
      >
        Google
      </Button>
    </>
  );
};

export default Socialite;
