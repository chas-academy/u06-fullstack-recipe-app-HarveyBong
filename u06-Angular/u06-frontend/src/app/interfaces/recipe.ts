export interface Recipe {
  label: string;
  image: string;
  ingredientLines?: string[];
  totalTime: number;
  yield?: number;
  dietLabels?: string[];
  cautions?: string[];
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
  instructions?: string;
  tags?: string[];
  self: string;
  health: string[];
}
