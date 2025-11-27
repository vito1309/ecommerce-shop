import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RatingService } from "../services/rating.service";
import type { RatingDTO } from "../dtos/rating.dto";

export function useRatings(productId: string) {
    return useQuery<RatingDTO[]>({
        queryKey: ['ratings', productId],
        queryFn: () => RatingService.list(productId),
        enabled: !!productId,
    });
}

export function useUserRating(userId: string, productId: string) {
    return useQuery<RatingDTO | null>({
        queryKey: ['rating', userId, productId],
        queryFn: () => RatingService.getUserRating(userId, productId),
        enabled: !!userId && !!productId,
    });
}

export function useCreateRating() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (rating: RatingDTO) => RatingService.create(rating),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['ratings', data.productId] });
            queryClient.invalidateQueries({ queryKey: ['rating', data.userId, data.productId] });
        },
    });
}
