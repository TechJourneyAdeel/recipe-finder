window.addEventListener("DOMContentLoaded", () => {
  let apiKey = "55c52881e4f083db749d5ba92931936f";

  fetch(
    `https://api.edamam.com/search?q=biryani&app_id=b16a6ebc&app_key=${apiKey}&from=0&to=50`
  )
    .then((response) => response.json())
    .then((data) => {
      banner(data.hits);
      similarRecipe(data);
    })
    .catch((error) => {
      console.error(error);
    });

  const banner = (data) => {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title").replace(/-/g, " ");

    data.forEach((item) => {
      const label = item.recipe.label.toLocaleLowerCase();

      if (label === title) {
        SgleRcipCotnt(item.recipe);
      }
    });
  };
});

const SgleRcipCotnt = (recipe) => {
  // Banner

  const banner = document.querySelector(".single-banner-row");
  banner.querySelector("h1").innerText = `${recipe.label}`;
  banner
    .querySelector(".single-image img")
    .setAttribute("src", `${recipe.image}`);
  banner.querySelector("span").innerText = `${recipe.mealType}`;
  banner.querySelector(
    "p"
  ).innerText = `${recipe.cuisineType} ${recipe.dietLabels} ${recipe.dishType}`;
  banner.querySelector(
    ".single-recipe-count .single-count-col:first-child span"
  ).innerText = `${recipe.ingredientLines.length}`;
  banner.querySelector(
    ".single-recipe-count .single-count-col:nth-child(2) span"
  ).innerText = `${recipe.totalTime}`;
  banner.querySelector(
    ".single-recipe-count .single-count-col:last-child span"
  ).innerText = `${Math.floor(recipe.calories)}`;

  // Ingredient

  const Ingredient = document.querySelector(".single-ingredient ul");

  recipe.ingredientLines.forEach((ingredilist) => {
    const li = document.createElement("li");
    li.innerText = `${ingredilist}`;
    Ingredient.append(li);
  });

  // Nutrition

  const Nutrition = document.querySelector(
    ".single-nutritionView .swiper-wrapper"
  );

  Object.values(recipe.totalNutrients).forEach((indre) => {
    const buble = document.createElement("div");
    buble.classList.add("swiper-slide", "nutrition-bubble");
    buble.setAttribute(
      "style",
      "background-image: linear-gradient(to top, rgb(190, 218, 217) 499.45%, rgb(245, 245, 245) 499.45%);"
    );
    buble.innerHTML = `
    <span>${Math.round(indre.quantity)}</span>
    <small>${indre.label}</small>
  `;
    Nutrition.append(buble);
  });
};

const similarRecipe = (recipe) => {
  const url = new URLSearchParams(window.location.search);
  const title = url.get("title").replace(/-/g, " ").trim();

  let similar = (type) => {
    ShowSimilarDoc = (similar) => {
      const similarParent = document.querySelector(".single-may-also-row");
      similar.forEach((simi) => {
        const div = document.createElement("div");
        div.classList.add("cuisines-recepie");
        div.innerHTML = `
        <div class="cuisines-img">
                        <a href="#"><img src="${simi.recipe.image}" alt=""></a>
                    </div>
                    <button><img src="assets/images/heart.svg" alt=""></button>
                    <div class="cuisines-content">
                        <a href="#">
                            <h4>${simi.recipe.label}</h4>
                        </a>
                    </div>
        `;
        similarParent.append(div);
      });
    };

    const similarRec = recipe.hits.filter((rip) => {
      if (rip.recipe.cuisineType[0] == type) {
        return rip.recipe;
      }
    });

    ShowSimilarDoc(similarRec);
  };

  recipe.hits.forEach((list) => {
    if (list.recipe.label.toLocaleLowerCase() === title) {
      similar(list.recipe.cuisineType);
    }
  });
};
