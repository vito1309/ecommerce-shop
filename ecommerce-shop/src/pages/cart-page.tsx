import { Cartcontent } from "@/cases/cart/components/cart-content";
import { CartEmpty } from "@/cases/cart/components/cart-empty";
import { UseCart } from "@/cases/cart/hooks/use-cart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";

export function CartPage(){
    const {cart} = UseCart();
    return(
         <div className="p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                        Carrinho de Compras
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-8">
                {cart.items.length > 0 ? (
                    <Cartcontent />
                ) : (
                <CartEmpty />
                )}
            </div>
        </div>
    )
}