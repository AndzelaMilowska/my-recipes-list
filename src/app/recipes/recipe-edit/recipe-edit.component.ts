import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from '../../shared/units.service';
import { CategoriesService } from '../../shared/categories.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  unitsList = this.units.units;
  constructor(
    private units: UnitsService,
    private categoriesList: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      title: new FormControl('Title', Validators.required),
      desctiption: new FormControl('Desctiption', Validators.required),
      ingredients: new FormArray([
        new FormGroup({
          ingredientName: new FormControl(null, Validators.required),
          ingredientAmount: new FormControl(1, Validators.required),
          unit: new FormControl(this.unitsList[0].value, Validators.required),
        }),
      ]),
      instructions: new FormArray([new FormControl(null, Validators.required)]),
      categories: new FormArray([new FormControl(null)]),
    });
  }

  saveRecipe() {
    console.log(this.recipeForm);
  }

  // get formIngredientsArray() {
  //   return <FormArray<FormGroup>>this.recipeForm.get('ingredients');
  // }

  addIngredient() {
    const control = new FormGroup({
      ingredientName: new FormControl(null, Validators.required),
      ingredientAmount: new FormControl(1, Validators.required),
      unit: new FormControl('g', Validators.required),
    });
    this.getFormArray('ingredients').push(control);
  }

  getFormArray(formArrayName: string) {
    return <FormArray>this.recipeForm.get(formArrayName);
  }

  addControl(formArray: FormArray) {
    const control = new FormControl(null);
    (<FormArray>formArray).push(control);
  }

  removeAtIdex(index: number, arrayName: string) {
    (<FormArray>this.recipeForm.get(arrayName)).removeAt(index);
  }

  getFormControlFromArray(path: string, index: number) {
    return <FormControl>this.recipeForm.get(path + '.' + index);
  }
}

/*
add rest of the form 
hadle form validation

title: string;
imgs?: string[];
description: string;
ingredientsList: Ingredient[

  {name: string;
  amount: number;
  unit: string;}
];

instructions: string[];
categories?: string[];
numberOfPortions: number;
id: number;
}
*/

//Creating new object of type Recipe based on form input --> converter in recipes service
//push new recipe object to recipe services --> adding methid in recipes service
//load selected recipe and put into form
//update recipe --> set object on inndex
//handle categories list
