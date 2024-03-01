import MainNavbar from "@/components/admin/main-navbar";
import PlaceOrderToast from "@/components/admin/place-order-toast";
import Search from "@/components/admin/search";
import UserNavbar from "@/components/admin/user-navbar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Toaster />
      <PlaceOrderToast />

      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNavbar className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNavbar />
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
