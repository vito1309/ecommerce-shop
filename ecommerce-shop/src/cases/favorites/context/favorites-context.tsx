import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

type FavoritesContextType = {
    favorites: ProductDTO[];
    addToFavorites: (product: ProductDTO) => void;
    removeFromFavorites: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

type FavoritesContextProviderProps = {
    children: ReactNode;
};

export function FavoritesContextProvider({ children }: FavoritesContextProviderProps) {
    const [favorites, setFavorites] = useState<ProductDTO[]>([]);

    // Carregar favoritos do localStorage
    useEffect(() => {
        const storageFavorites = localStorage.getItem('favorites');
        if (storageFavorites) {
            try {
                setFavorites(JSON.parse(storageFavorites));
            } catch {
                setFavorites([]);
            }
        }
    }, []);

    // Salvar favoritos no localStorage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    function addToFavorites(product: ProductDTO) {
        setFavorites((prev) => {
            const isFav = prev.find((item) => item.id === product.id);
            if (isFav) return prev;
            return [...prev, product];
        });
    }

    function removeFromFavorites(productId: string) {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
    }

    function isFavorite(productId: string) {
        return favorites.some((item) => item.id === productId);
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}
