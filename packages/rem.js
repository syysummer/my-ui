function rem (designWidth, maxWidth) {
  var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement('style'),
    html = document.getElementsByTagName('html')[0],
    tid

  function refreshRem () {
    var width = docEl.getBoundingClientRect().width
    maxWidth = maxWidth || 750
    width > maxWidth && (width = maxWidth)
    var rem = (width * 16) / designWidth
    html.style.fontSize = rem + 'px'
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle)
  } else {
    var wrap = doc.createElement('div')
    wrap.appendChild(remStyle)
    doc.write(wrap.innerHTML)
    wrap = null
  }

  //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem()
  win.addEventListener(
    'resize',
    function () {
      console.log('resize')
      clearTimeout(tid) //防止执行两次
      tid = setTimeout(refreshRem, 300)
      runRem()
    },
    false
  )

  win.addEventListener(
    'pageshow',
    function (e) {
      if (e.persisted) {
        // 浏览器后退的时候重新计算
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }
    },
    false
  )

  // 初始化body的字体大小，方式适配时由于屏幕
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '16px'
  } else {
    doc.addEventListener(
      'DOMContentLoaded',
      function () {
        doc.body.style.fontSize = '16px'
      },
      false
    )
  }
}

function runRem () {
  var designPageWidth =
    document.documentElement.clientWidth || document.body.clientWidth
  var designPageHeight =
    document.documentElement.clientHeight || document.body.clientHeight
  if (designPageWidth > 1024) {
    console.log(designPageWidth, 'PC')
    rem(1920, 1920)
  }else if (designPageWidth > designPageHeight) {
    console.log(designPageWidth, 'Pad横屏')
    rem(1024, 1024)
  } else {
    console.log(designPageWidth, 'Pad竖屏')
    rem(600, 750)
  }
}
runRem()