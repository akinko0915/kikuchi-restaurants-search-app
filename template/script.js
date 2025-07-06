const areaSelect = document.getElementById("area");
const genreSelect = document.getElementById("genre");
const button = document.getElementById("searchButton");
/** resultという名前で、HTMLの要素を取得しよう **/

// ここで、APIから取得できるデータを確認する
const url = "https://kikuchi-restaurants-api.onrender.com/api/v1/restaurants";

// APIデータを取得する処理
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

// buttonがクリックされたときの処理
button.addEventListener("click", () => {
  // ユーザーが入力した値をHTML要素から取得しよう
  const area = areaSelect.value;
  /* 入力されたgenreの値をHTML要素から取得しよう */

  const searchParams = {
    area: area,
    /* genreのパラメータも追加しよう */
  };

  getRestaurants(searchParams).then((restaurants) => {
    // 初期化する
    result.innerHTML = "";

    // console.log(restaurants);

    // 取得したデータがなかったときの処理
    if (restaurants.length === 0) {
      /* step1: HTML要素を作る*/
      /* step2: 作ったHTML要素に名前をつける*/
      /* step３: 作ったHTML要素に取得した値を入れる*/
      /* step4: 作ったHTML要素をオリジナルのHTML要素に挿入する*/
      return;
    }

    // 取得したデータを表示する処理
    restaurants.forEach((restaurant) => {
      /* step1: HTML要素を作る*/
      const shopDiv = document.createElement("div");

      /* step2: 作ったHTML要素に名前をつける*/
      shopDiv.className = "shop";

      /* step３: 作ったHTML要素に取得した値を入れる*/
      shopDiv.innerHTML = `
        <div>${restaurant.area.name} | ${restaurant.genre.name}</div>
        <div class="restaurant_name">${restaurant.name}</div>
    `;

      /* step4: 作ったHTML要素をオリジナルのHTML要素に挿入する*/
      result.appendChild(shopDiv);

      /* お店がクリックされた時の処理を書いてみよう */
    });
  });
});
