import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">Tiếng Việt</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Tiếng Việt</MenubarItem>
          <MenubarItem>Tiếng Anh</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="relative">VNĐ</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>VNĐ</MenubarItem>
          <MenubarItem>USD</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="relative">
          <Link to={"/cart"}>Giỏ hàng</Link>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="hidden md:block">Tài khoản</MenubarTrigger>
        <MenubarContent forceMount>
          <MenubarItem>
            <Link to={"/login"}>Đăng nhập</Link>
          </MenubarItem>
          <MenubarItem>
            <Link to={"/register"}>Đăng Ký</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Menu;
