import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from '../../shared/units.service';
import { FormToRecipeService } from '../form-to-recipe.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  unitsList = this.units.units;
  imagePreview: string;
  constructor(
    private units: UnitsService,
    private formToRecipe: FormToRecipeService,
    private recipesService: RecipesService,
  ) {}

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      desctiption: new FormControl(null, Validators.required),
      ingredients: new FormArray([
        new FormGroup({
          amount: new FormControl(1, Validators.required),
          name: new FormControl(null, Validators.required),
          unit: new FormControl(this.unitsList[0].value),
        }),
      ]),
      instructions: new FormArray([new FormControl(null, Validators.required)]),
      categories: new FormArray([new FormControl(null)]),
      numberOfPortions: new FormControl(2, Validators.required),
    });
  }

  addIngredient() {
    const control = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(1, Validators.required),
      unit: new FormControl('g', Validators.required),
    });
    this.getFormArray('ingredients').push(control);
  }

  getFormArray(formArrayName: string) {
    return <FormArray>this.recipeForm.get(formArrayName);
  }

  addControl(formArray: FormArray) {
    const control = new FormControl(null, Validators.required);
    (<FormArray>formArray).push(control);
  }

  removeAtIdex(index: number, arrayName: string) {
    (<FormArray>this.recipeForm.get(arrayName)).removeAt(index);
  }

  getFormControlFromArray(path: string, index: number) {
    return <FormControl>this.recipeForm.get(path + '.' + index);
  }

  addControlToArrayByLastElement(i: number, arrayName: string) {
    const arrayLength = this.getFormArray(arrayName).length;
    const isDirty = this.getFormControlFromArray(arrayName, i).dirty;
    if (arrayLength - 1 === i && isDirty) {
      this.addControl(this.getFormArray(arrayName));
    }
  }

  updatePreviewImg(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;
    if (file) {
      this.imagePreview = URL.createObjectURL(file);
      // this.recipeForm.addControl('img', new FormControl(file));
      this.recipeForm.addControl(
        'img',
        new FormControl(URL.createObjectURL(file)),
      );
    }
  }

  saveRecipe() {
    let recipeObject = this.formToRecipe.convertFormToRecipe(
      this.recipeForm.value,
    );
    this.recipesService.addRecipe(recipeObject);
  }
}

//form validation --> css styles

//load selected recipe and put into form
//update recipe --> set object on inndex
//handle categories list
