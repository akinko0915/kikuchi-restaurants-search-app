const areaSelect = document.getElementById("area");
const genreSelect = document.getElementById("genre");
const button = document.getElementById("searchButton");
const result = document.getElementById("results");

const url = "https://kikuchi-restaurants-api.onrender.com/api/v1/restaurants";

const getRestaurants = async (params) => {
  try {
    // console.log(params)
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${query}`);

    // console.log(response);
    if (!response.ok) throw new Error("HTTP error " + response.status);

    // console.log(response.json())
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

// event handler?
button.addEventListener("click", () => {
  // console.logで出す
  const area = areaSelect.value;
  const genre = genreSelect.value;

  // 簡単な処理で例を見せてから
  const searchParams = {
    area: area,
    genre: genre,
  };

  getRestaurants(searchParams).then((restaurants) => {
    // 初期化する
    result.innerHTML = "";

    // console.log(restaurants);
    /** 取得したデータがなかったときの処理**/
    if (restaurants.length === 0) {
      const messageDiv = document.createElement("div");
      messageDiv.className = "no-results";
      messageDiv.textContent = "該当する飲食店はありません";
      result.appendChild(messageDiv);
      return;
    }

    // 取得したデータがあるときの処理 (説明しながら)
    // まず画面見せてから（一つのデータの場合→複数のデータの場合）
    // ステップを書いておく
    restaurants.forEach((restaurant) => {
      const shopDiv = document.createElement("div");
      shopDiv.className = "shop";
      // console.log(restaurant.id);
      shopDiv.innerHTML = `
        <div>${restaurant.area.name} | ${restaurant.genre.name}</div>
        <div class="restaurant_name">${restaurant.name}</div>
    `;

      result.appendChild(shopDiv);

      shopDiv.addEventListener("click", () => {
        window.open(restaurant.map_link);
      });
    });
  });
});
