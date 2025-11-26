import type { ProductDTO } from "@/cases/products/dtos/product.dto"
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ProductDetailProps = {
    product: ProductDTO
}

export function ProductDetail({
    product
}: ProductDetailProps) {

    const bucketBaseURL = import.meta.env.VITE_BUCKET_URL || '';
    const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

    const placeholderSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23e5e7eb" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%23666"%3ESem Imagem%3C/text%3E%3C/svg%3E';

    const photos = product?.photos ?? [];
    const mainPhoto = photos[selectedPhoto];
    const mainImagePhoto = mainPhoto && bucketBaseURL
        ? `${bucketBaseURL}${mainPhoto.path}`
        : placeholderSVG;

    return (
        <div className="flex gap-16 py-8">

            <div className="flex-shrink-0">
                <div className="w-[500px] h-[600px] flex items-center justify-center rounded shadow overflow-hidden bg-gray-50">
                    <img src={mainImagePhoto}
                        className="max-h-full max-w-full object-contain" />
                </div>

                {photos && photos.length > 1 && (
                    <ul className="mt-6 w-full overflow-x-auto flex gap-3 pb-2">
                        {photos.map((photo, index) => (
                            <li key={photo.id}>
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedPhoto(index)}
                                    className="w-24 h-24 rounded overflow-hidden border-2 hover:border-green-600 hover:cursor-pointer transition-colors"
                                    style={{
                                        borderColor: index === selectedPhoto ? '#16a34a' : '#d1d5db'
                                    }}>
                                    <img
                                        src={bucketBaseURL ? `${bucketBaseURL}${photo.path}` : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23e5e7eb" width="96" height="96"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="11" fill="%23666"%3ESem%3C/text%3E%3C/svg%3E'}
                                        className="w-full h-full object-contain"
                                    />
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex flex-col gap-4 flex-1">
                    <div className="flex mt-8 gap-16">
                        <div className="min-w-md"></div>
                        <div className="w-fit">
                            <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
                            <div className="mb-4">
                                {product.brand && (
                                    <span className="p-1 rounded-sm text-xs text-white bg-green-600">
                                        {product.brand.name}
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 text-gray-700">{product.description}</p>
                            <div className="flex flex-col mt-4 gap-2">
                                <p className="text-gray-700 line-through mb-1">
                                    R$ {(Number(product.price) * 1.15).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <p className="text-sm text-gray-500 mb-2">Preço</p>
                        <p className="text-4xl font-bold text-green-600 mb-1">R$ {Number(product.price).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">ou R$ {(Number(product.price) / 10).toFixed(2)} no PIX</p>
                    </div>

                    <div className="border-t pt-6">
                        <Button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors">
                            Adicionar ao Carrinho
                        </Button>
                    </div>
            </div>
        </div>
    )
}