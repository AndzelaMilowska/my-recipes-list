import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  constructor(private recipes: RecipesService) {}
  @Input() id: string;

  activeRecipe: Recipe;
  initialPortions: number;

  ngOnInit(): void {
    if (this.id) {
      this.activeRecipe = this.recipes.recipeById(+this.id);
      this.initialPortions = this.activeRecipe.numberOfPortions;
    }
  }

  reduceNumberOfPortions() {
    this.activeRecipe.numberOfPortions <= 1
      ? (this.activeRecipe.numberOfPortions = 1)
      : (this.activeRecipe.numberOfPortions =
          this.activeRecipe.numberOfPortions - 1);
  }

  increaseNumberOfPortions() {
    this.activeRecipe.numberOfPortions = this.activeRecipe.numberOfPortions + 1;
  }

  displayRecipeImg(img: string | File) {
    return typeof img === 'string' ? img : URL.createObjectURL(img);
  }
}

//wyświetlanie img tez w podgladzie wszystkich przepisów
//style fix
