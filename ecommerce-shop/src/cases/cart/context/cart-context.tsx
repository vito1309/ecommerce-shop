import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { Children, createContext, useEffect, useState, type ReactNode } from "react";


export interface CartItem {
    product: ProductDTO;
    quantify: number;
}

export interface Cart{
    items: CartItem[];
}

type CartContextType = {
    cart: Cart;
    addProduct: (product: ProductDTO, quatity?: number) => void;
    removeProductCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined)


type CartContextProviderProps={
    children: ReactNode
}
export function CartContextProvider({
    children
}: CartContextProviderProps) {
    const [cart, setCart] = useState<Cart>({items: []});



    useEffect(() =>{

        const storageCart = localStorage.getItem('cart');

        if (storageCart) {
            try{
                setCart(JSON.parse(storageCart))
            }catch {
                setCart({items: []})
            }
        }
    }, []);

        useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);


    function addProduct(product: ProductDTO, quantify: number = 1){

        setCart((prevCart: Cart) =>{
            const existingItem = prevCart.items.find((item) => item.product.id === product.id);


            let updatedItems : CartItem[];


            if (existingItem) {
                updatedItems = prevCart.items.map((item) => 
                    item.product.id === product.id
                    ? {...item, quantify: item.quantify + quantify}
                    : item
                )
            } else {
                updatedItems =[...prevCart.items, {product, quantify}]
            }


            return {items: updatedItems}
        })
    }

    function removeProductCart(productId: string) {
        setCart((prevCart) => (
            {
                items: prevCart.items.filter((item) => item.product.id != productId)
            }
        ))
    }

    function updateQuantity(productId: string, quantity: number) {
        setCart((prevCart) => ({
            items: prevCart.items.map((item) =>
                item.product.id === productId
                    ? { ...item, quantify: Math.max(0, quantity) }
                    : item
            ).filter((item) => item.quantify > 0)
        }))
    }

    function clearCart() {
        setCart({ items: [] });
    }

    return (
        <CartContext.Provider value ={{cart, addProduct, removeProductCart, updateQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}