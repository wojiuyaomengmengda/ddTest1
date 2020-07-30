// 修改：将canIUse放在数据内部，提高可读性，并且items中的每一项加上hidden属性
// 如果当前环境有这个API，则正常返回，否则隐藏（items里判断如果hidden代表隐藏）
function canIUse(api) {
  if (dd.canIUse(api.api)) {
    return api;
  } else {
    api.entitle = '当前设备不支持!';
    api.hidden = true;

    return api;
  }
}

Page({
  data: {},
});
