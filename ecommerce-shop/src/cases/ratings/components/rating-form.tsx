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
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <div>
                <p className="text-sm font-medium mb-2">Sua avaliação:</p>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none"
                        >
                            <Star
                                size={28}
                                className={`transition-colors ${
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
                <p className="text-sm font-medium mb-2">Comentário (opcional):</p>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Compartilhe sua opinião sobre este produto..."
                    maxLength={500}
                    className="w-full p-2 border rounded-lg text-sm resize-none"
                    rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">{comment.length}/500</p>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={isPending || rating === 0}
                className="w-full"
            >
                {isPending ? "Enviando..." : "Enviar Avaliação"}
            </Button>
        </div>
    );
}
