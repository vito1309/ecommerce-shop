import { useContext } from "react";

export function UseCart(){
    const context = useContext();

    if (!context) {
        throw new Error('useCart deve ser udaso dentro de um CartContextProvider')
    }

    return context;
}