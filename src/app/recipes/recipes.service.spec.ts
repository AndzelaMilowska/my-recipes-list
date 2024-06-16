import { TestBed } from '@angular/core/testing';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.interface';
import { emptyRecipe } from './empty-recipe.constants';

describe('DataService', () => {
  let service: RecipesService;
  let testRecipeObject: Recipe;
  let recipesTestArray: Recipe[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesService);
    testRecipeObject = {
      title: 'new title',
      description: 'new description',
      ingredientsList: [{ amount: 1, name: 'new name', unit: 'new unit' }],
      instructions: ['new instructions'],
      numberOfPortions: 2,
      id: 1,
    };
    recipesTestArray = [
      {
        title: 'title01',
        description: 'description01',
        ingredientsList: [{ amount: 1, name: 'name01', unit: 'unit01' }],
        instructions: ['instructions01'],
        numberOfPortions: 2,
        id: 1,
      },
      {
        title: 'title02',
        description: 'description02',
        ingredientsList: [{ amount: 1, name: 'name02', unit: 'unit02' }],
        instructions: ['instructions02'],
        numberOfPortions: 2,
        id: 2,
      },
    ];
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  //addRecipe
  it('should add one to length', () => {
    service.addRecipe(testRecipeObject, recipesTestArray);
    expect(recipesTestArray.length).toBe(3);
  });

  // updateRecipe
  it('should update object', () => {
    service.updateRecipe(testRecipeObject, recipesTestArray);
    expect(recipesTestArray[0]).toBe(testRecipeObject);
  });

  it("shouldn't update if id doesn't match", () => {
    testRecipeObject.id = -1;
    service.updateRecipe(testRecipeObject, recipesTestArray);
    expect(recipesTestArray.length).toBe(2);
  });

  //recipeById
  it('should return recipe with given id', () => {
    expect(service.recipeById(2, recipesTestArray)).toBe(recipesTestArray[1]);
  });

  it('should return empty recipe', () => {
    expect(service.recipeById(5, recipesTestArray)).toBe(emptyRecipe);
  });

  it('index should match', () => {
    let result = service.recipeById(1, recipesTestArray);
    expect(result.id).toBe(1);
  });

  //findAvailableIndex
  it('should return first available value for recipe id (3)', () => {
    expect(service.findAvailableIndex(recipesTestArray)).toBe(3);
  });
});
