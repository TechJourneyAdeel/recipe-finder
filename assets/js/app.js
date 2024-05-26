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

        // Save Recipe

        saveRecipe(recipes);
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
      <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg></button>
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

// ~~~~~ Save Recipe ~~~~~~

const saveRecipe = (recipes) => {
  const recipeCards = document.querySelectorAll(".card-recepie");
  let selectedRecipeTitle;
  let SelectedRecip = [];

  recipeCards.forEach((card) => {
    card.addEventListener("click", (evt) => {
      if (evt.target.tagName === "BUTTON") {
        selectedRecipeTitle = card.querySelector("h4").innerText;

        // Check if the recipe is already in SelectedRecip
        const isAlreadySelected = SelectedRecip.some(
          (recipe) =>
            recipe.recipe.label.toLocaleLowerCase() ===
            selectedRecipeTitle.toLocaleLowerCase()
        );

        if (isAlreadySelected) {
          alert("Recipe already added on your favorite list");
        } else {
          filterRecipes();
          document.querySelector(".save-list").classList.add("active");
          card.classList.add("recipe-save");
        }
      }
    });
  });

  const filterRecipes = () => {
    recipes.forEach((recipe) => {
      if (
        recipe.recipe.label.toLocaleLowerCase() ===
        selectedRecipeTitle.toLocaleLowerCase()
      ) {
        SelectedRecip.push(recipe);
      }
    });

    SaveOnData(SelectedRecip);
  };
};

const SaveOnData = (data) => {
  console.log(data);
  localStorage.setItem("saveData", JSON.stringify(data));
  ShowFavList();
};

const ShowFavList = () => {
  const getData = JSON.parse(localStorage.getItem("saveData"));
  const panelBody = document.querySelector(".panel-body");

  if (getData) {
    getData.forEach((recipe) => {
      const div = document.createElement("div");
      div.classList.add("cart-list");
      div.innerHTML = `
          <div class="cart-image">
            <img src="${recipe.recipe.image}" alt="">
          </div>
          <small><svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                  <path
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z">
                  </path>
              </svg></small>
          <div class="cart-content">
              <h4>${recipe.recipe.label}</h4>
              <span>${recipe.recipe.cuisineType}</span>
          </div>
              `;
      panelBody.append(div);
    });
  }
};

ShowFavList();

window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".save-list");
  const btn = nav.querySelector("ul li:last-child");
  const ovrly = nav.querySelector(".ovrly");
  const panelIcon = document.querySelector(".panel-header span");

  if (nav && btn && ovrly && panelIcon) {
    btn.addEventListener("click", () => {
      nav.classList.add("active");
    });

    [panelIcon, ovrly].forEach((element) => {
      element.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  } else {
    console.error("One or more elements are not found in the DOM.");
  }
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
