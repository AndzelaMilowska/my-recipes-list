import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  constructor(private recipes: RecipesService) {}
  activeRecipe = this.recipes.recipes[0]; //placeholder data
  initialPortions: number = this.activeRecipe.numberOfPortions;

  ngOnInit(): void {}
}

//this should be single recipe display component
//create another recipe edit for edditing and adding recipe
//add WYSIWYG to recipe editor?? --> storing all text data, not just a string
