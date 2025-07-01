const areaInput = document.getElementById("area");
const genreSelect = document.getElementById("genre-select");
const restaurantNameInput = document.getElementById("restaurant_name");
const button = document.getElementById("searchButton");
const result = document.getElementById("results");

const url = "http://127.0.0.1:3000/api/v1/restaurants";

const getRestaurants = async (params) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${query}`);

    if (!response.ok) throw new Error("HTTP error " + response.status);

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

button.addEventListener("click", () => {
  const area = areaInput.value;
  const genre = genreSelect.value;
  const restaurantName = restaurantNameInput.value;
  const isAllYouCanEat = document.getElementById("all-you-can-eat").checked;
  const isAllYouCanDrink = document.getElementById("all-you-can-drink").checked;

  const searchParams = {
    area,
    genre,
    restaurant_name: restaurantName,
    all_you_can_eat: isAllYouCanEat,
    all_you_can_drink: isAllYouCanDrink,
  };

  getRestaurants(searchParams).then((restaurants) => {
    result.innerHTML = "";
    restaurants.forEach((restaurant, index) => {
      const shopDiv = document.createElement("div");
      shopDiv.className = "shop";
      shopDiv.innerHTML = `
        <div>
          ${restaurant.area.name} | ${restaurant.genres
        .map((g) => g.name)
        .join("、")}
        </div>
        <div class="restaurant_name">${restaurant.name}</div>
        <div><strong>住所:</strong> ${restaurant.address}</div>
      `;
      result.appendChild(shopDiv);
    });
  });
});
