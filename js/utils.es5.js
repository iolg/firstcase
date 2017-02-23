'use strict';
var RES_WIDTH = 586;
var currentCallback,
    chgBnerVal;
function chgBner(elem, prefix, total, related) {
  if (chgBnerVal) {
    clearInterval(chgBnerVal);
    removeAllClass(elem, prefix);
  }
  if (!elem || !prefix || total < 2)
    return;
  console.log((prefix + " is starting..."));
  var pi = 0,
      pCrtAdd;
  chgBnerVal = setInterval(function() {
    console.log('...chgBner...:', pCrtAdd, elem, prefix, total);
    if (pCrtAdd)
      removeClass(elem, pCrtAdd);
    addClass(elem, prefix + pi % total);
    pCrtAdd = prefix + pi % 4;
    if (related && related.el && related.data) {
      related.el.innerHTML = related.data[pCrtAdd];
    }
    pi++;
  }, 4500);
}
;
function hasClass(elem, cls) {
  if (!cls)
    return false;
  return elem.className.split(' ').indexOf(cls) !== -1;
}
function addClass(elem, cls) {
  if (!elem || !cls)
    return;
  if (!hasClass(elem, cls)) {
    elem.className = elem.className ? elem.className + ' ' + cls : cls;
  }
}
function removeClass(elem, cls) {
  if (!elem || !cls || !hasClass(elem, cls))
    return;
  var allCls = elem.className.split(' ');
  var rmIndex = allCls.indexOf(cls);
  allCls.splice(rmIndex, 1);
  elem.className = allCls.join(' ');
}
function removeAllClass(elem, clsPrefix) {
  var allCls = elem.className.split(' ');
  var delCls = [];
  allCls.forEach(function(cls) {
    if (cls.startsWith(clsPrefix)) {
      delCls.push(cls);
    }
  });
  if (delCls) {
    delCls.forEach(function(cls) {
      removeClass(elem, cls);
    });
  }
}
function isMobile() {
  var userAgentInfo = navigator.userAgent;
  var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = false;
  for (var i = 0,
      v = void 0; v = agents[i]; i++) {
    if (userAgentInfo.indexOf(v) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
}
function hideScroll() {
  var bodyHtml = document.body.innerHTML;
  if (bodyHtml.indexOf('f-hidescroll') !== -1)
    return;
  document.body.innerHTML = "<div id='f-hidescroll'><div id='f-rewidth'>" + bodyHtml + "</div></div>";
  var hideScrollEl = document.getElementById('f-hidescroll'),
      reWidth = document.getElementById('f-rewidth');
  document.getElementsByTagName('html')[0].style.cssText = "height:100%;overflow:hidden;";
  document.body.style.cssText = "overflow:hidden; width:100%; height:100%";
  hideScrollEl.style.cssText = "height:100%; margin-right:-10px; overflow-x:hidden; overflow-y:auto;-webkit-overflow-scrolling:touch;";
  reWidth.style.cssText = "margin-right:10px; overflow-x:hidden;";
}
function menuToggle(toggle, menu, direction, begin, end) {
  if (isMobile()) {
    document.body.style.cursor = "pointer";
  }
  toggle.onclick = function(e) {
    e.cancleBubble = true;
    e.stopPropagation();
    var current = window.getComputedStyle(menu)[direction];
    current = parseInt(current.substring(0, current.length - 2));
    menu.style[direction] = current ? end : begin;
  };
  menu.onclick = function(e) {
    e.cancleBubble = true;
    e.stopPropagation();
  };
  document.body.addEventListener('click', remove);
  function remove(e) {
    menu.style[direction] = begin;
  }
}
function helpToggle() {
  if (!isMobile()) {
    var help = document.getElementById('m-help');
    if (!help)
      return;
    if (window.addEventListener) {
      help.addEventListener('mouseenter', toggleHelp);
      help.addEventListener('mouseleave', toggleHelp);
    } else {
      help.attachEvent('onmouseenter', toggleHelp);
      help.attachEvent('onmouseleave', toggleHelp);
    }
  }
  function toggleHelp(e) {
    var currentDisplay;
    console.log(window.getComputedStyle(e.target.children[1]).display);
    window.getComputedStyle ? currentDisplay = window.getComputedStyle(e.target.children[1]).display : currentDisplay = e.target.children[1].currentStyle.display;
    e.target.children[1].style.display = currentDisplay === "block" ? "none" : "block";
  }
}
window.onresize = function(e) {
  init(currentCallback);
};
function onMenuToggle() {
  var toggle = document.getElementById('u-toggle'),
      menu = document.getElementById('m-menu');
  if (toggle && menu) {
    menuToggle(toggle, menu, "left", "-130px", "0");
  }
}
function activeTouchEffect() {
  if (isMobile()) {
    document.body.addEventListener('touchstart', function() {});
  }
}
function init(callback) {
  if (isMobile() || document.body.clientWidth < RES_WIDTH) {
    hideScroll();
    onMenuToggle();
  }
  activeTouchEffect();
  helpToggle();
  if (callback) {
    currentCallback = callback;
    console.log('callback');
    callback();
  }
}
