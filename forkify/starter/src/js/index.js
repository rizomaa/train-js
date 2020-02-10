import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
import * as recipeView from './views/recipeView';



/* Global state of the App
    - Search object
    - Current recipe object
    - Shopping list list object
    - Liked recipes
 */
const state = {};

/** SEARCH CONTROLLER */
const controlSearch = async () => {
    //1. get a query from the view.
    const query = searchView.getInput(); //TODO
    
  // console.log(query);
    
    if (query) {
        //2. A new search object and add to the state.
     
        state.search = new Search(query);
        
        //3. Prepare UI for result (Clearing previous result and spinner).
        searchView.clearInput();
        searchView.clearResults();
	    renderLoader(elements.searchRes);
        
        try {
            //4. Search recipes
            await state.search.getResults();

            //5. Render results on UI 
            clearLoader();
            searchView.renderResults(state.search.result);
            //console.log(state.search.result);            
        } catch (error) {
            alert('Something wrong with the search');
            clearLoader();
        }
    }     
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    
    if (btn) {
        searchView.clearResults();
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.renderResults(state.search.result, goToPage);
        //console.log(goToPage);
    }
    
});

/** RECIPE CONTROLLER */
const controlRecipe = async () => {
    
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);
    
    if (id) {
        //1. Prepare UI for changes.
        recipeView.clearRecipe();
        
        renderLoader(elements.recipe);
        
        //Higlight selected
        if (state.search) searchView.highlightSelected(id);
        
        //2. Create new recipe object
        state.recipe = new Recipe(id);
            
        try {
            //3. Get Recipe data and parse ingredients
            await state.recipe.getRecipe();
            
           // console.log(state.recipe.ingredients);
            
            state.recipe.parseIngredients();

            //4. Calculate serving and time 
            state.recipe.calcServings();
            state.recipe.calcTime();

            //5. Render Recipe on UI
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            
            //console.log(state.recipe);
            
        } catch (error) {
            alert('Error processing recipe');
        }
    }
};

/*
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
*/

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//Handling recipe button clicks

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //Decrease if button is clicked
        if (state.recipe.servings > 1) {            
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //Increase if button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);
});

window.l = new List();
//.addItem(state.recipe.ingredient.count);

