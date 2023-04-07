//headlessstart
headless_function();
//headlessend


//headless function start
function headless_function() {

  let $ = (id) => {
    var id = document.getElementById(id);
    return id;
  };

  var $hl = { plugins: {} };

  window.$hl = $hl;

  $hl.plugins.microblog = { utils: {} };

  $hl.plugins.microblog.utils.click = () => {
    $hl.plugins.microblog.data.push($("headless-microblog-input").value);
    $hl.plugins.microblog.utils.saveData();
    $hl.plugins.microblog.utils.display();
    $("headless-microblog-input").value = "";
    $tw.rootWidget.invokeActionString('<$action-sendmessage $message="tm-save-wiki" />',$tw.wiki);
  };

  $hl.plugins.microblog.utils.input_key = (event) => {
    if (event.keyCode == 13) {
      $hl.plugins.microblog.data.push($("headless-microblog-input").value);
      $hl.plugins.microblog.utils.saveData();
      $hl.plugins.microblog.utils.display();
      $("headless-microblog-input").value = "";
    }
  };

  $hl.plugins.microblog.utils.display = function () {
    let output = $("headless-microblog-output");
    output.innerHTML = "";

    var list = document.createElement("ul");
    output.appendChild(list);

    var a1 = [...$hl.plugins.microblog.data].reverse();
    for (i in a1) {
      var li = document.createElement("li");
      li.innerHTML = a1[i];
      list.appendChild(li);
    }
  };

  $hl.plugins.microblog.utils.getData = function () {
    var unboundGetTiddlerData = $tw.Wiki.prototype.getTiddlerData;
    $hl.plugins.microblog.data = unboundGetTiddlerData.call(
      $tw.wiki,
      "$:/hl/plugins/microblog/data",
      "noData"
    );
  };

  $hl.plugins.microblog.utils.saveData = function () {
    var unboundSetTiddlerData = $tw.Wiki.prototype.setTiddlerData;
    unboundSetTiddlerData.call(
      $tw.wiki,
      "$:/hl/plugins/microblog/data",
      $hl.plugins.microblog.data,
      {}
    );
  };

  var e = document.createElement("input");
  e.type = "input";
  e.id = "headless-microblog-input";
  e.style = "width: 100%";
  e.onkeypress = "$hl.plugins.microblog.utils.input_key(event);";
  document.body.appendChild(e);

  var e = document.createElement("button");
  e.innerHTML = "add";
  e.onclick = $hl.plugins.microblog.utils.click;
  document.body.appendChild(e);

  e = document.createElement("div");
  e.id = "headless-microblog-output";
  document.body.appendChild(e);
  $hl.plugins.microblog.utils.getData();
  $hl.plugins.microblog.utils.display();
}
//headless function end