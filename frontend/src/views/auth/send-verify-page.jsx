import { Button } from "@/components/ui/button";
import api from "@/utils/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

const SendVerifyPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);

    await api
      .post("/send-verification-email")
      .then(() => {
        toast.success("Vui lòng kiểm tra email");
      })
      .catch(() => {
        toast.error("Yêu cầu không thành công");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Nếu bạn chưa thấy email xác nhận
            </h1>
            <p className="text-muted-foreground text-sm">
              Hãy kiểm tra thư mục spam hoặc gởi lại yêu cầu
            </p>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="grid gap-1 mb-2">
                <Button
                  type="button"
                  onClick={() => onSubmit()}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Gửi yêu cầu xác thực
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendVerifyPage;
