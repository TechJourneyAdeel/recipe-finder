window.addEventListener("DOMContentLoaded", () => {
  let apiKey = "55c52881e4f083db749d5ba92931936f";
  const recipesPerPage = 6;
  let currentPage = 1;
  let totalRecipes = 0; // 12
  let recipes = [];

  // Function to fetch recipes
  const fetchRecipes = () => {
    fetch(
      `https://api.edamam.com/search?q=biryani&app_id=b16a6ebc&app_key=${apiKey}&from=${totalRecipes}&to=${
        totalRecipes + recipesPerPage
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        totalRecipes += recipesPerPage; // Increment totalRecipes
        recipes = [...recipes, ...data.hits]; // Concatenate new recipes to existing recipes array
        displayRecipes();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to display recipes
  const displayRecipes = () => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const recipesToShow = recipes.slice(startIndex, endIndex);

    recipesToShow.forEach((recipe) => {
      addRecipe(recipe.recipe.image, recipe.recipe.label, recipe.recipe.source);
    });

    currentPage++;
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchRecipes(); // Fetch more recipes when the user scrolls to the bottom
    }
  };

  // Event listener for scroll event
  window.addEventListener("scroll", handleScroll);

  // Initial fetch of recipes
  fetchRecipes();

  // Function to add recipe to the DOM
  const addRecipe = (image, title, source) => {
    const row = document.querySelector(".card-row");
    const div = document.createElement("div");
    div.classList.add("card-recepie");
    div.innerHTML = `
      <div class="card-img">
        <a href="#"><img src="${image}" alt=""></a>
      </div>
      <button><img src="assets/images/heart.svg" alt=""></button>
      <div class="card-content">
        <a href="#">
          <h4>${title}</h4>
        </a>
        <span>${source}</span>
      </div>
    `;
    row.appendChild(div);
  };
});
