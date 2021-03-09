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
  });
 }
 // ページが読み込まれることをトリガーにして、処理が実行されるように関数を定義
 // addEventListenerメソッドの第一引数にはloadイベントを指定し、第二引数の中に実行したい処理を記述
 window.addEventListener('load', post);