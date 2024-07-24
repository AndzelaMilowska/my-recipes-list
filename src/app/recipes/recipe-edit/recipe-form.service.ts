import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.interface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Units } from '../../shared/units.enum';

@Injectable({ providedIn: 'root' })
export class RecipeFormService {
  unitsList = Units;

  createEmptyForm() {
    return new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      img: new FormControl(null),
      ingredients: new FormArray([
        new FormGroup({
          amount: new FormControl(1, Validators.required),
          name: new FormControl(null, Validators.required),
          unit: new FormControl(this.unitsList.Gram),
        }),
      ]),
      instructions: new FormArray([new FormControl(null, Validators.required)]),
      categories: new FormArray([new FormControl(null)]),
      numberOfPortions: new FormControl(2, Validators.required),
      id: new FormControl(null),
    });
  }

  getFormArray(formObject: FormGroup, formArrayName: string) {
    return <FormArray>formObject.get(formArrayName);
  }

  addIngredient(
    formObject: FormGroup,
    name: string,
    amount: number,
    unit: string,
  ) {
    const control = new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, Validators.required),
      unit: new FormControl(unit, Validators.required),
    });
    this.getFormArray(formObject, 'ingredients').push(control);
  }

  addControl(formArray: FormArray) {
    const control = new FormControl(null, Validators.required);
    (<FormArray>formArray).push(control);
  }

  removeAtIndex(formObject: FormGroup, index: number, arrayName: string) {
    (<FormArray>formObject.get(arrayName)).removeAt(index);
  }

  getFormControlFromArray(formObject: FormGroup, path: string, index: number) {
    return <FormControl>formObject.get(path + '.' + index);
  }

  addOptionalControl(formObject: FormGroup, arrayName: string) {
    const control = new FormControl(null);
    (<FormArray>this.getFormArray(formObject, arrayName)).push(control);
  }

  recreateRecipeForm(formObject: FormGroup, recipe: Recipe) {
    formObject.patchValue({
      title: recipe.title,
      description: recipe.description,
      numberOfPortions: recipe.numberOfPortions,
      id: recipe.id,
    });
    this.removeAtIndex(formObject, 0, 'ingredients');
    this.removeAtIndex(formObject, 0, 'instructions');

    for (let ingredient of recipe.ingredientsList) {
      this.addIngredient(
        formObject,
        ingredient.name,
        ingredient.amount,
        ingredient.unit,
      );
    }

    for (let instruction of recipe.instructions) {
      this.getFormArray(formObject, 'instructions').push(
        new FormControl(instruction, Validators.required),
      );
    }

    if (recipe.categories) {
      this.removeAtIndex(formObject, 0, 'categories');
      for (let category of recipe.categories) {
        this.getFormArray(formObject, 'categories').push(
          new FormControl(category),
        );
      }
    }

    if (recipe.imgs && typeof recipe.imgs[0] === 'string') {
      formObject.patchValue({ img: recipe.imgs[0] });
    }
  }
}
