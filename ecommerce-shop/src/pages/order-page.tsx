import { OrderContent } from "@/cases/orders/components/order.content";
import { useOrders } from "@/cases/orders/hooks/use-order";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";

export function OrderPage() {

    const { data: orders, isLoading, error } = useOrders();

    return (
        <div className="p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Pedidos
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-8">
                {isLoading ? (
                    <h1>Carregando...</h1>
                ) : error ? (
                    <div className="text-red-600">
                        <h2>Erro ao carregar pedidos</h2>
                        <p>{(error as any)?.message || 'Tente novamente mais tarde'}</p>
                    </div>
                ) : orders && orders.length > 0 ? (
                    <OrderContent orders={orders} />
                ) : (
                    <div className="text-center py-8">
                        <h2 className="text-lg font-semibold">Nenhum pedido encontrado</h2>
                        <p className="text-gray-500">Você ainda não fez nenhum pedido</p>
                    </div>
                )}
            </div>
        </div>
    )
}
