import { Ingredient } from './ingredient.interface';

export interface Recipe {
  title: string;
  imgs?: (string | File)[];
  description: string;
  ingredientsList: Ingredient[];

  instructions: string[];
  categories?: string[];
  numberOfPortions: number;
  id: number;
}
