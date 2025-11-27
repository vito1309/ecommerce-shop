import { UseCart } from "@/cases/cart/hooks/use-cart";
import type { ProductDTO } from "@/cases/products/dtos/product.dto"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { useOrders } from "@/cases/orders/hooks/use-order";
import { RatingForm } from "@/cases/ratings/components/rating-form";
import { RatingDisplay } from "@/cases/ratings/components/rating-display";

type ProductDetailProps = {
    product: ProductDTO
}

export function ProductDetail({
    product
}: ProductDetailProps) {

    const {addProduct} = UseCart()
    const { user } = useAuth();
    const { data: userOrders = [] } = useOrders();

    const bucketBaseURL = import.meta.env.VITE_BUCKET_URL || '';
    const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

    // Verificar se o usuário já comprou este produto
    const hasPurchased = userOrders.some(order =>
        order.items?.some(item => item.product?.id === product.id)
    );

    const placeholderSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23e5e7eb" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%23666"%3ESem Imagem%3C/text%3E%3C/svg%3E';

    const photos = product?.photos ?? [];
    const mainPhoto = photos[selectedPhoto];
    const mainImagePhoto = mainPhoto && bucketBaseURL
        ? `${bucketBaseURL}${mainPhoto.path}`
        : placeholderSVG;



        function handleAddProductCart(){
        addProduct(product)
    }

    return (
        <div className="flex gap-20 py-8 items-start justify-center">

            <div className="flex-shrink-0">
                <div className="w-[720px] h-[800px] flex items-center justify-center rounded-2xl shadow-md overflow-hidden bg-white border border-gray-100" style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.06)" }}>
                    <img src={mainImagePhoto}
                        className="max-h-full max-w-full object-contain p-2.5" />
                </div>

                {photos && photos.length > 1 && (
                    <ul className="mt-6 w-full overflow-x-auto flex gap-3 pb-2">
                        {photos.map((photo, index) => (
                            <li key={photo.id}>
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedPhoto(index)}
                                    className="w-24 h-24 rounded-xl overflow-hidden border-2 hover:border-green-600 hover:cursor-pointer transition-all hover:shadow-md bg-white"
                                    style={{
                                        borderColor: index === selectedPhoto ? '#16a34a' : '#e5e7eb'
                                    }}>
                                    <img
                                        src={bucketBaseURL ? `${bucketBaseURL}${photo.path}` : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23f3f4f6" width="96" height="96"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="11" fill="%23666"%3ESem%3C/text%3E%3C/svg%3E'}
                                        className="w-full h-full object-contain p-1"
                                    />
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex flex-col gap-4 flex-1">
                    <div className="mt-8">
                        <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
                        <div className="mb-4">
                            {product.brand && (
                                <span className="px-3 py-1 rounded-full text-xs text-white bg-blue-600 font-semibold">
                                    {product.brand.name}
                                </span>
                            )}
                        </div>
                        <p className="mt-4 text-gray-600 font-medium">{product.description}</p>
                        <div className="flex flex-col mt-4 gap-2">
                            <p className="text-gray-500 line-through mb-1 font-medium">
                                R$ {(Number(product.price) * 1.15).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <p className="text-sm text-gray-600 mb-3 font-medium">Preço</p>
                        <p className="text-4xl font-bold text-blue-600 mb-2">R$ {Number(product.price).toFixed(2)}</p>
                        <p className="text-sm text-gray-600 font-medium">ou R$ {(Number(product.price) * 0.9).toFixed(2)} no PIX</p>
                    </div>

                    <div className="border-t pt-6">
                        <Button 
                            onClick={handleAddProductCart}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg">
                            Adicionar ao Carrinho
                        </Button>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Avaliações</h2>
                        <RatingDisplay productId={product.id!} />
                    </div>

                    {user && hasPurchased && (
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-bold mb-4 text-gray-900">Sua Avaliação</h3>
                            <RatingForm 
                                productId={product.id!} 
                                userId={user.id}
                            />
                        </div>
                    )}
            </div>
        </div>
    )
}