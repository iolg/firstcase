'use strict';

var master = {};
window.onload = function (ev) {
    init();
    master.pty = document.getElementById('m-mstpty');
    master.otops = document.getElementById('u-otops');
    master.mstslty = document.getElementById('m-mstslty');
    master.djops = document.getElementById('u-djops');
    master.djbl = document.getElementById('m-mstdjbl');
    master.mstputy = document.getElementById('m-mstputy');
    master.mstcity = document.getElementById('u-city'),
    master.ugoto = document.getElementById('u-goto');
    master.ugoto.onclick = function (ev) {
      location.href='/home.html';
    };
    master.ptylabels = [];
    master.mstsltyLabels = [];
    master.mstputyLabels =[];
    master.citys = ['上海','北京','杭州'];
    //添加产品类型的点击事件
    for (var i = 0; i < master.pty.children.length; i++) {
        if (master.pty.children[i].tagName.toLowerCase() === 'label') {
            master.ptylabels.push(master.pty.children[i]);
            master.pty.children[i].control.onclick = chgPtyBg;
        }
    }
    //添加产品类型其他类型的点击事件
    for (var i = 0; i < master.otops.children.length; i++) {
        master.otops.children[i].onclick = chgOt;
    }

    //    添加销售类型点击事件
    for (var i = 0; i < master.mstslty.children.length; i++) {
        if (master.mstslty.children[i].tagName.toLowerCase() === 'label') {
            master.mstsltyLabels.push(master.mstslty.children[i]);
            master.mstslty.children[i].control.onclick = chgSltyBg;
        }
    }
    //    添加发布类型点击事件
    for (var i = 0; i < master.mstputy.children.length; i++) {
        if (master.mstputy.children[i].tagName.toLowerCase() === 'label') {
            master.mstputyLabels.push(master.mstputy.children[i]);
            master.mstputy.children[i].control.onclick = chgPutyBg;
        }
    }
    //  添加订金支付比例点击事件
    master.djbl.children[1].control.onclick = showDjblops;
    //添加产品类型其他类型的点击事件
    for (var i = 0; i < master.djops.children.length; i++) {
        master.djops.children[i].onclick = chgdjOt;
    }

    master.mstcity.oninput = inputCity;

    //点击其他区域隐藏列表
    document.body.onclick = function(e){
        // label通过 for关联input，点击label的事件流为 label -> body -> input -> label ->body
        if(e.target.nodeName === 'DIV'){
            toggleDjblOps('hide');
            toggleOps('hide');
        }
        // console.log('...');
    };

    var mstuCity = document.getElementById('u-city'),
        cityErr = document.getElementById('f-cityError');
    mstuCity.onblur = function () {
        var cityName = mstuCity.value.trim() || "";
        if (!cityName || master.citys.indexOf(cityName) === -1) {
            mstuCity.parentNode.style.border = "2px solid #f00";
            cityErr.style.display = "block";
        } else {
            mstuCity.parentNode.style.border = "";
            cityErr.style.display = "none";
            localStorage.setItem('mstCity', cityName);
        }
    };

};

//判断所有项是否有值
function isGoto(){
    let pty,slty,puty,djbl,city;
    for(let i=0; i<master.ptylabels.length; i++){
        if(master.ptylabels[i].control.checked){
            pty = master.ptylabels[i].control.value;
        }
    }
    for(let i=0; i<master.mstsltyLabels.length; i++){
        if(master.mstsltyLabels[i].control.checked){
            slty = master.mstsltyLabels[i].control.value;
        }
    }
    for(let i=0; i<master.mstputyLabels.length; i++){
        if(master.mstputyLabels[i].control.checked){
            puty = master.mstputyLabels[i].control.value;
        }
    }
    if(master.citys.indexOf(master.mstcity.value.trim()) !== -1){
        city = master.mstcity.value.trim();
    }
    if(slty === "预售" && pty && slty && puty && city){
        djbl = master.djbl.children[1].control.value;
        master.ugoto.removeAttribute('disabled');
    } else if(pty&&slty&&puty&&city){
        master.ugoto.removeAttribute('disabled');
    } else {
        master.ugoto.setAttribute('disabled');
    }
}


//改变产品类型的背景
function chgPtyBg(e) {
    console.log('chgPtyBg');
    e.cancelBubble = true;
    e.stopPropagation();
    // 添加选中样式
    addClass(e.target.parentNode, 'f-selected');
    // 添加被选中属性
    e.target.setAttribute('checked', 'checked');
    // 删除其他按钮中的选中样式
    if (master.ptylabels) {
        for (var i = 0; i < master.ptylabels.length; i++) {
            if (!master.ptylabels[i].control.checked) {
                removeClass(master.ptylabels[i], 'f-selected');
                master.ptylabels[i].control.removeAttribute('checked', 'checked');
                if (i === master.ptylabels.length - 1) {
                    toggleOps('hide');
                    master.ptylabels[i].control.value = "其他";
                    master.ptylabels[i].firstChild.textContent = "其他";
                }
            }
        }
    }
    // 判断点中的是否是最后一个label
    if (e.target.id === 'u-ot') {
        if (master.otops.style.visibility === 'visible') {
            console.log('u-out',e.target);
            toggleOps('hide');
        } else {
            console.log('u-outss',e.target,master.otops.style.visibility);
            toggleOps('show');
        }
    } else{
        isGoto();
    }
    toggleDjblOps('hide');

}

//产品类型其他列表选中
function chgOt(e) {
    console.log('chgOt');
    //阻止事件关联行为 如不阻止，会触发兄弟元素input的bgClick事件（本事件操作到了input）
    e.preventDefault();
    //修改label的第一个节点内容
    e.target.parentNode.parentNode.firstChild.textContent = e.target.textContent;
    // 修改input的value值
    e.target.parentNode.parentNode.children[0].value = e.target.textContent;
    toggleOps('hide');
    isGoto();
}


//显示/关闭产品类型的其他项
function toggleOps(key) {
    if (master.otops) {
        if (key === 'show') {
            master.otops.style.cssText = "visibility:visible;height:204px;";
        } else if (key === 'hide') {
            master.otops.style.cssText = "visibility:hidden;height:0;";
        }
    }
}

//改变销售类型的背景
function chgSltyBg(e) {
    isGoto();
    e.cancelBubble = true;
    e.stopPropagation();
    // 添加选中样式
    addClass(e.target.parentNode, 'f-selected');
    // 添加被选中属性
    e.target.setAttribute('checked', 'checked');
    // 删除其他按钮中的选中样式
    if (master.mstsltyLabels) {
        for (var i = 0; i < master.mstsltyLabels.length; i++) {
            if (!master.mstsltyLabels[i].control.checked) {
                removeClass(master.mstsltyLabels[i], 'f-selected');
                master.mstsltyLabels[i].control.removeAttribute('checked', 'checked');
            }
        }
    }
    if (e.target.id === 'u-ys') {
        master.djbl.style.display = 'block';
        addClass(master.djbl.children[1], 'f-selected');
        master.djbl.children[1].control.setAttribute('checked', 'checked');
    } else {
        master.djbl.style.display = 'none';
        removeClass(master.djbl.children[1], 'f-selected');
        master.djbl.children[1].firstChild.textContent = '5%';
        master.djbl.children[1].control.removeAttribute('checked');
        master.djbl.children[1].control.value = "5%";
        toggleDjblOps('hide');
    }
    toggleOps('hide');
}

//显示订金支付比例
function showDjblops(e) {
    e.cancelBubble = true;
    e.stopPropagation();
    var ul = master.djbl.children[1].children[1];
    if (ul.style.visibility !== 'visible') {
        toggleDjblOps('show');
    } else {
        toggleDjblOps('hide');
    }
    toggleOps('hide');
}

//订金比例列表开关
function toggleDjblOps(key) {
    if (master.djops) {
        if (key === 'show') {
            master.djops.style.cssText = "visibility:visible;width:auto;";
        } else if (key === 'hide') {
            master.djops.style.cssText = "visibility:hidden;width:0;";
        }
    }
}


//订金支付比例列表选中
function chgdjOt(e) {
    //阻止事件关联行为 如不阻止，会触发兄弟元素input的bgClick事件（本事件操作到了input）
    e.preventDefault();
    //修改label的第一个节点内容
    e.target.parentNode.parentNode.firstChild.textContent = e.target.textContent;
    // 修改input的value值
    e.target.parentNode.parentNode.children[0].value = e.target.textContent;
    e.target.parentNode.style.cssText = 'visibility:hidden;width:0;';
    isGoto();
}

//改变发布类型背景
function chgPutyBg(e) {
    e.cancelBubble = true;
    e.stopPropagation();
    // 添加选中样式
    addClass(e.target.parentNode, 'f-selected');
    // 添加被选中属性
    e.target.setAttribute('checked', 'checked');
    // 删除其他按钮中的选中样式
    if (master.mstputyLabels) {
        for (var i = 0; i < master.mstputyLabels.length; i++) {
            if (!master.mstputyLabels[i].control.checked) {
                removeClass(master.mstputyLabels[i], 'f-selected');
                master.mstputyLabels[i].control.removeAttribute('checked', 'checked');
            }
        }
    }
    isGoto();
}

function inputCity(e){
    isGoto();
}

