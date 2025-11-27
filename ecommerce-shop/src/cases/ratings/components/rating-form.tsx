import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateRating } from "../hooks/use-rating";
import type { RatingDTO } from "../dtos/rating.dto";

type RatingFormProps = {
    productId: string;
    userId: string;
    onSuccess?: () => void;
};

export function RatingForm({ productId, userId, onSuccess }: RatingFormProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [hoveredRating, setHoveredRating] = useState(0);
    const { mutate: createRating, isPending } = useCreateRating();

    const handleSubmit = () => {
        if (rating === 0) {
            alert("Selecione uma classificação");
            return;
        }

        const ratingData: RatingDTO = {
            productId,
            userId,
            rating,
            comment: comment || undefined,
        };

        createRating(ratingData, {
            onSuccess: () => {
                setRating(0);
                setComment("");
                onSuccess?.();
            },
            onError: () => {
                alert("Erro ao enviar avaliação");
            },
        });
    };

    return (
        <div className="space-y-5 p-6 border border-gray-200 rounded-xl bg-gray-50">
            <div>
                <p className="text-sm font-bold text-gray-900 mb-3">Sua avaliação:</p>
                <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star
                                size={32}
                                className={`transition-all ${
                                    (hoveredRating || rating) >= star
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-sm font-bold text-gray-900 mb-2">Comentário (opcional):</p>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Compartilhe sua opinião sobre este produto..."
                    maxLength={500}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none font-medium focus:border-blue-600 focus:ring-blue-600"
                    rows={3}
                />
                <p className="text-xs text-gray-600 font-medium mt-2">{comment.length}/500</p>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={isPending || rating === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50"
            >
                {isPending ? "Enviando..." : "Enviar Avaliação"}
            </Button>
        </div>
    );
}
