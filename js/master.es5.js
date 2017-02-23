'use strict';
var pty,
    otops,
    ptylabels = [],
    mstslty,
    mstsltyLabels = [],
    mstputy,
    mstputyLabels = [],
    djbl,
    djops;
window.onload = function(ev) {
  init();
  pty = document.getElementById('m-mstpty');
  otops = document.getElementById('u-otops');
  mstslty = document.getElementById('m-mstslty');
  djops = document.getElementById('u-djops');
  djbl = document.getElementById('m-mstdjbl');
  mstputy = document.getElementById('m-mstputy');
  for (var i = 0; i < pty.children.length; i++) {
    if (pty.children[i].tagName.toLowerCase() === 'label') {
      ptylabels.push(pty.children[i]);
      pty.children[i].control.onclick = chgPtyBg;
    }
  }
  for (var i = 0; i < otops.children.length; i++) {
    otops.children[i].onclick = chgOt;
  }
  for (var i = 0; i < mstslty.children.length; i++) {
    if (mstslty.children[i].tagName.toLowerCase() === 'label') {
      mstsltyLabels.push(mstslty.children[i]);
      mstslty.children[i].control.onclick = chgSltyBg;
    }
  }
  for (var i = 0; i < mstputy.children.length; i++) {
    if (mstputy.children[i].tagName.toLowerCase() === 'label') {
      mstputyLabels.push(mstputy.children[i]);
      mstputy.children[i].control.onclick = chgPutyBg;
    }
  }
  djbl.children[1].control.onclick = showDjblops;
  for (var i = 0; i < djops.children.length; i++) {
    djops.children[i].onclick = chgdjOt;
  }
};
function chgPtyBg(e) {
  addClass(e.target.parentNode, 'f-selected');
  e.target.setAttribute('checked', 'checked');
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
  if (e.target.id === 'u-ot') {
    if (otops.style.visibility === 'visible') {
      toggleOps('hide');
    } else {
      toggleOps('show');
    }
  }
}
function chgOt(e) {
  console.log(e);
  e.preventDefault();
  e.target.parentNode.parentNode.firstChild.textContent = e.target.textContent;
  e.target.parentNode.parentNode.children[0].value = e.target.textContent;
  toggleOps('hide');
}
function toggleOps(key) {
  if (otops) {
    if (key === 'show') {
      otops.style.cssText = "visibility:visible;height:204px;";
    } else if (key === 'hide') {
      otops.style.cssText = "visibility:hidden;height:0;";
    }
  }
}
function chgSltyBg(e) {
  addClass(e.target.parentNode, 'f-selected');
  e.target.setAttribute('checked', 'checked');
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
  }
}
function showDjblops(e) {
  var ul = djbl.children[1].children[1];
  if (ul.style.visibility !== 'visible') {
    ul.style.cssText = "visibility:visible;width:405px;";
  } else {
    ul.style.cssText = 'visibility:hidden;width:0;';
  }
}
function chgdjOt(e) {
  console.log('chgdjOt', e.target.parentNode.parentNode.children[0]);
  e.preventDefault();
  e.target.parentNode.parentNode.firstChild.textContent = e.target.textContent;
  e.target.parentNode.parentNode.children[0].value = e.target.textContent;
  e.target.parentNode.style.cssText = 'visibility:hidden;width:0;';
}
function chgPutyBg(e) {
  addClass(e.target.parentNode, 'f-selected');
  e.target.setAttribute('checked', 'checked');
  if (mstputyLabels) {
    for (var i = 0; i < mstputyLabels.length; i++) {
      if (!mstputyLabels[i].control.checked) {
        removeClass(mstputyLabels[i], 'f-selected');
        mstputyLabels[i].control.removeAttribute('checked', 'checked');
      }
    }
  }
}
