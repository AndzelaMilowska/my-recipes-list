import { Ingredient } from './ingredient.interface';

export interface RecipeForm {
  title: string;
  img?: string | File;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  categories?: string[];
  numberOfPortions: number;
  id?: number;
}
