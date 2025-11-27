import { useFavorites } from "@/cases/favorites/hooks/use-favorites";
import { ProductCard } from "@/cases/products/components/product-card";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";

export function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Meus Favoritos
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-8">
                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Nenhum produto favorito</h2>
                        <p className="text-gray-500 mb-6">Você ainda não adicionou nenhum produto aos favoritos</p>
                        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                            Continuar comprando
                        </Link>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-6">Meus Favoritos ({favorites.length})</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {favorites.map((product) => (
                                <Link 
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                >
                                    <ProductCard product={product} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
