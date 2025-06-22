const keyword = document.getElementById("keyword");
const button = document.getElementById("searchButton");
const result = document.getElementById("results");

url = "http://127.0.0.1:3000/restaurants";
getRestaurants = () => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};
button.addEventListener("click", () => {
  getRestaurants().then((restaurants) => {
    if (!restaurants) return;
    console.log(restaurants);
    // let extracted_restaurants = restaurants.genre.filter("keyword");
    // console.log(extracted_restaurants);
  });
});
