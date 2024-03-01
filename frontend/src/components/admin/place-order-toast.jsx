import { toast } from "sonner";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io.connect(import.meta.env.VITE_SERVER_URL);

const PlaceOrderToast = () => {
  useEffect(() => {
    socket.on("orderCreated", (response) => {
      toast.success(`Người dùng: ${response.name} vừa đặt hàng`);
    });

    return () => {
      socket.off("orderCreated");
      socket.disconnect();
    };
  }, [socket]);

  return null;
};

export default PlaceOrderToast;
