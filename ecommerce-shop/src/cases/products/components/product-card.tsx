import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from 'react-intl';

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
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="h-[200px] w-full bg-gray-50 flex items-center justify-center overflow-hidden">
                <img className="max-h-full max-w-full object-contain" src={imagePath} />
            </div>
            <div className="p-3 space-y-2">
                <h4 className="font-semibold text-sm line-clamp-2 text-gray-900">{product.name}</h4>

                <div className="space-y-1">

                    <p className="text-gray-500 line-through text-xs">
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber 
                                value={product.price * 1.15}
                                style="currency"
                                currency="BRL"
                            />
                        </IntlProvider>
                    </p>


                    <div className="flex items-center gap-1">
                        <p className="font-bold text-green-600 text-base">
                            <IntlProvider locale="pt-BR">
                                <FormattedNumber
                                    value={product.price * 0.9}
                                    style="currency"
                                    currency="BRL"
                                />
                            </IntlProvider>
                        </p>
                        <span className="bg-green-100 text-green-700 rounded px-1 py-0.5 text-xs font-medium">
                            10% OFF
                        </span>
                    </div>


                    <p className="text-gray-600 text-xs">
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
