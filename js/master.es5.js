'use strict';
var master = {};
window.onload = function(ev) {
  init();
  master.pty = document.getElementById('m-mstpty');
  master.otops = document.getElementById('u-otops');
  master.mstslty = document.getElementById('m-mstslty');
  master.djops = document.getElementById('u-djops');
  master.djbl = document.getElementById('m-mstdjbl');
  master.mstputy = document.getElementById('m-mstputy');
  master.mstcity = document.getElementById('u-city'), master.ugoto = document.getElementById('u-goto');
  master.ugoto.onclick = function(ev) {
    location.href = '/home.html';
  };
  master.ptylabels = [];
  master.mstsltyLabels = [];
  master.mstputyLabels = [];
  master.citys = ['上海', '北京', '杭州'];
  for (var i = 0; i < master.pty.children.length; i++) {
    if (master.pty.children[i].tagName.toLowerCase() === 'label') {
      master.ptylabels.push(master.pty.children[i]);
      master.pty.children[i].control.onclick = chgPtyBg;
    }
  }
  for (var i = 0; i < master.otops.children.length; i++) {
    master.otops.children[i].onclick = chgOt;
  }
  for (var i = 0; i < master.mstslty.children.length; i++) {
    if (master.mstslty.children[i].tagName.toLowerCase() === 'label') {
      master.mstsltyLabels.push(master.mstslty.children[i]);
      master.mstslty.children[i].control.onclick = chgSltyBg;
    }
  }
  for (var i = 0; i < master.mstputy.children.length; i++) {
    if (master.mstputy.children[i].tagName.toLowerCase() === 'label') {
      master.mstputyLabels.push(master.mstputy.children[i]);
      master.mstputy.children[i].control.onclick = chgPutyBg;
    }
  }
  master.djbl.children[1].control.onclick = showDjblops;
  for (var i = 0; i < master.djops.children.length; i++) {
    master.djops.children[i].onclick = chgdjOt;
  }
  master.mstcity.oninput = inputCity;
  document.body.onclick = function(e) {
    if (e.target.nodeName === 'DIV') {
      toggleDjblOps('hide');
      toggleOps('hide');
    }
  };
  var mstuCity = document.getElementById('u-city'),
      cityErr = document.getElementById('f-cityError');
  mstuCity.onblur = function() {
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
function isGoto() {
  var pty,
      slty,
      puty,
      djbl,
      city;
  for (var i = 0; i < master.ptylabels.length; i++) {
    if (master.ptylabels[i].control.checked) {
      pty = master.ptylabels[i].control.value;
    }
  }
  for (var i$__1 = 0; i$__1 < master.mstsltyLabels.length; i$__1++) {
    if (master.mstsltyLabels[i$__1].control.checked) {
      slty = master.mstsltyLabels[i$__1].control.value;
    }
  }
  for (var i$__2 = 0; i$__2 < master.mstputyLabels.length; i$__2++) {
    if (master.mstputyLabels[i$__2].control.checked) {
      puty = master.mstputyLabels[i$__2].control.value;
    }
  }
  if (master.citys.indexOf(master.mstcity.value.trim()) !== -1) {
    city = master.mstcity.value.trim();
  }
  if (slty === "预售" && pty && slty && puty && city) {
    djbl = master.djbl.children[1].control.value;
    master.ugoto.removeAttribute('disabled');
  } else if (pty && slty && puty && city) {
    master.ugoto.removeAttribute('disabled');
  } else {
    master.ugoto.setAttribute('disabled', 'disabled');
  }
}
function chgPtyBg(e) {
  console.log('chgPtyBg');
  e.cancelBubble = true;
  e.stopPropagation();
  addClass(e.target.parentNode, 'f-selected');
  e.target.setAttribute('checked', 'checked');
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
  if (e.target.id === 'u-ot') {
    if (master.otops.style.visibility === 'visible') {
      console.log('u-out', e.target);
      toggleOps('hide');
    } else {
      console.log('u-outss', e.target, master.otops.style.visibility);
      toggleOps('show');
    }
  } else {
    isGoto();
  }
  toggleDjblOps('hide');
}
function chgOt(e) {
  console.log('chgOt');
  e.preventDefault();
  e.target.parentNode.parentNode.firstChild.textContent = e.target.textContent;
  e.target.parentNode.parentNode.children[0].value = e.target.textContent;
  toggleOps('hide');
  isGoto();
}
function toggleOps(key) {
  if (master.otops) {
    if (key === 'show') {
      master.otops.style.cssText = "visibility:visible;height:204px;";
    } else if (key === 'hide') {
      master.otops.style.cssText = "visibility:hidden;height:0;";
    }
  }
}
function chgSltyBg(e) {
  isGoto();
  e.cancelBubble = true;
  e.stopPropagation();
  addClass(e.target.parentNode, 'f-selected');
  e.target.setAttribute('checked', 'checked');
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
function toggleDjblOps(key) {
  if (master.djops) {
    if (key === 'show') {
      master.djops.style.cssText = "visibility:visible;width:auto;";
    } else if (key === 'hide') {
      master.djops.style.cssText = "visibility:hidden;width:0;";
    }
  }
}
function chgdjOt(e) {
  e.preventDefault();
  e.target.parentNode.parentNode.firstChild.textContent = e.target.textContent;
  e.target.parentNode.parentNode.children[0].value = e.target.textContent;
  e.target.parentNode.style.cssText = 'visibility:hidden;width:0;';
  isGoto();
}
function chgPutyBg(e) {
  e.cancelBubble = true;
  e.stopPropagation();
  addClass(e.target.parentNode, 'f-selected');
  e.target.setAttribute('checked', 'checked');
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
function inputCity(e) {
  isGoto();
}
