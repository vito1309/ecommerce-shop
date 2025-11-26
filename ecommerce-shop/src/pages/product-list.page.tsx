import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-products";
import { Link, useSearchParams } from "react-router-dom";

export function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId') || undefined;

  const { data: products = [], isLoading } = useProducts(categoryId);

  return (
    <>
      <CategoryMenu />
      <section className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {!isLoading &&
            products.map((product) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
              >
                <ProductCard product={product} />
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
