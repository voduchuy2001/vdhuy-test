import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const MainNavbar = ({ className, props }) => {
  return (
    <div>
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          to={"/dashboard"}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Tổng quan
        </Link>

        <Link
          to={"/product"}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Sản phẩm
        </Link>

        <Link
          to={"/user"}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Người dùng
        </Link>

        <Link
          to={"order"}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Đơn hàng
        </Link>
      </nav>
    </div>
  );
};

export default MainNavbar;
