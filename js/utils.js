'use strict';

const RES_WIDTH = 586;
var currentCallback, chgBnerVal;

/**
 * elem 幻灯片播放的主元素
 * prefix css中幻灯片背景图片样式的前缀，如u-welBner-
 * total 幻灯片总数
 * related? 关联对象 如幻灯片变动时候内容的变化 {el:node,data:obj}
 * 注意:data中的属性必须和css的选择器名相同,且前缀后面直接跟index值，从0开始
 */
function chgBner(elem, prefix, total, related) {
    // 如果已经存在chgBner,那就撤销上次的循环
    if (chgBnerVal) {
        clearInterval(chgBnerVal);
        // 恢复默认图片
        removeAllClass(elem, prefix);
    }
    if (!elem || !prefix || total < 2) return;
    console.log(`${prefix} is starting...`);
    let pi = 0, pCrtAdd;
    chgBnerVal = setInterval(function () {
        console.log('...chgBner...:', pCrtAdd, elem, prefix, total);
        // addClass(welBner, 'm-op-0');
        if (pCrtAdd) removeClass(elem, pCrtAdd);
        addClass(elem, prefix + pi % total);
        pCrtAdd = prefix + pi % 4;
        if (related && related.el && related.data) {
            related.el.innerHTML = related.data[pCrtAdd];
        }
        pi++;
        // 太耗能，不建议使用；这里用transition代替了这个功能
        // let i = 0;
        // let it = setInterval(function () {
        //     welBner.style.opacity = i;
        //     i += 0.008234123123;
        //     if (i >= 1) {
        //         clearInterval(it);
        //         i = 0;
        //     }
        // }, 20);
    }, 4500)
};

// 判断是否存在class
function hasClass(elem, cls) {
    if (!cls) return false;
    return elem.className.split(' ').indexOf(cls) !== -1;
}

// 添加class
function addClass(elem, cls) {
    if (!elem || !cls) return;
    if (!hasClass(elem, cls)) {
        elem.className = elem.className ? elem.className + ' ' + cls : cls;
    }
}

// 删除class
function removeClass(elem, cls) {
    if (!elem || !cls || !hasClass(elem, cls)) return;
    let allCls = elem.className.split(' ');
    let rmIndex = allCls.indexOf(cls);
    allCls.splice(rmIndex, 1);
    elem.className = allCls.join(' ');
}
// 删除元素中指定前缀的所有class
function removeAllClass(elem, clsPrefix) {
    let allCls = elem.className.split(' ');
    let delCls = [];
    allCls.forEach(function (cls) {
        if (cls.startsWith(clsPrefix)) {
            delCls.push(cls);
        }
    });
    if (delCls) {
        delCls.forEach(function (cls) {
            removeClass(elem, cls);
        });
    }
}

// 判断是否为移动端
function isMobile() {
    var userAgentInfo = navigator.userAgent;
    var agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = false;
    for (var i = 0, v; v = agents[i]; i++) {
        if (userAgentInfo.indexOf(v) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}

// 隐藏滚动条 建议将该方法放在最前，避免内存泄露
function hideScroll() {
    let bodyHtml = document.body.innerHTML;
    if (bodyHtml.indexOf('f-hidescroll') !== -1) return;
    // 改变body会重绘页面，重绘后需要重先获取DOM
    document.body.innerHTML = "<div id='f-hidescroll'><div id='f-rewidth'>" + bodyHtml + "</div></div>";
    let hideScrollEl = document.getElementById('f-hidescroll'),
        reWidth = document.getElementById('f-rewidth');

    // 设置root节点(html节点)的高度为100%,超出内容hidden;
    document.getElementsByTagName('html')[0].style.cssText = "height:100%;overflow:hidden;";
    // 设置body元素超出内容hidden
    document.body.style.cssText = "overflow:hidden; width:100%; height:100%";
    // 设置隐藏滚动条，内容可以滑动 -webkit-overflow-scrolling:touch; 根据触摸来决定速度
    hideScrollEl.style.cssText = "height:100%; margin-right:-10px; overflow-x:hidden; overflow-y:auto;-webkit-overflow-scrolling:touch;";
    // 恢复默认宽度
    reWidth.style.cssText = "margin-right:10px; overflow-x:hidden;";
}

/**
 * 菜单开关
 * toggle Element 开关元素
 * menu Element 菜单元素
 * direction 开关移动的方向 left\right\top\bottom
 * begin 未移动端位置 如-130px;
 * end 移动后的位置 如 0;
 */
function menuToggle(toggle, menu, direction, begin, end) {
    // 移动端的document\window\body上的click事件无响应解决办法
    if (isMobile()) {
        document.body.style.cursor = "pointer";
    }
    toggle.onclick = function (e) {
        // 阻止冒泡行为
        e.cancleBubble = true;
        // 阻止事件传播行为 与上面的方法效果相同，为了兼容各浏览器都写上
        e.stopPropagation();
        let current = window.getComputedStyle(menu)[direction];
        current = parseInt(current.substring(0, current.length - 2))
        menu.style[direction] = current ? end : begin;
    };
    // 点击在菜单上，禁止触发document的click事件
    menu.onclick = function (e) {
        e.cancleBubble = true;
        e.stopPropagation();
    };
    document.body.addEventListener('click', remove);
    function remove(e) {
        menu.style[direction] = begin;
    }
}

// helpToggle 仅在PC端有效
function helpToggle() {
    if (!isMobile()) {
        let help = document.getElementById('m-help');
        if (!help) return;
        // help问答列表开关
        if (window.addEventListener) {
            help.addEventListener('mouseenter', toggleHelp);
            help.addEventListener('mouseleave', toggleHelp);
        } else {
            help.attachEvent('onmouseenter', toggleHelp);
            help.attachEvent('onmouseleave', toggleHelp);
        }
    }
    // help问答列表开关方法
    function toggleHelp(e) {
        let currentDisplay;
        console.log(window.getComputedStyle(e.target.children[1]).display);
        // 兼容性判断
        window.getComputedStyle ?
            currentDisplay = window.getComputedStyle(e.target.children[1]).display :
            currentDisplay = e.target.children[1].currentStyle.display;
        e.target.children[1].style.display = currentDisplay === "block" ? "none" : "block";
    }
}

// 响应式
window.onresize = function (e) {
    // onresize后，会重绘页面，故需要对页面操作DOM，需重新获取
    init(currentCallback);
};

// 初始化 开启菜单开关
function onMenuToggle() {
    let toggle = document.getElementById('u-toggle'),
        menu = document.getElementById('m-menu');
    if (toggle && menu) {
        menuToggle(toggle, menu, "left", "-130px", "0");
    }
}

// 激活css:active在移动端的touch效果
function activeTouchEffect() {
    if (isMobile()) {
        // touch的效果,类似PC端的:hover,通过这句话，移动端就可以使用css伪类:active了
        document.body.addEventListener('touchstart', function () { });
    }
}

// 初始化
function init(callback) {
    // 如果是移动端，隐藏滚动条
    if (isMobile() || document.body.clientWidth < RES_WIDTH) {
        // 隐藏滚动条
        // 该方法会重绘整个DOM树，故需放在最前面
        hideScroll();
        // 开启监听菜单开关
        onMenuToggle();
    }
    // 激活active效果
    activeTouchEffect();
    // 监听help触发事件
    helpToggle();
    if (callback) {
        currentCallback = callback;
        console.log('callback');
        callback();
    }

}