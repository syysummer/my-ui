function rem(designWidth, maxWidth) {
  var doc = document,
      win = window,
      docEl = doc.documentElement,
      remStyle = document.createElement("style"),
      html = document.getElementsByTagName("html")[0],
      tid;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
      maxWidth = maxWidth || 750;
      width>maxWidth && (width=maxWidth);
      var rem = width * 16  / designWidth;
      console.log('html{font-size',rem);
      html.style.fontSize = rem + "px";
  }
  function isIPhoneX(){
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {        
      if (screen.height == 812 && screen.width == 375){
        html.className +='isIOSX'
        //是iphoneX
      }else{
        html.classList.remove('isIOSX');
        //不是iphoneX
      } 
    }else{
      html.classList.remove('isIOSX');
    }
  }
  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement("div");
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }

  //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem();
  isIPhoneX();
  win.addEventListener("resize", function() {
    clearTimeout(tid); //防止执行两次
    tid = setTimeout(refreshRem, 300);
  }, false);

  win.addEventListener("pageshow", function(e) {
    if (e.persisted) { // 浏览器后退的时候重新计算
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener("DOMContentLoaded", function() {
      doc.body.style.fontSize = "16px";
    }, false);
  }
}
rem(750, 750);