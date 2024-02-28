import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div> */}
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
