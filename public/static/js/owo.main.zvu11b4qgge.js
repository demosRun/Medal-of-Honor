// Sat Sep 28 2019 16:26:30 GMT+0800 (GMT+08:00)
// 兼容classList
// 定义一个classList对象
if (!("classList" in document.documentElement)) {
  Object.defineProperty(window.Element.prototype, 'classList', {
    get: function () {
      var self = this
 
      function update(fn) {
        return function () {
          var className = self.className.replace(/^\s+|\s+$/g, ''),
            valArr = arguments
 
          return fn(className, valArr)
        }
      }
 
      function add_rmv (className, valArr, tag) {
        for (var i in valArr) {
          if(typeof valArr[i] !== 'string' || !!~valArr[i].search(/\s+/g)) throw TypeError('the type of value is error')
          var temp = valArr[i]
          var flag = !!~className.search(new RegExp('(\\s+)?'+temp+'(\\s+)?'))
          if (tag === 1) {
            !flag ? className += ' ' + temp : ''
          } else if (tag === 2) {
            flag ? className = className.replace(new RegExp('(\\s+)?'+temp),'') : ''
          }
        }
        self.className = className
        return tag
      }
 
      return {
        add: update(function (className, valArr) {
          add_rmv(className, valArr, 1)
        }),
 
        remove: update(function (className, valArr) {
          add_rmv(className, valArr, 2)
        }),
 
        toggle: function (value) {
          if(typeof value !== 'string' || arguments.length === 0) throw TypeError("Failed to execute 'toggle' on 'DOMTokenList': 1 argument(string) required, but only 0 present.")
          if (arguments.length === 1) {
            this.contains(value) ? this.remove(value) : this.add(value)
            return
          }
          !arguments[1] ? this.remove(value) : this.add(value)
        },
 
        contains: update(function (className, valArr) {
          if (valArr.length === 0) throw TypeError("Failed to execute 'contains' on 'DOMTokenList': 1 argument required, but only 0 present.")
          if (typeof valArr[0] !== 'string' || !!~valArr[0].search(/\s+/g)) return false
          return !!~className.search(new RegExp(valArr[0]))
        }),
 
        item: function (index) {
          typeof index === 'string' ? index = parseInt(index) : ''
          if (arguments.length === 0 || typeof index !== 'number') throw TypeError("Failed to execute 'toggle' on 'DOMTokenList': 1 argument required, but only 0 present.")
          var claArr = self.className.replace(/^\s+|\s+$/, '').split(/\s+/)
          var len = claArr.length
          if (index < 0 || index >= len) return null
          return claArr[index]
        }
      }
    }
  })
}

var owo = {
  // 页面默认入口 如果没有设置 则取第一个页面为默认页面
  entry: "home",
  // 全局方法变量
  tool: {},
  // 框架状态变量
  state: {}
};

var isShowBig = false
var noSwiper = false
var isChange = false
function showBigImage () {
  if (isChange) return
  var e = arguments.callee.caller.arguments[0]|| window.event
  // console.log('ssssdddddd')
  // console.log(e)
  if (!e.target) e.target = e.srcElement.parentNode
  var imageItem = e.target.querySelectorAll('img')[0] || e.target
  var box2 = document.querySelectorAll('.show-big-img')[0]
  var box2Img = document.querySelectorAll('.show-big-img img')[0]
  box2Img.src = imageItem.src
  box2Img.style.height = owo.tool.getScreenInfo().clientHeight + 'px'
  if (isShowBig) {
    isShowBig = false
    box2Img.src = imageItem.src
    // owo.query('.so-1.button')[0].style.display = 'block'
    // owo.query('.so-2.button')[0].style.display = 'block'
    // console.log('ssdddddl')
    box2.style.display = 'none'
    // e.target.classList.remove('is-big')
    owo.script.home.data.swiper.startAutoPlay()
  } else {
    isShowBig = true
    box2.style.display = 'block'
    // if (!noSwiper) {
    //   owo.query('.so-1.button')[0].style.display = 'none'
    //   owo.query('.so-2.button')[0].style.display = 'none'
    // }
    owo.script.home.data.swiper.stopAutoPlay()
    // e.target.classList.add('is-big')
  }
  setTimeout(function () {
    isChange = false
  }, 1000);
}

var lala2 = false

/*
  存储每个页面的函数
  键名：页面名称
  键值：方法列表
*/

owo.script = {
  "home": {
    "data": {
      "swiper": null,
      "activeIndex": 0
    },
    "created": function created() {
      var _this = this;

      this.changeItem('ghgxz', 0);
      setTimeout(function () {
        _this.initContent();
      }, 0);
    },
    "prev": function prev() {
      var _this = this
      console.log(this)
      eventFor2 = 'prev'
      if (this.data.isBusy) return
      owo.script.home.data.isBusy = true
      owo.script.home.data.swiper.clickPrev();
      setTimeout(function() {
        _this.data.isBusy = false
      }, 800)
    },
    "next": function next() {
      eventFor2 = 'next'
      var _this = this
      if (this.data.isBusy) return
      owo.script.home.data.isBusy = true
      owo.script.home.data.swiper.clickNext();
      setTimeout(function () {
        _this.data.isBusy = false
      }, 800)
    },
    "initContent": function initContent() {
      eventFor2 = 'initContent'
      console.log(swiperIt)
      owo.script.home.data.swiper = swiperIt.init(owo.query('.content')[0], {
        autoplay: 3000,
        showSlider: 3,
        width: 32,
        step: 1,
        slideChange: function slideChange(ind) {},
        start: function start(ind) {}
      });
    },
    "changeItem": function changeItem(value, ind) {
      var _this2 = this;

      this.data.activeIndex = ind;
      var content = owo.query('.content')[0];
      content.style.display = 'none';
      if (this.data.swiper) this.data.swiper.destroy();
      var imgList = owo.query('.' + value + '')[0].children;
      var newHtml = ''; // 判断卡片数量决定是否启用轮播

      if (imgList.length <= 3) {
        // 隐藏左右按钮
        this.$el.classList.add('no-button');
        
        owo.query('.so-1.button')[0].style.display = 'none'
        owo.query('.so-2.button')[0].style.display = 'none'
        owo.query('.so-19')[0].src = '/img/MAIN/2019/09/119724/resource/one-19-2.png';
        noSwiper = true
        if (imgList.length === 1) {
          newHtml += "<li onclick=\"showBigImage()\" style=\"left: 0;right: 0;\">".concat(imgList[0].outerHTML, "</li>");
        } else if (imgList.length === 2) {
          newHtml += "<li onclick=\"showBigImage()\" style=\"left: 10%;\">".concat(imgList[0].outerHTML, "</li><li onclick=\"showBigImage()\" style=\"left: 60%;\">").concat(imgList[1].outerHTML, "</li>");
        } else if (imgList.length === 3) {
          newHtml += "<li onclick=\"showBigImage()\" style=\"left: 0%;\">".concat(imgList[0].outerHTML, "</li><li onclick=\"showBigImage()\" style=\"left: 34%;\">").concat(imgList[1].outerHTML, "</li><li onclick=\"showBigImage()\" style=\"left: 68%;\">").concat(imgList[2].outerHTML, "</li>");
        }
      } else {
        noSwiper = false
        owo.query('.so-1.button')[0].style.display = 'block'
        owo.query('.so-2.button')[0].style.display = 'block'
        owo.query('.so-19')[0].src = '/img/MAIN/2019/09/119724/resource/one-19.png';
        console.log(this.$el.classList)
        this.$el.classList.remove('no-button');

        for (var _ind = 0; _ind < imgList.length; _ind++) {
          var item = imgList[_ind]; // console.log(item)

          newHtml += "<li onclick=\"showBigImage()\">".concat(item.outerHTML, "</li>");
        }

        setTimeout(function () {
          _this2.initContent();
        }, 100);
      }

      owo.query('.content')[0].innerHTML = newHtml;
      setTimeout(function () {
        content.style.display = 'block';
      }, 500);
    },
    "template": {
      "copyright": {
        "prop": {}
      }
    }
  },
  "one": {
    "created": function created() {
      // 动画
      owo.tool.animate('zoomIn', owo.query('.so-1')[0], 200);
      owo.tool.animate('fadeIn', owo.query('.so-2')[0], 1200);
      owo.tool.animate('fadeInDown', owo.query('.medal')[0], 1600)
    },
    "two": function two() {
      owo.go('two', 'scaleDown', 'moveFromRight', 'scaleDown', 'moveFromLeft', true);
    }
  },
  "two": {
    "data": {
      "activeIndex": 0,
      "isExpand": false
    },
    "created": function created() {
      var _this3 = this;
      setTimeout(function() {
        if (!lala2) {
          _this3.enter()
        }
      }, 5000)
      // this.changeItem('gjxz', 0);
      owo.tool.touch({
        el: this.$el,
        end: function end(e) {
          // console.log(e.swipe)
          if (e.swipe[0] < -50) {
            if (_this3.data.swiper.isRun) {
              _this3.next();
            }
          } else if (e.swipe[0] > 50) {
            if (_this3.data.swiper.isRun) {
              _this3.prev();
            }
          } else if (e.swipe[0] > 100) {// const nextIndex = this.data.activeIndex + 1
            // if (nextIndex >= owo.query('.edit div').length) {
            //   owo.tool.toast('已经是最后一条了', 30)
            // } else {
            //   this.changeItem(owo.query('.edit div')[nextIndex].classList[0], nextIndex)
            // }
          } else if (e.swipe[0] < -100) {// const nextIndex = this.data.activeIndex - 1
            // if (nextIndex < 0) {
            //   owo.tool.toast('已经是第一条了', 30)
            // } else {
            //   this.changeItem(owo.query('.edit div')[nextIndex].classList[0], nextIndex)
            // }
          }
        }
      });
    },
    "initMiniContent": function initMiniContent() {
      this.data.swiper = swiperIt.init(owo.query('.content-mini')[0], {
        autoplay: 3000,
        showSlider: 1,
        width: 100,
        step: 1,
        slideChange: function slideChange(ind) {},
        start: function start(ind) {}
      });
    },
    "changeItem": function changeItem(value, ind) {
      var _this4 = this;

      this.data.activeIndex = ind;
      var content = owo.query('.content-mini')[0];
      content.style.display = 'none';
      if (this.data.swiper) this.data.swiper.destroy();
      var imgList = [];
      var temp = document.querySelectorAll('.ox[template="home"] .' + value + '');
      for (var ind =0; ind < temp.length; ind++) {
        var element = temp[ind]
        for (var key in element.children) {
          if (element.children.hasOwnProperty(key)) {
            var element2 = element.children[key];
            imgList.push(element2);
          }
        }
      }
	  
	  var other = (value == 'gjxz' ? 'gjrych' : 'gjxz')
      var temp2 = document.querySelectorAll('.ox[template="home"] .' + other + '');
      for (var ind =0; ind < temp2.length; ind++) {
        var element = temp2[ind]
        for (var key in element.children) {
          if (element.children.hasOwnProperty(key)) {
            var element2 = element.children[key];
            imgList.push(element2);
          }
        }
      }

      var newHtml = ''; // 判断卡片数量决定是否启用轮播

      if (imgList.length <= 3) {
        // 隐藏左右按钮
        this.$el.classList.add('no-button');

        if (imgList.length === 1) {
          newHtml += "<li style=\"left: 0;right: 0;\">".concat(imgList[0].outerHTML, "</li>");
        } else if (imgList.length === 2) {
          newHtml += "<li style=\"left: 10%;\">".concat(imgList[0].outerHTML, "</li><li style=\"left: 60%;\">").concat(imgList[1].outerHTML, "</li>");
        } else if (imgList.length === 3) {
          newHtml += "<li style=\"left: 0%;\">".concat(imgList[0].outerHTML, "</li><li style=\"left: 34%;\">").concat(imgList[1].outerHTML, "</li><li style=\"left: 68%;\">").concat(imgList[2].outerHTML, "</li>");
        }
      } else {
        console.log('0000000000000000000000000')
        this.$el.classList.remove('no-button');

        for (var _ind2 = 0; _ind2 < imgList.length; _ind2++) {
          var item = imgList[_ind2]; // console.log(item)

          newHtml += "<li>".concat(item.outerHTML, "</li>");
        }

        setTimeout(function () {
          _this4.initMiniContent();
        }, 100);
      }

      owo.query('.content-mini')[0].innerHTML = newHtml;
      setTimeout(function () {
        content.style.display = 'block';
      }, 300);
    },
    "prev": function prev() {
      this.data.swiper.clickPrev();
    },
    "next": function next() {
      this.data.swiper.clickNext();
    },
    "wholeImg": function wholeImg() {
      console.log(this.data.isExpand);

      if (this.data.isExpand) {
        this.data.isExpand = false;
        console.log('999999999999')
        owo.query('.content-mini')[0].classList.remove('expand');
		owo.query('.content-mini')[0].classList.remove('expand2')
        this.data.swiper.startAutoPlay();
      } else {
        this.data.isExpand = true;
        this.data.swiper.stopAutoPlay();

        if (owo.tool.getScreenInfo().ratio < 0.557) {
          owo.query('.content-mini')[0].classList.add('expand');
        } else {
          owo.query('.content-mini')[0].classList.add('expand2');
        }

        setTimeout(function () {
          owo.tool.toast('点击屏幕退出全屏');
        }, 500);
      }

      return;
    },
    "enter": function enter() {
      lala2 = true
      this.changeItem('gjxz', 0);
      setTimeout(function () {
        owo.query('.blinker')[0].style.display = 'none';
        owo.query('.content-mini')[0].style.opacity = '1';
      }, 300);
    }
  }
};

/* 方法合集 */
var _owo = {
  /* 运行页面初始化方法 */
  runCreated: function (pageFunction) {
    try {
      // console.log(pageFunction)
      // 确保created事件只被执行一次
      if (!pageFunction["_isCreated"]) {
        pageFunction._isCreated = true
        if (pageFunction.created) {
          pageFunction.created.apply(pageFunction)
        }
      }
      // 模板插值处理
      _owo.showHandle(pageFunction)

      // console.log(pageFunction)
      if (pageFunction.show) {
        pageFunction.show.apply(pageFunction)
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}


_owo.getValFromObj = function (str, value) {
  // 如果模块没有数据则直接返回null
  if (!value) value = window
  var arr = str.split('.')
  for (var index = 0; index < arr.length; index++) {
    var element = arr[index]
    if (value[element]) {
      value = value[element]
    } else {
      return undefined
    }
  }
  return value
}

_owo.showHandle = function (pageFunction) {
  var linkList = pageFunction.$el.querySelectorAll('[innerText]')
  for (var ind = 0; ind < linkList.length; ind++) {
    var element = linkList[ind]
    var dataFor = element.getAttribute("innerText")
    // 获取对应的值
    var value = _owo.getValFromObj(dataFor, pageFunction)
    if (value == undefined) {
      // console.log('从全局获取值!')
      value = _owo.getValFromObj(dataFor)
    }
    element.innerText = value
  }
}

// 判断是否为手机
_owo.isMobi = navigator.userAgent.toLowerCase().match(/(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null

eventFor2 = null

_owo._run = function (eventFor, templateName, event) {
  if (!eventFor) eventFor = eventFor2
  // 复制eventFor防止污染
  var eventForCopy = eventFor
  
  // 判断页面是否有自己的方法
  var newPageFunction = window.owo.script[window.owo.activePage]
  // console.log(this.attributes)
  if (templateName && templateName !== owo.activePage) {
    // 如果模板注册到newPageFunction中，那么证明模板没有script那么直接使用eval执行
    if (newPageFunction.template) newPageFunction = newPageFunction.template[templateName]
  }
  // 待优化可以单独提出来
  // 取出参数
  var parameterArr = []
  console.log('-------')
  console.log(eventForCopy)
  if (!eventForCopy) return
  var parameterList = eventForCopy.match(/[^\(\)]+(?=\))/g)
  
  if (parameterList && parameterList.length > 0) {
    // 参数列表
    parameterArr = parameterList[0].split(',')
    // 进一步处理参数
    
    for (var i = 0; i < parameterArr.length; i++) {
      var parameterValue = parameterArr[i].replace(/(^\s*)|(\s*$)/g, "")
      // console.log(parameterValue)
      // 判断参数是否为一个字符串
      
      if (parameterValue.charAt(0) === '"' && parameterValue.charAt(parameterValue.length - 1) === '"') {
        parameterArr[i] = parameterValue.substring(1, parameterValue.length - 1)
      }
      if (parameterValue.charAt(0) === "'" && parameterValue.charAt(parameterValue.length - 1) === "'") {
        parameterArr[i] = parameterValue.substring(1, parameterValue.length - 1)
      }
      // console.log(parameterArr[i])
    }
  }
  eventForCopy = eventFor.replace(/\(.*\)/, '')
  // console.log(newPageFunction, eventForCopy)
  // 如果有方法,则运行它
  if (newPageFunction && newPageFunction[eventForCopy]) {
    // 绑定window.owo对象
    newPageFunction.$event = event
    newPageFunction[eventForCopy].apply(newPageFunction, parameterArr)
  } else {
    // 如果没有此方法则交给浏览器引擎尝试运行
    eval(eventFor)
  }
}

_owo.bindEvent = function (eventName, eventFor, tempDom, templateName) {
  tempDom['on' + eventName] = function(event) {
    _owo._run(eventFor, templateName, event)
  }
}

/* owo事件处理 */
// 参数1: 当前正在处理的dom节点
// 参数2: 当前正在处理的模块名称
_owo.handleEvent = function (tempDom, templateName) {
  var activePage = window.owo.script[owo.activePage]
  
  if (tempDom.attributes) {
    for (var ind = 0; ind < tempDom.attributes.length; ind++) {
      var attribute = tempDom.attributes[ind]
      // 判断是否为owo的事件
      // ie不支持startsWith
      if (attribute.name[0] == ':') {
        var eventName = attribute.name.slice(1)
        var eventFor = attribute.textContent
        switch (eventName) {
          case 'show' : {
            // 初步先简单处理吧
            var temp = eventFor.replace(/ /g, '')
            // 取出条件
            var condition = temp.split("==")
            if (activePage.data[condition[0]] != condition[1]) {
              tempDom.style.display = 'none'
            }
            break
          }
          case 'tap': {
            // 待优化 可合并
            // 根据手机和PC做不同处理
            if (_owo.isMobi) {
              _owo._event_tap(tempDom, function (event) {
                _owo._run(eventFor, templateName, event)
              })
            } else _owo.bindEvent('click', eventFor, tempDom, templateName)
            break
          }
          default: {
            _owo.bindEvent(eventName, eventFor, tempDom, templateName)
          }
        }
      }
    }
  }
  
  // 判断是否有子节点需要处理
  if (tempDom.children) {
    // 递归处理所有子Dom结点
    for (var i = 0; i < tempDom.children.length; i++) {
      // 获取子节点实例
      var childrenDom = tempDom.children[i]
      // 每个子节点均要判断是否为模块
      if (childrenDom.getAttribute('template')) {
        
        // 如果即将遍历进入模块 设置即将进入的模块为当前模块
        // 获取模块的模块名
        _owo.handleEvent(childrenDom, childrenDom.getAttribute('template'))
      } else {
        _owo.handleEvent(childrenDom, templateName)
      }
    }
  } else {
    console.info('元素不存在子节点!')
    console.info(tempDom)
  }
}

// 快速选择器
owo.query = function (str) {
  return document.querySelectorAll('.ox[template=' + owo.activePage +'] ' + str)
}

/* 运行页面所属的方法 */
_owo.handlePage = function (newPageFunction, entryDom) {
  /* 判断页面是否有自己的方法 */
  if (!newPageFunction) return
  // console.log(entryDom)
  newPageFunction['$el'] = entryDom
  // console.log(newPageFunction)
  _owo.runCreated(newPageFunction)
  // debugger
  // 判断页面是否有下属模板,如果有运行所有模板的初始化方法
  for (var key in newPageFunction.template) {
    var templateScript = newPageFunction.template[key]
    // 待修复,临时获取方式,这种方式获取到的dom不准确
    var childDom = entryDom.querySelectorAll('[template="' + key +'"]')[0]
    if (!childDom) {
      console.error('组件丢失:', key)
      continue
    }
    // 递归处理
    _owo.handlePage(templateScript, childDom)
  }
}
_owo.getarg = function (url) { // 获取URL #后面内容
  if (!url) return null
  var arg = url.split("#");
  return arg[1] ? arg[1].split('?')[0] : null
}

// 页面资源加载完毕事件
_owo.showPage = function() {
  owo.entry = document.querySelector('[template]').getAttribute('template')
  // 取出URL地址判断当前所在页面
  var pageArg = _owo.getarg(window.location.hash)
  // 从配置项中取出程序入口
  var page = pageArg ? pageArg : owo.entry
  if (page) {
    var entryDom = document.querySelector('.ox[template="' + page + '"]')
    if (entryDom) {
      // 显示主页面
      entryDom.style.display = 'block'
      window.owo.activePage = page
      _owo.handlePage(window.owo.script[page], entryDom)
      _owo.handleEvent(entryDom, null)
    } else {
      console.error('入口文件设置错误,错误值为: ', page)
    }
  } else {
    console.error('未设置程序入口!')
  }
  // 设置当前页面为活跃页面
  owo.state.newUrlParam = _owo.getarg(document.URL)
}

/*
  页面跳转方法
  参数1: 需要跳转到页面名字
  参数2: 离开页面动画
  参数3: 进入页面动画
*/
owo.go = function (pageName, inAnimation, outAnimation, backInAnimation, backOutAnimation, noBack, param) {
  // console.log(owo.script[pageName])
  if (!owo.script[pageName]) {
    console.error('导航到不存在的页面!')
    return
  }
  owo.script[pageName]._animation = {
    "in": inAnimation,
    "out": outAnimation,
    "forward": true
  }
  var paramString = ''
  if (param && typeof param == 'object') {
    paramString += '?'
    // 生成URL参数
    for (var paramKey in param) {
      paramString += paramKey + '=' + param[paramKey] + '&'
    }
    // 去掉尾端的&
    paramString = paramString.slice(0, -1)
  }
  // 如果有返回动画那么设置返回动画
  if (backInAnimation && backOutAnimation) {
    owo.script[owo.activePage]._animation = {
      "in": backInAnimation,
      "out": backOutAnimation,
      "forward": false
    }
  }
  if (noBack) {
    location.replace(paramString + "#" + pageName)
  } else {
    window.location.href = paramString + "#" + pageName
  }
}

// url发生改变事件
_owo.hashchange = function (e) {
  // 这样处理而不是直接用event中的URL，是因为需要兼容IE
  owo.state.oldUrlParam = owo.state.newUrlParam;
  owo.state.newUrlParam = _owo.getarg(document.URL); 
  // console.log(owo.state.oldUrlParam, owo.state.newUrlParam)
  // 如果旧页面不存在则为默认页面
  if (!owo.state.oldUrlParam) owo.state.oldUrlParam = owo.entry;
  var newUrlParam = owo.state.newUrlParam;

  // 如果没有跳转到任何页面则跳转到主页
  if (newUrlParam === undefined) {
    newUrlParam = owo.entry;
  }

  // 如果没有发生页面跳转则不需要进行操作
  // 进行页面切换
  switchPage(owo.state.oldUrlParam, newUrlParam);
}

// ios的QQ有BUG 无法触发onhashchange事件
if(/iPhone\sOS.*QQ[^B]/.test(navigator.userAgent)) {window.onpopstate = _owo.hashchange;} else {window.onhashchange = _owo.hashchange;}
// 切换页面动画
function animation (oldDom, newDom, animationIn, animationOut, forward) {
  // 动画延迟
  var delay = 0
  // 获取父元素
  var parentDom = newDom.parentElement
  if (!oldDom) {
    console.error('旧页面不存在!')
  }
  oldDom.addEventListener("animationend", oldDomFun)
  newDom.addEventListener("animationend", newDomFun)
  
  oldDom.style.position = 'absolute'

  newDom.style.display = 'block'
  newDom.style.position = 'absolute'
  // 给即将生效的页面加上“未来”标识
  if (forward) {
    newDom.classList.add('owo-animation-forward')
  } else {
    oldDom.classList.add('owo-animation-forward')
  }
  // document.body.style.overflow = 'hidden'

  parentDom.style.perspective = '1200px'
  oldDom.classList.add('owo-animation')
  for (var ind =0; ind < animationIn.length; ind++) {
    var value = animationIn[ind]
    //判断是否为延迟属性
    if (value.startsWith('delay')) {
      var tempDelay = parseInt(value.slice(5))
      if (delay < tempDelay)  delay = tempDelay
    }
    oldDom.classList.add('o-page-' + value)
  }

  newDom.classList.add('owo-animation')
  for (var ind =0; ind < animationOut.length; ind++) {
    var value = animationOut[ind]
    if (value.startsWith('delay')) {
      var tempDelay = parseInt(value.slice(5))
      if (delay < tempDelay)  delay = tempDelay
    }
    newDom.classList.add('o-page-' + value)
  }
  // 旧DOM执行函数
  function oldDomFun (e) {
    // 排除非框架引起的结束事件
    if (e.target.getAttribute('template')) {
      // 移除监听
      oldDom.removeEventListener('animationend', oldDomFun, false)
      // 延迟后再清除，防止动画还没完成
      setTimeout(function () {
        oldDom.style.display = 'none'
        // console.log(oldDom)
        oldDom.style.position = ''
        console.log('------------------')
        oldDom.classList.remove('owo-animation')
        oldDom.classList.remove('owo-animation-forward')
        parentDom.style.perspective = ''
        // 清除临时设置的class
        for (var ind =0; ind < animationIn.length; ind++) {
          var value = animationIn[ind]
          oldDom.classList.remove('o-page-' + value)
        }
        console.log('--------222222222222----------')
      }, delay);
    }
  }

  // 新DOM执行函数
  function newDomFun () {
    // 移除监听
    newDom.removeEventListener('animationend', newDomFun, false)
    // 延迟后再清除，防止动画还没完成
    setTimeout(function () {
      // 清除临时设置的style
      newDom.style.position = '';
      console.log('sdddddd')
      newDom.classList.remove('owo-animation');
      newDom.classList.remove('owo-animation-forward');
      
      for (var ind =0; ind < animationOut.length; ind++) {
        var value = animationOut[ind]
        newDom.classList.remove('o-page-' + value);
      }
      console.log('kkkkkkkkkkkkkkk')
    }, delay);
  }
}


// 切换页面前的准备工作
function switchPage (oldUrlParam, newUrlParam) {
  var oldPage = oldUrlParam ? oldUrlParam.split('&')[0] : owo.entry
  var newPage = newUrlParam ? newUrlParam.split('&')[0] : owo.entry
  // console.log(oldPage, newPage)
  var oldDom = document.querySelector('.ox[template="' + oldPage + '"]')
  var newDom = document.querySelector('.ox[template="' + newPage + '"]')
  
  if (!newDom) {
    console.error('页面不存在!')
    return
  }
  // console.log(owo.state.animation)
  // 判断是否有动画效果
  if (!owo.script[newPage]._animation) owo.script[newPage]._animation = {}
  // 直接.in会在ie下报错
  var animationIn = owo.script[newPage]._animation['in']
  var animationOut = owo.script[newPage]._animation['out']
  if (animationIn || animationOut) {
    owo.state.animation = {}
    animation(oldDom, newDom, animationIn.split('&&'), animationOut.split('&&'), owo.state.animation['forward'])
  } else {
    if (oldDom) {
      // 隐藏掉旧的节点
      oldDom.style.display = 'none'
    }
    // 查找页面跳转后的page
    newDom.style.display = 'block'
  }
  
  window.owo.activePage = newPage
  if (!window.owo.script[newPage]._isCreated) {
    _owo.handleEvent(newDom, null)
  }
  _owo.handlePage(window.owo.script[newPage], newDom)
}
/*
 * 传递函数给whenReady()
 * 当文档解析完毕且为操作准备就绪时，函数作为document的方法调用
 */
_owo.ready = (function() {               //这个函数返回whenReady()函数
  var funcs = [];             //当获得事件时，要运行的函数
  
  //当文档就绪时,调用事件处理程序
  function handler(e) {
    // 确保事件处理程序只运行一次
    if(window.owo.state.isRrady) return
    window.owo.state.isRrady = true
    //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好
    if(e.type === 'onreadystatechange' && document.readyState !== 'complete') {
      return
    }
    
    // 运行所有注册函数
    for(var i=0; i<funcs.length; i++) {
      funcs[i].call(document);
    }
    funcs = null;
  }
  //为接收到的任何事件注册处理程序
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', handler, false)
    document.addEventListener('readystatechange', handler, false)            //IE9+
    window.addEventListener('load', handler, false)
  } else if(document.attachEvent) {
    document.attachEvent('onreadystatechange', handler)
    window.attachEvent('onload', handler)
  }
  //返回whenReady()函数
  return function whenReady (fn) {
    if (window.owo.state.isRrady) {
      fn.call(document)
    } else {
      funcs.push(fn)
    }
  }
})()

// 执行页面加载完毕方法
_owo.ready(_owo.showPage)


/**
 * 赋予节点动画效果
 * @param  {string} name 动画效果名称
 * @param  {dom} dom 节点
 */
owo.tool.animate = function (name, dom, delay) {
  dom.classList.add(name)
  dom.classList.add('owo-animated')
  if (delay) {
    dom.style.animationDelay = delay + 'ms'
  }
  // 待优化可以单独提出绑定方法
  dom.addEventListener('animationend', animateEnd)
  function animateEnd () {
    // 待优化 感觉不需要这样
    console.log('sdsdds')
    dom.classList.remove(name)
    dom.classList.remove('owo-animated')
    console.log('sdsdds2')
    if (delay) {
      dom.style.animationDelay = ''
    }
  }
}
/**
 * 滑动检测
 * @param  {DOM} el 需要监测的dom元素
 * @param  {Function} start   开始事件
 * @param  {Function} touchmove   触摸移动事件
 * @param  {Function} end   结束事件
 */

owo.tool.touch = function (config) {
  var dom = config.el
  // 判断是否已经处于监听状态
  if (dom.getAttribute("monitor") == 'touch') return
  var start = null
  var end = null
  var startTarget = null
  // 设置监听标识
  dom.setAttribute("monitor", "touch")
  dom.addEventListener("touchstart", function (e) {
    event = e.targetTouches[0] || e.originalEvent.targetTouches[0]
    startTarget = e.target
    start = end = [event.clientX, event.clientY]
    if (config.start) config.start(event)
  }, false)
  dom.addEventListener("touchmove", function (e) {
    event = e.targetTouches[0] || e.originalEvent.targetTouches[0]
    end = [event.clientX, event.clientY]
    if (config.moveing) config.moveing(event)
  }, false)
  dom.addEventListener("touchend", function (e) {
    if (config.end) {
      config.end({
        target: startTarget,
        start: start,
        end: end,
        swipe: [end[0] - start[0], end[1] - start[1]]
      })
    }
  }, false)
  // 监控鼠标事件
  dom.addEventListener("mousedown", function (event) {
    dom.addEventListener("mousemove", function (event) {
      end = [event.clientX, event.clientY]
      if (config.moveing) config.moveing(event)
    }, false)
    start = end = [event.clientX, event.clientY]
    if (config.start) config.start(event)
  }, false)
  
  dom.addEventListener("mouseup", function () {
    // 移除监听
    dom.removeEventListener("mousemove", function () {

    }, false)
    if (config.end) {
      config.end({
        target: startTarget,
        start: start,
        end: end,
        swipe: [end[0] - start[0], end[1] - start[1]]
      })
    }
  }, false)
}/**
 * 显示toast提示 不支持ie8
 * @param  {number} text       显示的文字
 * @param  {number} fontSize   字体大小
 * @param  {number} time       显示时长
 */

owo.tool.toast = function (text, size, time) {
  if (window.owo.state.toastClock) {
    clearTimeout(window.owo.state.toastClock)
    hideToast()
  }
  var fontSize = size || 14
  if (time === undefined || time === null) {
    // 默认2秒
    time = 2000
  }
  var toast = document.createElement("div")
  toast.setAttribute("id", "toast")
  toast.setAttribute("class", "toast")
  // 设置样式
  toast.style.cssText = "position:fixed;z-index:999;background-color:rgba(0, 0, 0, 0.8);bottom:9%;border-radius:5px;left:0;right:0;margin:0 auto;text-align:center;color:white;max-width:40%;padding:5px 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:" + fontSize + 'px;'

  toast.innerHTML = text
  document.body.appendChild(toast)
  function hideToast() {
    document.getElementById('toast').outerHTML = ''
    window.owo.state.toastClock = null
  }
  window.owo.state.toastClock = setTimeout(hideToast, time)
}/**
 * 获取屏幕信息
 * @return {object} 屏幕信息
 */

owo.tool.getScreenInfo = function () {
  // 有可能不兼容ie
  return {
    clientWidth: window.innerWidth,
    clientHeight: window.innerHeight,
    ratio: window.innerWidth / window.innerHeight,
    // 缩放比例
    devicePixelRatio: window.devicePixelRatio || 1
  }
}

_owo._event_tap = function (tempDom, callBack) {
  // 变量
  var startTime = 0
  var isMove = false
  tempDom.addEventListener('touchstart', function() {
    startTime = Date.now();
  })
  tempDom.addEventListener('touchmove', function() {
    isMove = true
  })
  tempDom.addEventListener('touchend', function(e) {
    if (Date.now() - startTime < 300 && !isMove) {
      callBack(e)
    }
    // 清零
    startTime = 0;
    isMove = false
  })
}