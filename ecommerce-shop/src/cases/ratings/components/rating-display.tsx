import { Star } from "lucide-react";
import { useRatings } from "../hooks/use-rating";

type RatingDisplayProps = {
    productId: string;
};

export function RatingDisplay({ productId }: RatingDisplayProps) {
    const { data: ratings = [] } = useRatings(productId);

    if (ratings.length === 0) {
        return (
            <div className="text-center py-8 text-gray-600 bg-gray-50 rounded-xl p-6">
                <p className="font-medium">Este produto ainda não tem avaliações</p>
            </div>
        );
    }

    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-6 bg-gray-50 p-6 rounded-xl">
                <div className="flex-1">
                    <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={24}
                                className={`${
                                    star <= averageRating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                        {averageRating.toFixed(1)} de 5
                    </p>
                    <p className="text-sm text-gray-600 font-medium mt-1">
                        {ratings.length} {ratings.length === 1 ? 'avaliação' : 'avaliações'}
                    </p>
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {ratings.map((rating) => (
                    <div key={rating.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
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
                            <span className="text-xs text-gray-600 font-medium">
                                {new Date(rating.createdAt!).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                        {rating.comment && (
                            <p className="text-sm text-gray-700 font-medium">{rating.comment}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
