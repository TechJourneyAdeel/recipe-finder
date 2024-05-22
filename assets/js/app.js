// ~~~~ Random recipe ~~~~~

window.addEventListener("DOMContentLoaded", () => {
  let apiKey = "55c52881e4f083db749d5ba92931936f";
  let startRecipes = 0; // 12
  const recipesPerPage = 6;
  let currentPage = 1;
  let recipes = [];

  // Function to fetch recipes
  const fetchRecipes = () => {
    fetch(
      `https://api.edamam.com/search?q=biryani&app_id=b16a6ebc&app_key=${apiKey}&from=${startRecipes}&to=${
        startRecipes + recipesPerPage
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        startRecipes += recipesPerPage; // Increment startRecipes
        recipes = [...recipes, ...data.hits]; // Concatenate new recipes to existing recipes array
        displayRecipes();

        // Other Block Code
        moveSingle();
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
        <a href="javascript:;"><img src="${image}" alt=""></a>
      </div>
      <button><img src="assets/images/heart.svg" alt=""></button>
      <div class="card-content">
        <a href="javascript:;">
          <h4>${title}</h4>
        </a>
        <span>${source}</span>
      </div>
    `;
    row.appendChild(div);
  };
});

// ~~~~ Recipe Type Cus ~~~~~

window.addEventListener("DOMContentLoaded", () => {
  const fetchCusine = (types) => {
    const apiKey = "ca67003922c54fb68375702b127d4223";
    const foodType = String(types);

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=25&cuisine=${foodType}`
    )
      .then((respone) => respone.json())
      .then((response) => {
        console.log(response);
        if (response) {
          cuisinesRecipe(response);
        } else {
          alert("reponse not comeing");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cuisinesRecipe = (recieps) => {
    const response = recieps.results;

    response.forEach((recips) => {
      const row = document.querySelector(".cuisines-recipe .swiper-wrapper");
      const div = document.createElement("div");
      div.classList.add("swiper-slide");
      div.innerHTML = `
      <div class="cuisines-recepie"> 
        <div class="cuisines-img">
          <a href="#"><img src="${recips.image}" alt=""></a>
       </div>
        <button><img src="assets/images/heart.svg" alt=""></button>
        <div class="cuisines-content">
          <a href="#">
            <h4>${recips.title}</h4>
          </a>
        </div>
      </div>
     `;
      row.appendChild(div);
    });

    const cuisineRow = document.querySelector(".site-cuisines");
    cuisineRow.innerHTML = "";
    console.log(cuisineRow);
  };

  const types = document.querySelectorAll(".cuisines");

  types.forEach((types) => {
    types.addEventListener("click", () => {
      types.classList.toggle("active");
    });
  });

  const nextBtn = document.querySelector(".cta-btns .next");

  nextBtn.addEventListener("click", () => {
    const types = document.querySelectorAll(".cuisines.active");

    const ids = Array.from(types).map((id) => {
      return id.getAttribute("id");
    });

    if (!ids.length == 0) {
      fetchCusine(ids);
    } else {
      alert("Please Select Food type");
    }
  });

  // back cuisine

  const back = document.querySelector(".myCuisines");
  const backBtn = document.querySelector(".cta-btns .back");

  backBtn.addEventListener("click", () => {
    document.querySelector(".cuisines-recipe .swiper-wrapper").innerHTML = "";
    document.querySelector(".site-cuisines").appendChild(back);
  });
});

// ~~~~~~Go to Single Recipe ~~~~~~

const moveSingle = () => {
  const recipeCart = document.querySelectorAll(".card-recepie");

  recipeCart.forEach((cards) => {
    cards.addEventListener("click", (event) => {
      if (event.target.tagName == "IMG" || event.target.tagName == "H4") {
        const query = cards
          .querySelector("h4")
          .innerText.trim()
          .toLocaleLowerCase()
          .replace(/\s+/g, "-");
        console.log(query);

        // const url = window.location.href;
        // console.log(url);

        window.location.href = `single-recipe.html?title=${query}`;
      }
    });
  });
};
