import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-products";
import { Link, useSearchParams } from "react-router-dom";

export function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId') || undefined;
  const search = searchParams.get('search') || undefined;

  const { data: products = [], isLoading } = useProducts(categoryId, search);

  return (
    <>
      <CategoryMenu />

      {search && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900 font-medium">
            Resultados para: <span className="font-bold">"{search}"</span>
            {products.length === 0 ? (
              <span className="ml-2">— Nenhum produto encontrado</span>
            ) : (
              <span className="ml-2">— {products.length} produto(s) encontrado(s)</span>
            )}
          </p>
        </div>
      )}

      <section className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500">Carregando produtos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
            {products.map((product) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
