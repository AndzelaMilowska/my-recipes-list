import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from '../../shared/units.service';
import { FormToRecipeService } from '../form-to-recipe.service';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.interface';
import { RecipeFormService } from './recipe-form.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  unitsList = this.units.units;
  imagePreview: string;
  id: number | null = this.route.snapshot.queryParams['id']
    ? +this.route.snapshot.queryParams['id']
    : null;
  loadedRecipe: Recipe | null;
  constructor(
    private units: UnitsService,
    private formToRecipe: FormToRecipeService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private form: RecipeFormService,
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.form.createEmptyForm();
    if (this.id) {
      this.loadedRecipe = this.recipesService.recipeById(this.id);
      this.form.recreateRecipeForm(this.recipeForm, this.loadedRecipe);
    }

    if (
      this.loadedRecipe &&
      this.loadedRecipe.imgs &&
      typeof this.loadedRecipe.imgs[0] == 'string'
    ) {
      this.imagePreview = this.loadedRecipe.imgs[0];
    }
  }

  addIngredient(name: string, amount: number, unit: string) {
    this.form.addIngredient(this.recipeForm, name, amount, unit);
  }

  getFormArray(formArrayName: string) {
    return this.form.getFormArray(this.recipeForm, formArrayName);
  }

  addControl(formArray: FormArray) {
    this.form.addControl(formArray);
  }

  removeAtIdex(index: number, arrayName: string) {
    this.form.removeAtIdex(this.recipeForm, index, arrayName);
  }

  addControlToArrayByLastElement(i: number, arrayName: string) {
    this.form.addControlToArrayByLastElement(this.recipeForm, i, arrayName);
  }

  updatePreviewImg(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;
    if (file) {
      this.imagePreview = URL.createObjectURL(file);
      this.recipeForm.patchValue({ img: URL.createObjectURL(file) });
    }
  }

  saveRecipe() {
    let recipeObject = this.formToRecipe.convertFormToRecipe(
      this.recipeForm.value,
    );

    if (this.id) {
      this.recipesService.updateRecipe(this.id, recipeObject);
    } else {
      this.recipesService.addRecipe(recipeObject);
    }

    this.router.navigate(['recipes']);
    console.log(recipeObject);
  }
}

//handle categories list
