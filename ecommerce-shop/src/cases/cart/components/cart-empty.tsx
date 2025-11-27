import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartEmpty(){
    const navigate = useNavigate();
    return(
        <div className="flex justify-center items-center py-16">
            <Card className="max-w-3xl border-gray-200 shadow-sm rounded-2xl">
                <CardContent className="flex flex-col justify-center items-center py-12">
                    <div className="w-24 h-24 rounded-full border-4 border-green-600 flex justify-center items-center bg-green-50">
                        <ShoppingCart className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-center text-2xl font-bold text-gray-900 mt-4">
                        Seu carrinho está vazio!
                    </h3>
                    <p className="text-center text-lg text-gray-600 font-medium mt-2">
                        Clique no botão abaixo para voltar a página inicial.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center py-8">
                    <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50 font-bold rounded-lg transition-all"
                    onClick={() => navigate('/')}
                    >
                        Página Inicial
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}