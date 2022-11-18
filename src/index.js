import RecipeService from '../src/js/recipe-service.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// UI Logic
function printRecipes(response) {
  for (let i = 0; i < 10; i++) {
    let recipeLi = document.createElement("li");
    recipeLi.append(response.hits[i].recipe.label);
    document.getElementById("recipes-ul").append(recipeLi);
    recipeLi.setAttribute("id", i);
  }
}

function printError() {
  document.querySelector('#recipes-div').innerText = `There was an error.`;
}

function getRecipe(ingredient, dietaryNeed) {
  RecipeService.getRecipe(ingredient, dietaryNeed)
    .then(function(response) {
      if (response.hits) {
        printRecipes(response);
        return response;
      } else {
        printError(response);
      }
    });
    // .then(function(r) {
    //   displayRecipe(response);
    // });
}

// promise = fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=0922046f&app_key=${process.env.API_KEY}${dietaryNeed}`)
// .then(function(response) {return response.json()}).

// async function displayRecipe(ingredient, dietaryNeed) {
//   console.log("we made it inside displayResponse function!");
//   const recipe = parseInt(event.target.id);
//   let promise = fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=0922046f&app_key=${process.env.API_KEY}${dietaryNeed}`)
//   .then(function(response) {
//       return response.json();
//     });
//     promise.then(function(response) {
//       document.getElementById("ingredient-list").innerText = response.hits[recipe].recipe.ingredientLines;
//     },
//      function(error) {
//       console.log(error);
//      });


function displayRecipe(response) {
  console.log("we made it inside displayResponse function!");
  const recipe = parseInt(event.target.id);
  document.getElementById("ingredient-list").innerText = response.hits[recipe].recipe.ingredientLines;
  
  // let promise = fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=0922046f&app_key=${process.env.API_KEY}${dietaryNeed}`)
  // .then(function(response) {
  //     return response.json();
  //   });
  //   promise.then(function(response) {
  //     document.getElementById("ingredient-list").innerText = response.hits[recipe].recipe.ingredientLines;
  //   },
  //    function(error) {
  //     console.log(error);
  //    });
  
  //document.getElementById("ingredient-list").innerText = 
  // fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=0922046f&app_key=${process.env.API_KEY}${dietaryNeed}`)
  //   .then(function(response) {return response.json()}).hits[recipe].recipe.ingredientLines;
  document.getElementById("method").innerText = "microwave";
}

function handleFormSubmission(ingredient,dietaryNeed, response) {
  event.preventDefault();
  ingredient = document.getElementById("ingredient").value;
  dietaryNeed = document.getElementById("diet-pref").value;
  response = getRecipe(ingredient, dietaryNeed);
  // displayRecipe(ingredient, dietaryNeed);
  console.log(response);
}

window.addEventListener("load", function(){
  let ingredient = "";
  let dietaryNeed = "";
  let response;
  //let response = 
  document.getElementById("meal-planner").addEventListener("submit", function(){handleFormSubmission(ingredient,dietaryNeed, response)});
  document.querySelector("ul#recipes-ul").addEventListener("click", function(){displayRecipe(response)});
});

