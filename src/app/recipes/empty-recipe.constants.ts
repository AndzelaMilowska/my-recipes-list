import { Recipe } from './recipe.interface';

export const emptyRecipe: Recipe = {
  title: 'title',
  description: '',
  ingredientsList: [{ amount: 0, name: '', unit: '' }],
  instructions: ['nothing here'],
  numberOfPortions: 0,
  id: 0,
};
