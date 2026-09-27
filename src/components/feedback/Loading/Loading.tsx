import type { TLoading } from "@typeCustome/TypeLoading"
import type {Terror} from "@typeCustome/TypeError"
import SliderSkeleton from "../Skeleton/SliderSkeleton"
import BlogsSkeleton from "../Skeleton/BlogsSkeleton"
import CategoriesSkeleton from "../Skeleton/CategoriesSkeleton"
import TopBrandSkeleton from "../Skeleton/TopBrandSkeleton"
import CartItemsSkeleton from "../Skeleton/CartItemsSkeleton"
import ProductItemSkeleton from "../Skeleton/ProductItemSkeleton"
const selektonType={
  blogs:BlogsSkeleton,
  slider:SliderSkeleton,
categories:CategoriesSkeleton,
top_brands:TopBrandSkeleton,
CartItem:CartItemsSkeleton,
ProductsItem:ProductItemSkeleton
}
interface LoadingProps{
  loading:TLoading,
  error:Terror,
  children:React.ReactNode
  type:'blogs' | 'slider' |'categories' | 'top_brands'| 'CartItem' |'ProductsItem'

}
const Loading = ({ loading, error, children, type }: LoadingProps) => {
  const Components = selektonType[type];

  if (loading === "pending") {
    if (!Components) {
      console.error("Skeleton undefined for type:", type, selektonType);
      return <p>Loading...</p>;
    }
    return <Components />;
  }
  if (loading === "failed") return <p>{error}</p>;
  return <div>{children}</div>;
};


export default Loading