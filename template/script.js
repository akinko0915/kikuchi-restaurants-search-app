const areaSelect = document.getElementById("area");
const genreSelect = document.getElementById("genre");
const button = document.getElementById("searchButton");
/** resultsという名前で、HTMLの要素を取得しよう **/

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
      /* step1: messageDivという名前でHTML要素を作る*/
      /* step2: 作ったHTML要素に"no-results"というクラスの名前をつける*/
      /* step３: 作ったHTML要素にtextContentというメソッドを使って"該当する飲食店はありません"を代入する*/
      /* step4: 作ったHTML要素をオリジナルのHTML要素に挿入する*/
      return;
    }

    // 取得したデータを表示する処理
    restaurants.forEach((restaurant) => {
      /* step1: HTML要素を作る*/
      /* step2: 作ったHTML要素に"shop"というクラスの名前をつける*/
      /* step３: 作ったHTML要素にinnerHTMLというメソッドを使って取得した値を入れる*/
      /* step4: 作ったHTML要素をオリジナルのHTML要素に挿入する*/
      /* お店がクリックされた時の処理を書いてみよう */
      // ヒント： 別タブでURLを開くメソッド: window.open(<url>)
    });
  });
});
