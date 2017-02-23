'use strict';

var pty, otops, ptylabels = [], mstslty, mstsltyLabels = [], mstputy, mstputyLabels = [], djbl, djops;
window.onload = function (ev) {
    init();
    pty = document.getElementById('m-mstpty');
    otops = document.getElementById('u-otops');
    mstslty = document.getElementById('m-mstslty');
    djops = document.getElementById('u-djops');
    djbl = document.getElementById('m-mstdjbl');
    mstputy = document.getElementById('m-mstputy');
    //添加产品类型的点击事件
    for (var i = 0; i < pty.children.length; i++) {
        if (pty.children[i].tagName.toLowerCase() === 'label') {
            ptylabels.push(pty.children[i]);
            pty.children[i].control.onclick = chgPtyBg;
        }
    }
    //添加产品类型其他类型的点击事件
    for (var i = 0; i < otops.children.length; i++) {
        otops.children[i].onclick = chgOt;
    }

    //    添加销售类型点击事件
    for (var i = 0; i < mstslty.children.length; i++) {
        if (mstslty.children[i].tagName.toLowerCase() === 'label') {
            mstsltyLabels.push(mstslty.children[i]);
            mstslty.children[i].control.onclick = chgSltyBg;
        }
    }
    //    添加发布类型点击事件
    for (var i = 0; i < mstputy.children.length; i++) {
        if (mstputy.children[i].tagName.toLowerCase() === 'label') {
            mstputyLabels.push(mstputy.children[i]);
            mstputy.children[i].control.onclick = chgPutyBg;
        }
    }
    //  添加订金支付比例点击事件
    djbl.children[1].control.onclick = showDjblops;
    //添加产品类型其他类型的点击事件
    for (var i = 0; i < djops.children.length; i++) {
        djops.children[i].onclick = chgdjOt;
    }
};


//改变产品类型的背景
function chgPtyBg(e) {
    // 添加选中样式
    addClass(e.target.parentNode, 'f-selected');
    // 添加被选中属性
    e.target.setAttribute('checked', 'checked');
    // 删除其他按钮中的选中样式
    if (ptylabels) {
        for (var i = 0; i < ptylabels.length; i++) {
            if (!ptylabels[i].control.checked) {
                removeClass(ptylabels[i], 'f-selected');
                ptylabels[i].control.removeAttribute('checked', 'checked');
                if (i === ptylabels.length - 1) {
                    toggleOps('hide');
                    ptylabels[i].control.value = "其他";
                    ptylabels[i].firstChild.textContent = "其他";
                }
            }
        }
    }
    // 判断点中的是否是最后一个label
    if (e.target.id === 'u-ot') {
        if (otops.style.visibility === 'visible') {
            toggleOps('hide');
        } else {
            toggleOps('show');
        }
    }
}

//产品类型其他列表选中
function chgOt(e) {
    console.log(e);
    //阻止事件关联行为 如不阻止，会触发兄弟元素input的bgClick事件（本事件操作到了input）
    e.preventDefault();
    //修改label的第一个节点内容
    e.target.parentNode.parentNode.firstChild.textContent = e.target.textContent;
    // 修改input的value值
    e.target.parentNode.parentNode.children[0].value = e.target.textContent;
    toggleOps('hide');
}


//显示/关闭产品类型的其他项
function toggleOps(key) {
    if (otops) {
        if (key === 'show') {
            otops.style.cssText = "visibility:visible;height:204px;";
        } else if (key === 'hide') {
            otops.style.cssText = "visibility:hidden;height:0;";
        }
    }
}

//改变销售类型的背景
function chgSltyBg(e) {
    // 添加选中样式
    addClass(e.target.parentNode, 'f-selected');
    // 添加被选中属性
    e.target.setAttribute('checked', 'checked');
    // 删除其他按钮中的选中样式
    if (mstsltyLabels) {
        for (var i = 0; i < mstsltyLabels.length; i++) {
            if (!mstsltyLabels[i].control.checked) {
                removeClass(mstsltyLabels[i], 'f-selected');
                mstsltyLabels[i].control.removeAttribute('checked', 'checked');
            }
        }
    }
    if (e.target.id === 'u-ys') {
        djbl.style.display = 'block';
        addClass(djbl.children[1], 'f-selected');
        djbl.children[1].control.setAttribute('checked', 'checked');
    } else {
        djbl.style.display = 'none';
        removeClass(djbl.children[1], 'f-selected');
        djbl.children[1].firstChild.textContent = '5%';
        djbl.children[1].control.removeAttribute('checked');
        djbl.children[1].control.value = "5%";
        toggleDjblOps('hide');
    }
}

function showDjblops(e) {
    var ul = djbl.children[1].children[1];
    if (ul.style.visibility !== 'visible') {
        toggleDjblOps('show');
    } else {
        toggleDjblOps('hide');
    }
}

function toggleDjblOps(key) {
    console.log('toggleDjblOps', key);
    if (djops) {
        if (key === 'show') {
            console.log('...');
            djops.style.cssText = "visibility:visible;width:405px;";
        } else if (key === 'hide') {
            djops.style.cssText = "visibility:hidden;width:0;";
        }
    }
}


//订金支付比例列表选中
function chgdjOt(e) {
    console.log('chgdjOt', e.target.parentNode.parentNode.children[0]);
    //阻止事件关联行为 如不阻止，会触发兄弟元素input的bgClick事件（本事件操作到了input）
    e.preventDefault();
    //修改label的第一个节点内容
    e.target.parentNode.parentNode.firstChild.textContent = e.target.textContent;
    // 修改input的value值
    e.target.parentNode.parentNode.children[0].value = e.target.textContent;
    e.target.parentNode.style.cssText = 'visibility:hidden;width:0;';
}

function chgPutyBg(e) {
    // 添加选中样式
    addClass(e.target.parentNode, 'f-selected');
    // 添加被选中属性
    e.target.setAttribute('checked', 'checked');
    // 删除其他按钮中的选中样式
    if (mstputyLabels) {
        for (var i = 0; i < mstputyLabels.length; i++) {
            if (!mstputyLabels[i].control.checked) {
                removeClass(mstputyLabels[i], 'f-selected');
                mstputyLabels[i].control.removeAttribute('checked', 'checked');
            }
        }
    }
}