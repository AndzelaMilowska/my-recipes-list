import { Component, Input, OnInit } from '@angular/core';
import { Recipe, RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  constructor(
    private recipes: RecipesService,
    // private route: ActivatedRoute,
  ) {}
  @Input() id: string;

  activeRecipe: Recipe;
  initialPortions: number;

  ngOnInit(): void {
    if (this.id) {
      this.activeRecipe = this.recipes.recipeById(+this.id);
      this.initialPortions = this.activeRecipe.numberOfPortions;
    }
  }
}

//create another recipe edit for edditing and adding recipe
//add WYSIWYG to recipe editor?? --> storing all text data, not just a string
