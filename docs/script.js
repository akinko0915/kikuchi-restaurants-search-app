const areaSelect = document.getElementById("area");
const genreSelect = document.getElementById("genre");
const button = document.getElementById("searchButton");
const results = document.getElementById("results");

const url = "https://kikuchi-restaurants-api.onrender.com/api/v1/restaurants";

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
  const area = areaSelect.value;
  const genre = genreSelect.value;

  const searchParams = {
    area: area,
    genre: genre,
  };

  getRestaurants(searchParams).then((restaurants) => {
    results.innerHTML = "";

    if (restaurants.length === 0) {
      const messageDiv = document.createElement("div");
      messageDiv.className = "no-results";
      messageDiv.textContent = "該当する飲食店はありません";
      results.appendChild(messageDiv);
      return;
    }

    restaurants.forEach((restaurant) => {
      const shopDiv = document.createElement("div");
      shopDiv.className = "shop";
      shopDiv.innerHTML = `
        <div>${restaurant.area.name} | ${restaurant.genre.name}</div>
        <div class="restaurant_name">${restaurant.name}</div>
    `;

      results.appendChild(shopDiv);

      shopDiv.addEventListener("click", () => {
        window.open(restaurant.map_link);
      });
    });
  });
});
