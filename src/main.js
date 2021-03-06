
// 设计宽度
var deviseW = 1920
// 设计高度
var deviseH = 1163
var innerWidth = document.documentElement.clientWidth || window.innerWidth || window.outerWidth || window.screen.availWidth
var innerHeight = document.documentElement.clientHeight || window.innerHeight || window.outerHeight || window.screen.availHeight
function getScale () {
  console.log(innerWidth, innerHeight, deviseW, deviseH)
  // 如果比例大于1则进入电脑模式
  if ((innerWidth / innerHeight) > 1) {
    document.body.style.width = deviseW + 'px'
    document.body.style.height = deviseH + 'px'
    if ((innerWidth / innerHeight) > deviseW / deviseH) {
      var scale = (innerWidth / deviseW).toFixed(2)
      document.body.style.transform = "scale(" + scale + ", " + scale + ") translate(0, " + (innerHeight - deviseH * scale) / 2 / scale + "px)"
      document.body.style.transformOrigin = "0 " + (innerHeight - deviseH * scale) + 'px' + " 0"
    } else {
      var scale = (innerHeight / deviseH).toFixed(2)
      // console.log("scale(" + scale + ", " + scale + ") translate(" + (innerWidth - deviseW * scale) / 2 / scale + 'px' + ", 0)")
      document.body.style.transform = "scale(" + scale + ", " + scale + ") translate(" + (innerWidth - deviseW * scale) / 2 / scale + 'px' + ", 0)"
      document.body.style.transformOrigin = '0 0 0'
      
    }
  } else {
    // 手机模式
    if ((innerHeight / innerWidth) > deviseH / deviseW) {
      var scale = (innerHeight / deviseW).toFixed(2)
      var temp = (deviseH - (deviseH - innerWidth / (innerHeight / deviseW)) / 2).toFixed(2)
      document.body.style.width = deviseW + 'px'
      document.body.style.height = deviseH + 'px'
      document.body.style.transform = "scale(" + scale + ", " + scale + ") translate(" + temp + "px, " + (innerHeight - deviseW * scale) / 2 / scale +"px) rotate(90deg)"
      document.body.style.transformOrigin = '0 0 0'
    } else {
      var scale = (innerWidth / deviseH).toFixed(2)
      document.body.style.width = deviseW + 'px'
      document.body.style.height = deviseH + 'px'
      document.body.style.transform = "scale(" + scale + ", " + scale + ") translate(" + deviseH + "px, " + (innerHeight - deviseW * scale) / 2 / scale +"px) rotate(90deg)"
      document.body.style.transformOrigin = '0 0 0'
    }
  }
  // setTimeout(function () {
  //   console.log(document.getElementsByTagName('html'))
  //   document.getElementsByTagName('html')[0].style.height = document.body.offsetHeight * scale + 'px'
  // }, 0)
}

getScale()

var timer = null
window.onresize = function ()  {
  if (!timer) {
    timer = setTimeout(function () {
      getScale()
      timer = null
    }, 1000)
  }
}