const areaSelect = document.getElementById("area");
const genreSelect = document.getElementById("genre");
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
  const restaurantName = restaurantNameInput.value;
  const area = areaSelect.value;
  const genre = genreSelect.value;

  const searchParams = {
    area: area,
    genre: genre,
    restaurant_name: restaurantName,
  };

  getRestaurants(searchParams).then((restaurants) => {
    result.innerHTML = "";

    if (restaurants.length === 0) {
      const messageDiv = document.createElement("div");
      messageDiv.className = "no-results";
      messageDiv.textContent = "該当する飲食店はありません";
      result.appendChild(messageDiv);
      return;
    }
    restaurants.forEach((restaurant) => {
      const shopDiv = document.createElement("div");
      shopDiv.className = "shop";
      shopDiv.innerHTML = `
        <div>${restaurant.area.name} | ${restaurant.genre.name}</div>
        <div class="restaurant_name">${restaurant.name}</div>
    `;

      shopDiv.addEventListener("click", () => {
        if (restaurant.map_link) {
          window.open(restaurant.map_link, "_blank", "noopener");
        }
      });

      result.appendChild(shopDiv);
    });
  });
});
