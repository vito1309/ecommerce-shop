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

            <div className="py-12">
                {isLoading ? (
                    <h1 className="text-2xl font-bold text-gray-900">Carregando...</h1>
                ) : error ? (
                    <div className="text-red-600 bg-red-50 p-6 rounded-xl border border-red-200">
                        <h2 className="text-xl font-bold mb-2">Erro ao carregar pedidos</h2>
                        <p className="font-medium">{(error as any)?.message || 'Tente novamente mais tarde'}</p>
                    </div>
                ) : orders && orders.length > 0 ? (
                    <OrderContent orders={orders} />
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Nenhum pedido encontrado</h2>
                        <p className="text-gray-600 font-medium">Você ainda não fez nenhum pedido</p>
                    </div>
                )}
            </div>
        </div>
    )
}
