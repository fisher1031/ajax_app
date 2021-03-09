const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html
}

function post (){
  // リクエストを送信する処理
  // getElementByIdメソッドで取得した投稿ボタンの要素を変数submitに格納
  const submit = document.getElementById("submit");
  // 「クリックされた」というイベントを認識したいため、addEventListenerメソッドの第一引数にはclickイベントを指定
  // preventDefaultとは、既定のイベントを無効化するためのメソッド
  // メモが重複投稿されないように
  // eはイベントオブジェクトといい、イベント発生時の情報を持ったオブジェクト
  // preventDefault()の対象をeとすることにより、「投稿ボタンをクリックした」という現象を無効化
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    // getElementByIdメソッドで取得したフォームの要素を変数formに格納
    const form = document.getElementById("form");
    // new FormData(フォームの要素);のように記述することでオブジェクトを生成し、引数にフォームの要素を渡すことで、そのフォームに入力された値を取得
    const formData = new FormData(form);
    // XMLHttpRequestとは、JavaScriptを用いてサーバーとHTTP通信を行うときに利用するオブジェクト
    // 「new XMLHttpRequest」と記述することで、新しくオブジェクトを生成
    // 新たに生成したXMLHttpRequestオブジェクトを変数XHRに格納
    const XHR = new XMLHttpRequest();
    // openとは、リクエストを初期化するメソッド
    // 第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをtrueかfalseで記述
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    // sendメソッドはリクエストを送信するメソッド
    XHR.send(formData);
    // レスポンスの受信に成功したときの処理
    XHR.onload = () => {
      // XHR.statusには、HTTPステータスコードが格納
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // return null;によってJavaScriptの処理から抜け出す
        // エラーが出た場合に、30行目以降に記述されている処理を行わないようにすることが目的
        return null;
      }
      // 新しいメモを挿入するための要素を取得して、変数listに格納
      const list = document.getElementById("list");
      // リセットの対象となるフォームの要素contentを取得して、変数formTextに格納
      const formText = document.getElementById("content");
      // 関数buildHTMLの返り値にhtmlを指定
      // htmlとは、3〜11行目で定義した変数htmlのことを表している。つまり、投稿後に新たに生成されたHTML
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // XHR.response.postと記述することで、レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納
      // XHR.response.postで値が取れるのは、postsコントローラーのcreateアクションにrender json: {post: post}と記述されていることで、postというキーと投稿されたメモの内容が紐付いているから
      const item = XHR.response.post;
      // item内に格納されたメモの情報を元にして、ブラウザに描画するためのHTMLを生成し、変数htmlに格納
      const html = `
        <div class="post">
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
        // insertAdjacentHTMLメソッドの第一引数にafterendを指定することで、変数listに格納された要素の直後に生成したHTMLを挿入
        list.insertAdjacentHTML("afterend", html);
        // formTextのvalue属性に空の文字列を指定することで、フォームの中身を毎度リセット
        formText.value = "";
    };
  });
 }
 // ページが読み込まれることをトリガーにして、処理が実行されるように関数を定義
 // addEventListenerメソッドの第一引数にはloadイベントを指定し、第二引数の中に実行したい処理を記述
 window.addEventListener('load', post);