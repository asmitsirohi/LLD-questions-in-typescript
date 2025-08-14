// Recipe Manager, Features: Add recipe (text + image path), edit recipe, delete recipe.

interface Recipe {
  id: number;
  name?: string;
  path?: string;
}

class TextRecipe implements Recipe {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class ImageRecipe implements Recipe {
  id: number;
  path: string;

  constructor(id: number, path: string) {
    this.id = id;
    this.path = path;
  }
}

class Recipes {
  recipes: Recipe[];

  constructor() {
    this.recipes = [];
  }

  addTextRecipe(name: string, id: number) {
    this.recipes.push(new TextRecipe(id, name));
  }

  addImageRecipe(path: string, id: number) {
    this.recipes.push(new ImageRecipe(id, path));
  }

  editRecipe(id: number, text: string, type: string) {
    this.recipes.forEach((recipe) => {
      if (recipe.id === id) {
        recipe[type] = text;
      }
    });
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
  }

  showRecipe() {
    console.log(this.recipes);
  }
}

class RecipeManager {
  recipes: Recipes;
  currentRecipeId: number;

  constructor(recipes: Recipes) {
    this.recipes = recipes;
    this.currentRecipeId = 0;
  }

  addTextRecipe(text: string) {
    this.recipes.addTextRecipe(text, this.currentRecipeId++);
  }

  addImageRecipe(path: string) {
    this.recipes.addImageRecipe(path, this.currentRecipeId++);
  }

  editRecipe(id: number, data: string, type: string) {
    this.recipes.editRecipe(id, data, type);
  }

  deleteRecipe(id: number) {
    this.recipes.deleteRecipe(id);
  }

  showRecipes() {
    this.recipes.showRecipe();
  }
}

const recipes = new Recipes();

const recipeManager = new RecipeManager(recipes);
recipeManager.addTextRecipe("text1");
recipeManager.addImageRecipe("image1");
recipeManager.addTextRecipe("text2");
recipeManager.addImageRecipe("image2");

recipeManager.showRecipes();

recipeManager.editRecipe(2, "abc", "name");

recipeManager.showRecipes();

recipeManager.deleteRecipe(2);
recipeManager.addImageRecipe("image8");

recipeManager.showRecipes();
