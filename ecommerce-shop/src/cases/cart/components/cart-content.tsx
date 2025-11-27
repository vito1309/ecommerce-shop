import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UseCart } from "../hooks/use-cart";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QuantityInput } from "@/components/ui/quantity-input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { useCreateOrder } from "@/cases/orders/hooks/use-order";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

export function Cartcontent(){
    const { cart, removeProductCart, clearCart } = UseCart();
    const { user } = useAuth();
    const { mutate: createOrder } = useCreateOrder();
    const navigate = useNavigate();
    const bucketBaseURL = import.meta.env.VITE_BUCKET_URL;
    
    const [shipping, setShipping] = useState(0);

    const subtotal = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantify), 0);
    const total = subtotal + shipping;

    const handleFinalizeOrder = useCallback(() => {
        if (!user) {
            navigate('/signin?redirect=/cart');
            return;
        }

        if (cart.items.length === 0) {
            alert('Seu carrinho está vazio');
            return;
        }

        const orderData = {
            customer: { id: user.id } as any,
            userId: user.id,
            items: cart.items.map(item => ({
                product: { id: item.product.id } as any,
                quantity: item.quantify,
                value: item.product.price,
            })),
            shipping,
            total,
            status: 'NEW',
        };

        clearCart();
        setShipping(0);
        
        createOrder(orderData, {
            onSuccess: () => {
                alert('Seu pedido foi finalizado com sucesso!\n\nVocê pode verificar seus pedidos em "Meus Pedidos"');
                navigate('/orders');
            },
            onError: (error: any) => {
                alert(`Erro ao criar pedido: ${error?.response?.data?.message || error?.message}`);
            },
        });
    }, [user, cart, navigate, clearCart, createOrder, shipping, total]);

return (
    <div className="flex gap-4">
        <Card className="w-full mt-8">
            <CardContent>
                <ItemGroup className="gap-4">
                    {cart.items.map((item, index) => (
                        <Item key={index} variant="muted" role="listitem" asChild>
                            <div>
                                <ItemMedia variant="image">
                                    {item.product.photos?.length && (
                                        <img
                                        src={`${bucketBaseURL}${item.product.photos[0].path}`}
                                        className="w-8 h-8 object-cover grayscale"
                                        />
                                    )}
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle className="line-clamp-1">
                                        {item.product.name}
                                    </ItemTitle>
                                    <ItemDescription>
                                        {item.product.brand?.name}
                                    </ItemDescription>
                                </ItemContent>
                                <ItemContent className="flex-none text-cover">
                                    <ItemTitle>
                                        <div className="flex flex-wor gap-4">
                                            <div>
                                                <QuantityInput initialQuantity={item.quantify} />
                                            </div>
                                            <div className="flex flex-col">
                                        <p className="font-semibold flex justify-en gap-1.5">
                                        <IntlProvider locale="pt-BR">
                                        <FormattedNumber
                                            value={item.product.price * 0.9}
                                            style="currency"
                                            currency="BRL"
                                            /> no PIX
                                        </IntlProvider>
                                        </p>
                                        <p className="font-light flex justify-en gap-1.5">
                                        <IntlProvider locale="pt-BR">
                                        <FormattedNumber
                                            value={item.product.price}
                                            style="currency"
                                            currency="BRL"
                                            /> no Cartão
                                        </IntlProvider>
                                        </p>
                                    </div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="icon"
                                            variant="ghost"
                                            onClick={() => removeProductCart(item.product.id!)}>
                                                <Trash2 className="text-red-600" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                Remover este item do carrinho
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                        </div>
                                    
                                    </ItemTitle>
                                </ItemContent>
                            </div>
                        </Item>
                        ))}
                </ItemGroup>
            </CardContent>
        </Card>
        <div className="flex flex-col w-md mt-8 gap-4">
        <Card>
         <CardHeader>
             <CardTitle className="text-sm">Valor do Frete</CardTitle>
         </CardHeader>

         <CardContent>
             <InputGroup>
                 <InputGroupInput 
                     type="number"
                     step="0.01"
                     min="0"
                     placeholder="0.00" 
                     value={shipping}
                     onChange={(e) => {
                       const parsed = parseFloat(e.target.value);
                       setShipping(isNaN(parsed) ? 0 : parsed);
                     }}
                 />

                 <InputGroupAddon>
                     <MapPin className="text-green-600" />
                 </InputGroupAddon>
             </InputGroup>
         </CardContent>
        </Card>
    <Card>
        <CardHeader>
            <CardTitle className="text-sm">
                Total do Pedido:
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
            <ItemGroup>
                <Item variant="muted">
                    <ItemContent>
                        <ItemTitle>
                            Frete:
                        </ItemTitle>
                    </ItemContent>
                    <ItemContent>
                        <ItemTitle>
                            <div className="flex flex-col">
                                <p className="text-xs font-semibold flex justify-end">
                                    <IntlProvider locale="pt-BR">
                                        <FormattedNumber value={shipping} style="currency" currency="BRL"/>
                                    </IntlProvider>
                                </p>
                            </div>
                        </ItemTitle>
                    </ItemContent>
                </Item>
            </ItemGroup>
            <ItemGroup>
                <Item variant="muted">
                    <ItemContent>
                        <ItemTitle>
                            Produtos:
                        </ItemTitle>
                    </ItemContent>
                    <ItemContent>
                        <ItemTitle>
                            <div className="flex flex-col">
                                <p className="text-xs font-semibold flex justify-end">
                                    <IntlProvider locale="pt-BR">
                                        <FormattedNumber value={subtotal} style="currency" currency="BRL"/>
                                    </IntlProvider>
                                </p>
                            </div>
                        </ItemTitle>
                    </ItemContent>
                </Item>
            </ItemGroup>
            <ItemGroup>
                <Item variant="muted">
                    <ItemContent>
                        <ItemTitle>
                            Total:
                        </ItemTitle>
                    </ItemContent>
                    <ItemContent>
                        <ItemTitle>
                            <div className="flex flex-col">
                                <p className="text-xs font-semibold flex justify-end">
                                    <IntlProvider locale="pt-BR">
                                        <FormattedNumber value={total * 0.9} style="currency" currency="BRL" /> no PIX
                                    </IntlProvider>
                                </p>
                                <p className="text-xs font-light flex justify-end">
                                    <IntlProvider locale="pt-BR">
                                        <FormattedNumber value={total} style="currency" currency="BRL" /> no Cartão
                                    </IntlProvider>
                                </p>
                            </div>
                        </ItemTitle>
                    </ItemContent>
                </Item>
            </ItemGroup>
        </CardContent>
        <CardFooter>
            <Button
            onClick={handleFinalizeOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white">
                Finalizar o Pedido
            </Button>
        </CardFooter>
    </Card>
</div>

    </div>
    );
}
