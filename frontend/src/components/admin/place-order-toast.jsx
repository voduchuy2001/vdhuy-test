import { toast } from "sonner";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io.connect(import.meta.env.VITE_SERVER_URL);

const PlaceOrderToast = () => {
  useEffect(() => {
    socket.on("orderCreated", () => {
      toast.success("Bạn vừa có thêm 1 đơn hàng mới");
    });

    return () => {
      socket.off("orderCreated");
      socket.disconnect();
    };
  }, [socket]);

  return null;
};

export default PlaceOrderToast;
