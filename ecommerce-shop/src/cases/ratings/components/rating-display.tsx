import { Star } from "lucide-react";
import { useRatings } from "../hooks/use-rating";

type RatingDisplayProps = {
    productId: string;
};

export function RatingDisplay({ productId }: RatingDisplayProps) {
    const { data: ratings = [] } = useRatings(productId);

    if (ratings.length === 0) {
        return (
            <div className="text-center py-6 text-gray-500">
                <p>Este produto ainda não tem avaliações</p>
            </div>
        );
    }

    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={20}
                                className={`${
                                    star <= averageRating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                        {averageRating.toFixed(1)} de 5 ({ratings.length} avaliações)
                    </p>
                </div>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
                {ratings.map((rating) => (
                    <div key={rating.id} className="border-t pt-3">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={14}
                                        className={`${
                                            star <= rating.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">
                                {new Date(rating.createdAt!).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                        {rating.comment && (
                            <p className="text-sm text-gray-700">{rating.comment}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
