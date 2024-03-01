import FeaturedProduct from "@/components/client/featured-product";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    await api
      .get("/product")
      .then((response) => {
        setProducts(response.data.data.products);
      })
      .catch(() => toast.error("Không tải được tài nguyên, vui lòng thử lại"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="music" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="music" className="relative">
                Sản phẩm nổi bật
              </TabsTrigger>

              <TabsTrigger value="live" disabled>
                Phụ kiện
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="music" className="border-none p-0 outline-none">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Các sản phẩm nổi bật
                </h2>
                <p className="text-sm text-muted-foreground">
                  Lựa chọn hàng đầu dành cho bạn. Cập nhật hàng ngày.{" "}
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {products.map((product) => (
                    <FeaturedProduct
                      key={product.id}
                      product={product}
                      className="w-[200px]"
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
