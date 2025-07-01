const area = document.getElementById("area");
const genre = document.getElementById("genre");
const button = document.getElementById("searchButton");
const result = document.getElementById("results");

url = "http://127.0.0.1:3000/api/v1/restaurants";
getRestaurants = async (area, genre) => {
  try {
    const query = `?area=${encodeURIComponent(area)}&genre=${encodeURIComponent(
      genre
    )}`;
    const response = await fetch(url + query);

    if (!response.ok) throw new Error("HTTP error" + response.status);

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

button.addEventListener("click", () => {
  getRestaurants(area.value, genre.value).then((restaurants) => {
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
