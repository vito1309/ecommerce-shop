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

            <div className="py-12">
                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Nenhum produto favorito</h2>
                        <p className="text-gray-600 font-medium mb-6">Você ainda não adicionou nenhum produto aos favoritos</p>
                        <Link to="/" className="text-green-600 hover:text-green-700 font-bold transition-colors">
                            Continuar comprando
                        </Link>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold mb-8 text-gray-900">Meus Favoritos ({favorites.length})</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
                            {favorites.map((product) => (
                                <Link 
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                    className="group"
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
