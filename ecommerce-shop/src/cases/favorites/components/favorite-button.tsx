import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "../hooks/use-favorites";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

type FavoriteButtonProps = {
    product: ProductDTO;
};

export function FavoriteButton({ product }: FavoriteButtonProps) {
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const favorited = isFavorite(product.id!);

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (favorited) {
            removeFromFavorites(product.id!);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFavorite}
            className={favorited ? "text-red-500" : "text-gray-400"}
        >
            <Heart className={`w-5 h-5 ${favorited ? "fill-red-500" : ""}`} />
        </Button>
    );
}
