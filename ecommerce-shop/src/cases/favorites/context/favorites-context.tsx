import { createContext, useEffect, useState, useContext, type ReactNode } from "react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { AuthContext } from "@/cases/auth/contexts/auth.contexts";

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
    const authContext = useContext(AuthContext);
    const user = authContext?.user;

    useEffect(() => {
        if (!user?.id) {
            setFavorites([]);
            return;
        }

        const userFavoritesKey = `favorites_${user.id}`;
        const storageFavorites = localStorage.getItem(userFavoritesKey);
        if (storageFavorites) {
            try {
                setFavorites(JSON.parse(storageFavorites));
            } catch {
                setFavorites([]);
            }
        } else {
            setFavorites([]);
        }
    }, [user?.id]);

    useEffect(() => {
        if (!user?.id) return;
        
        const userFavoritesKey = `favorites_${user.id}`;
        localStorage.setItem(userFavoritesKey, JSON.stringify(favorites));
    }, [favorites, user?.id]);

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
