import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from 'react-intl';
import { FavoriteButton } from "@/cases/favorites/components/favorite-button";

type ProductCardProps = {
    product: ProductDTO;
}

export function ProductCard({ product }: ProductCardProps) {

    const bucketBaseURL = import.meta.env.VITE_BUCKET_URL || '';

    const placeholderSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="210" height="210"%3E%3Crect fill="%23e5e7eb" width="210" height="210"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="14" fill="%23666"%3ESem Imagem%3C/text%3E%3C/svg%3E';

    const imagePath =
        product.photos && product.photos.length > 0 && bucketBaseURL
            ? `${bucketBaseURL}${product.photos[0].path}`
            : placeholderSVG;

    return (
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 border border-transparent shadow-sm shadow-black/6" style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.06)" }}>
            <div className="h-[200px] w-full bg-gray-100 flex items-center justify-center overflow-hidden relative">
                <img className="max-h-full max-w-full object-contain p-2.5" src={imagePath} />
                <div className="absolute top-3 right-3">
                    <FavoriteButton product={product} />
                </div>
            </div>
            <div className="p-4 space-y-3">
                <h4 className="font-semibold text-sm line-clamp-2 text-gray-900">{product.name}</h4>

                <div className="space-y-2">

                    <p className="text-gray-500 line-through text-xs font-medium">
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber 
                                value={product.price * 1.15}
                                style="currency"
                                currency="BRL"
                            />
                        </IntlProvider>
                    </p>


                    <div className="flex items-center gap-2">
                        <p className="font-bold text-blue-600 text-lg">
                            <IntlProvider locale="pt-BR">
                                <FormattedNumber
                                    value={product.price * 0.9}
                                    style="currency"
                                    currency="BRL"
                                />
                            </IntlProvider>
                        </p>
                        <span className="bg-blue-100 text-blue-600 rounded-full px-2.5 py-1 text-xs font-semibold">
                            10% OFF
                        </span>
                    </div>


                    <p className="text-gray-600 text-xs font-medium">
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber
                                value={product.price}
                                style="currency"
                                currency="BRL"
                            />
                        </IntlProvider>
                        {" "}em 10x de{" "}
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber
                                value={product.price / 10}
                                style="currency"
                                currency="BRL"
                            />
                        </IntlProvider>
                    </p>
                </div>
            </div>
        </div>
    );
}
