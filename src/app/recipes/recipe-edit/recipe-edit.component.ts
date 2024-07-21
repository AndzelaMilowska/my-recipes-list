import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Units } from '../../shared/units.enum';
import { FormToRecipeService } from '../form-to-recipe.service';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.interface';
import { RecipeFormService } from './recipe-form.service';
import { AppRoutes } from '../../shared/routes.enum';
import { DataStorageService } from '../../shared/data-storage.service';
import { concatMap } from 'rxjs';

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
  removalType: string = 'Cancel';
  displayValidationError: boolean;
  constructor(
    private formToRecipe: FormToRecipeService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private form: RecipeFormService,
    private dataStorageService: DataStorageService,
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.form.createEmptyForm();
    this.loadRecipe();
    this.updateImagePreview();
  }

  displaySectionAlert(sectionName: string): boolean | undefined {
    let section = this.recipeForm.get(sectionName);
    return (
      (section?.invalid && (section?.dirty || section?.touched)) ||
      (this.displayValidationError && section?.invalid)
    );
  }

  loadRecipe(): void {
    if (!this.id) return;
    this.loadedRecipe = this.recipesService.recipeById(
      this.id,
      this.recipesService.currentRecipesList,
    );
    this.removalType = 'Delete';
    this.form.recreateRecipeForm(this.recipeForm, this.loadedRecipe);
  }

  deleteRecipe(): void {
    if (!this.id) {
      this.router.navigate([AppRoutes.Recipes]);
      return;
    }

    this.dataStorageService
      .deleteRecipeData(this.id)
      .pipe(
        concatMap(() => {
          return this.dataStorageService.fetchRecipesData();
        }),
      )
      .subscribe({
        next: (response) => {
          this.dataStorageService.updateRecipesList(response);
        },
        complete: () => {
          this.router.navigate([AppRoutes.Recipes]);
        },
      });
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

  removeAtIndex(index: number, arrayName: string): void {
    this.form.removeAtIndex(this.recipeForm, index, arrayName);
  }

  addControlToArrayByLastElement(i: number, arrayName: string): void {
    this.form.addControlToArrayByLastElement(this.recipeForm, i, arrayName);
  }

  updatePreviewImg(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;
    if (!file) return;
    this.imagePreview = URL.createObjectURL(file);
    this.recipeForm.patchValue({ img: file });
  }

  uploadRecipeData(recipeData: Recipe) {
    this.dataStorageService.uploadRecipeData(recipeData).subscribe({
      next: (response) => {
        this.dataStorageService.updateRecipesList(response);
        this.router.navigate([AppRoutes.Recipe + '/' + this.id]);
      },
    });
  }

  saveRecipe(): void {
    let currentRecipe: Recipe;

    if (!this.recipeForm.valid) {
      this.recipeForm.markAllAsTouched();
      this.displayValidationError = true;
      return;
    }

    this.displayValidationError = false;
    if (this.id) {
      currentRecipe = this.formToRecipe.convertFormToRecipe(
        this.recipeForm.value,
        this.id,
      );
    } else {
      this.id = this.recipesService.findAvailableIndex(
        this.recipesService.currentRecipesList,
      );
      currentRecipe = this.formToRecipe.convertFormToRecipe(
        this.recipeForm.value,
        this.id,
      );
    }

    this.uploadRecipeData(currentRecipe);
  }
}
