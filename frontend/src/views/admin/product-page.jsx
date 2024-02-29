import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import api from "@/utils/axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = () => {
    api
      .get(`/admin/product?page=${currentPage}&limit=${perPage}`)
      .then((response) => {
        setProducts(response.data.data.data);
        setTotalPages(response.data.data.totalPages);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handlePreviousClick = () =>
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);

  const handleNextClick = () =>
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Danh sách các sản phẩm
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">STT</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {(currentPage - 1) * perPage + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{product?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePreviousClick} />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext onClick={handleNextClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ProductPage;
