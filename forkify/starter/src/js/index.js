import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';   
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';


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
    const query = searchView.getInput(); 
        
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
    const btn = e.target.closest('.btn-inline');
    
    if (btn) {
        searchView.clearResults();
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.renderResults(state.search.result, goToPage);
        //console.log(goToPage);
    }
    
});

/** RECIPE CONTROLLER */


//for testing 


const controlRecipe = async () => {
    
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    //console.log(id);
    
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
            recipeView.renderRecipe(
                state.recipe, 
                state.likes.isLiked(id)
            );
            
            //console.log(state.recipe);
            
        } catch (error) {
           // console.log(error);               
            alert('Error processing recipe');
        }
    }
};

/* LIST CONTROLLER */

const controlList = () => {
    
    //Creating new list if there is not yet.
    if (!state.list) state.list = new List();
    
    //Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.count, el.ingredient);
        listView.renderItem(item);
    });
};

/*LIKES CONTROLLER*/

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    
    const currentID = state.recipe.id;
    
    //User has no liked recipe yet.
    if (!state.likes.isLiked(currentID)) {
        
        //Add like from the state (data)
        const newLike = state.likes.addLike(
            currentID, 
            state.recipe.title, 
            state.recipe.author, 
            state.recipe.img
        );
        
        //Toggle the like buttun
        likesView.toggleLikeBtn(true);
        
        //Add the Like from the UI list
        likesView.renderLike(newLike);
        
        //console.log(state.likes);
        
    // User already have liked recipe
    } else {
        
        //Remove like to the state (data)
        state.likes.deleteLike(state.recipe.id);
        
        //Toggle the like buttun
        likesView.toggleLikeBtn(false);
        
        //Remove the Like to the UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    //Handle the Delete button
    if (e.target.matches('.shopping__delete, .dataset.itemid *')) {
        
        //Delete from state
        state.list.deleteItem(id);
        
        //Delete from UI
        listView.deleteItem(id);
        
    //Handle count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
    
    //Handle the item change
});

/*
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
*/

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


//Restore liked recipes on page load 
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    //restore likes
    state.likes.readStorage();
    
    //Toggle the like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    
    //Render the existing likes (our Recipes in the menu)
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


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
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
        //console.log(e.target);
    }
    
    /*else if (e.target.matches('.')) {
        likesView.renderLike();
    }*/
               
    
    //console.log(state.recipe);
});



window.l = new List();
//.addItem(state.recipe.ingredient.count);