let apiKey = "55c52881e4f083db749d5ba92931936f";

fetch(
  `https://api.edamam.com/search?q=biryani&app_id=b16a6ebc&app_key=${apiKey}&from=0&to=50`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    banner(data.hits);
  })
  .catch((error) => {
    console.error(error);
  });

const banner = (data) => {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title").trim().replace(/-/g, " ");

  data.forEach((item) => {
    const label = item.recipe.label.toLocaleLowerCase();

    if (label === title) {
      const banner = document.querySelector(".single-banner-row");
      banner.querySelector("h1").innerText = `${item.recipe.label}`;
      banner
        .querySelector(".single-image img")
        .setAttribute("src", `${item.recipe.image}`);
    }
  });
};
