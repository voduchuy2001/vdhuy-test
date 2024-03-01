import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/cartSlide";
import { IMAGE_BASE_URL } from "@/utils/constant";
import { formatCurrencyVND } from "@/utils/helper";

const FeaturedProduct = ({ product, className, ...props }) => {
  const dispatch = useDispatch();

  const addToCart = (id, name, price, image) => {
    dispatch(
      addCartItem({
        id: id,
        name: name,
        price: price,
        image: image,
      })
    );
  };

  return (
    <div className={cn("space-y-5", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <img
              src={`${IMAGE_BASE_URL}/${product?.Images[0]?.url}`}
              alt={product.name}
              width={500}
              height={400}
            />
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-40">
          <ContextMenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span
              onClick={() =>
                addToCart(
                  product.id,
                  product.name,
                  product.Prices[0].price,
                  product?.Images[0]?.url
                )
              }
            >
              Thêm vào giỏ
            </span>
          </ContextMenuItem>

          <ContextMenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            Yêu thích
          </ContextMenuItem>

          <ContextMenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            Chia sẻ
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{product.name}</h3>
        <p className="text-xs text-muted-foreground">
          {formatCurrencyVND(product.Prices[0].price)}
        </p>
      </div>
    </div>
  );
};

export default FeaturedProduct;
