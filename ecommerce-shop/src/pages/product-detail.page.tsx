import { ProductDetail } from "@/cases/products/components/product-detail";
import { useProduct } from "@/cases/products/hooks/use-products";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";

export function ProductdetailPage(){

    const {id} = useParams<{id: string}>();
    const {data: product, isLoading} = useProduct(id!);

    return(
        <div className="p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/?categoryId=${product?.category.id}`}>
                            {product?.category.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                        {product?.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-12">
                {isLoading ? (
                    <h1 className="text-2xl font-bold text-gray-900">Carregando...</h1>
                ) : (
                <ProductDetail product={product!} />
                )}
            </div>
        </div>
    )
}