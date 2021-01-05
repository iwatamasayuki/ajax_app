function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      //レスポンスとして返却されたメモのレコードデータを取得しています
      const list = document.getElementById("list");
      //HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得しています
      const formText = document.getElementById("content");
      //メモの入力フォームをリセットするためです。ここではリセット対象の要素であるcontentという要素を取得しています
      const HTML = ` 
      <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時：${item.created_at}
        </div>
        <div class="post-content">
        ${item.content}
        </div>
      </div>`;
      //｀｀の間の投稿日時に関する部分は「メモとして描画する部分のHTML」を定義しています。
    list.insertAdjacentHTML("afterend", HTML);
    //listという要素に対して、insertAdjacentHTMLでHTMLを追加します。第一引数にafterendを指定することで、要素listの直後に挿入できます。
    formText.value = "";
    //「メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組みです。
    };
    e.preventDefault();
    //コントローラーのcreateアクションと重複しているアクションがある為、プログラム本来の処理を、止めるためにe.preventDefault();で処理を停止させます。
  });
}
window.addEventListener("load", memo);