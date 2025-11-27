import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { QuantityInput } from "@/components/ui/quantity-input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Trash2 } from "lucide-react";
import { FormattedNumber, IntlProvider } from "react-intl";
import type { OrderDTO } from "../dtos/order.dtos";

type OrderContentProps({
    order: OrderDTO;
}


export function Order Content
export function OrderContent() {
    return (
        <div className="flex gap-4">
            <Card className="w-full mt-8">
                <CardContent>
                    <ItemGroup className="gap-4">
                        {order.items.map((item, index) => (
                            <Item key={index} variant="muted" role="listitem" asChild>
                                <div>
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
        </div>
    )
}
