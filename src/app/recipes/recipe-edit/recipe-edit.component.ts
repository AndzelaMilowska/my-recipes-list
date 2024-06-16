import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Units } from '../../shared/units.enum';
import { FormToRecipeService } from '../form-to-recipe.service';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.interface';
import { RecipeFormService } from './recipe-form.service';
import { AppRoutes } from '../../shared/routes.enum';
import { recipeList } from '../recipes-list.mocks';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  unitsList = Units;
  imagePreview: string;
  id: number | null = this.route.snapshot.queryParams['id']
    ? +this.route.snapshot.queryParams['id']
    : null;
  loadedRecipe: Recipe | null;
  constructor(
    private formToRecipe: FormToRecipeService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private form: RecipeFormService,
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.form.createEmptyForm();
    this.loadRecipe();
    this.updateImagePreview();
  }

  loadRecipe(): void {
    if (!this.id) return;
    this.loadedRecipe = this.recipesService.recipeById(this.id, recipeList);
    this.form.recreateRecipeForm(this.recipeForm, this.loadedRecipe);
  }

  updateImagePreview(): void {
    if (
      !this.loadedRecipe?.imgs?.length ||
      typeof this.loadedRecipe.imgs[0] !== 'string'
    ) {
      return;
    }
    this.imagePreview = this.loadedRecipe.imgs[0];
  }

  addIngredient(name: string, amount: number, unit: string): void {
    this.form.addIngredient(this.recipeForm, name, amount, unit);
  }

  getFormArray(formArrayName: string): FormArray {
    return this.form.getFormArray(this.recipeForm, formArrayName);
  }

  addControl(formArray: FormArray): void {
    this.form.addControl(formArray);
  }

  removeAtIdex(index: number, arrayName: string): void {
    this.form.removeAtIdex(this.recipeForm, index, arrayName);
  }

  addControlToArrayByLastElement(i: number, arrayName: string): void {
    this.form.addControlToArrayByLastElement(this.recipeForm, i, arrayName);
  }

  updatePreviewImg(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;
    if (!file) return;
    this.imagePreview = URL.createObjectURL(file);
    this.recipeForm.patchValue({ img: URL.createObjectURL(file) });
  }

  saveRecipe(): void {
    if (this.id) {
      this.recipesService.updateRecipe(
        this.formToRecipe.convertFormToRecipe(this.recipeForm.value, this.id),
        recipeList,
      );
    } else {
      this.id = this.recipesService.findAvailableIndex(recipeList);
      this.recipesService.addRecipe(
        this.formToRecipe.convertFormToRecipe(this.recipeForm.value, this.id),
        recipeList,
      );
    }

    this.router.navigate([AppRoutes.Recipe + '/' + this.id]);
  }
}

//handle categories list
