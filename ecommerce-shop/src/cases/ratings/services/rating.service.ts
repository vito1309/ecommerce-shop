import { api } from "../../../lib/axios";
import type { RatingDTO } from "../dtos/rating.dto";

const _ENDPOINT = '/ratings';

export const RatingService = {

    async list(productId: string): Promise<RatingDTO[]> {
        const result = await api.get(`${_ENDPOINT}?productId=${productId}`);
        return result.data;
    },

    async create(rating: RatingDTO): Promise<RatingDTO> {
        const result = await api.post(_ENDPOINT, rating);
        return result.data;
    },

    async getUserRating(userId: string, productId: string): Promise<RatingDTO | null> {
        try {
            const result = await api.get(`${_ENDPOINT}/user/${userId}/product/${productId}`);
            return result.data;
        } catch {
            return null;
        }
    },

};
