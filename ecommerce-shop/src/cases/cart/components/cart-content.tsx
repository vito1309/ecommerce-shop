import { Card, CardContent } from "@/components/ui/card";
import { UseCart } from "../hooks/use-cart";

export function Cartcontent(){
    const {cart} = UseCart();
    const bucketBaseURL = import.meta.env.VITE_BUCKET_URL || '';

    return(
        <div className="flex gap-4 py-8">
            <Card className="w-full">
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        {cart.items.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Carrinho vazio</p>
                        ) : (
                            cart.items.map((item, index) => (
                                <div key={index} className="flex gap-4 pb-4 border-b">
                                    {item.product.photos?.length ? (
                                        <img 
                                            src={`${bucketBaseURL}${item.product.photos[0].path}`}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                                            Sem imagem
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm">{item.product.name}</h4>
                                        <p className="text-gray-600 text-sm">Quantidade: {item.quantify}</p>
                                        <p className="text-green-600 font-semibold">
                                            R$ {(Number(item.product.price) * item.quantify).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}