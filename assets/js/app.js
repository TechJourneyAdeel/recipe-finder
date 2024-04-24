// Home page Recipe ~~~~~~~~~~~

window.addEventListener("DOMContentLoaded", () => {

    let apiKey = '9b564820132942188e375db6baaf00da'

    fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`)
        .then((recipe) => {
            return recipe.json()
        }).then((recipe) => {
            // console.log(addRecipe)
            addRecipe(recipe);
        }).catch((eror) => {
            console.log(eror)
        })

    const addRecipe = (recipe) => {
        console.log(recipe.recipes[0])
        console.log(yes);
    }
})


