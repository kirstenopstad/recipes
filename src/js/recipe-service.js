// Business Logic
export default class RecipeService {
  static getRecipe(ingredient, diet) {
    return fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=0922046f&app_key=${process.env.API_KEY}${diet}`)
      .then(function(response) {
        if (!response.ok) {
          // const errorResponse = response.json();
          const errorMessage = `It didn't work`;
          throw new Error(errorMessage);
        } else {
          // Return info as jsonified response
          return response.json();
        }
      })
      .catch(function(error) {
        return error;
      });
  }
}