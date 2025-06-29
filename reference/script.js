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
    result.innerText = "";
    restaurants.forEach((restaurant, index) => {
      result.innerText += `レストラン ${index + 1}:\n`;
      result.innerText += `名前: ${restaurant.name}\n`;
      result.innerText += `住所: ${restaurant.address}\n`;
      result.innerText += `エリア: ${restaurant.area.name}\n`;
      result.innerText += `ジャンル: ${restaurant.genres
        .map((g) => g.name)
        .join("、")}\n`;
      result.innerText += "------\n";
    });
  });
});
