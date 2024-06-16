import { TestBed } from '@angular/core/testing';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.interface';

describe('DataService', () => {
  let service: RecipesService;
  let testRecipeObject: Recipe = {
    title: 'title',
    description: 'description',
    ingredientsList: [{ amount: 1, name: 'name', unit: 'unit' }],
    instructions: ['instructions'],
    numberOfPortions: 2,
    id: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesService);
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  //are tests working?
  it('should be something', () => {
    expect(true).toBeTruthy();
  });

  //add recipe
  it('should add one to length', () => {
    let initialLength = service.recipes.length;
    service.addRecipe(testRecipeObject);
    expect(service.recipes.length).toBe(initialLength + 1);
  });

  //   updateRecipe(id: number, updatedRecipe: Recipe) {
  //     let recipeIndex = this.recipeList.findIndex((recipe) => recipe.id === id);
  //     if (recipeIndex === -1) {
  //       return
  //     }
  //     this.recipeList[recipeIndex] = updatedRecipe;
  //   }
  it('should update object', () => {
    let objectIndex = service.recipes.findIndex((object) => object.id === 1);
    service.updateRecipe(1, testRecipeObject);
    expect(service.recipes[objectIndex]).toBe(testRecipeObject);
  });
});
