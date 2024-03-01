import Menu from "@/components/client/menu";
import SideBar from "@/components/client/side-bar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <>
      <Toaster />

      <div className="hidden md:block">
        <Menu />

        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <SideBar className="hidden lg:block" />

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientLayout;
