import { useContext } from "react";
import { CartContext } from "../context/cart-context";

export function UseCart(){
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart deve ser udaso dentro de um CartContextProvider')
    }

    return context;
}