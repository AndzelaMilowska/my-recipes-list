import { Recipe } from '../recipes/recipe.interface';

export const recipeStarter: Recipe = {
  title: 'Protein Pancakes: The Perfect Recipe for a Healthier, Happier You!',
  description:
    'Looking to boost your protein intake and add a little joy to your mornings? Look no further than these delicious protein pancakes! Packed with essential nutrients, these pancakes are not only a fantastic way to increase your daily protein but also a delightful treat that can brighten up your day.',
  imgs: [
    'https://firebasestorage.googleapis.com/v0/b/recipeslist-d7412.appspot.com/o/fluffy-pancakes-feature.jpg?alt=media&token=69b553e0-c69e-4407-9c62-42fa4fd062d2',
  ],
  ingredientsList: [
    {
      name: 'Oat flour',
      amount: 45,
      unit: 'g',
    },
    {
      name: 'Vanilla protein powder',
      amount: 45,
      unit: 'g',
    },
    {
      name: 'Baking powder',
      amount: 1,
      unit: 'tsp',
    },
    {
      name: 'Milk',
      amount: 150,
      unit: 'ml',
    },
    {
      name: 'Large egg white',
      amount: 1,
      unit: '',
    },
    {
      name: 'Clarified butter',
      amount: 15,
      unit: 'g',
    },
  ],

  instructions: [
    'In a tall dish, mix dry ingredients: flour, protein powder and baking powder. Add wet ingredients: milk and egg white. Mix everything well. ',
    'Set the pan to medium heat and add portion of clarified butter. Allow it to sufficiently heat up.',
    'Scoop the batter onto a hot pan and cook. Wait for two to three minutes until bubbles start to form on the top and the edges look dry and set, then flip. Continue cooking until brown on both sides. Repeat with remaining batter.',
    'Serve with toppings as preferred.',
  ],
  categories: ['healthy', 'protein', 'breakfast'],
  numberOfPortions: 1,
  id: 1,
};
