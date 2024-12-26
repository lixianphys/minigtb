export type Recipe = {
    id: number;
    img_url: string;
    category: string;
    cuisine: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sodium: number;
    is_vegetarian: boolean;
    is_vegan: boolean;
    is_gluten_free: boolean;
    is_dairy_free: boolean;
    is_halal: boolean;
    is_kosher: boolean;
    is_sweet: boolean;
    is_bitter: boolean;
    is_metallic: boolean;
    is_acidic: boolean;
    is_soft: boolean;
    is_crunchy: boolean;
    is_chewy: boolean;
    is_liquid: boolean;
    is_cold: boolean;
}