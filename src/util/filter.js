/* eslint-disable */
// 补零
export function zeroizeOfTen(n) {
  return n < 10 ? ('0' + n) : n;
}
// yyyy-MM-dd
export function formateDate(time) {
  let result = '';
  if (time) {
    let date = new Date(time);

    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    m = zeroizeOfTen(m);
    d = zeroizeOfTen(d);

    result = y + '-' + m + '-' + d;
  }
  return result;
}
// code转中文名
export function code2value(code, list) {
  let val = Number(code);
  if(list){
    for (let i = 0; i < list.length; i++) {
      let ele = list[i];
      if (Number(ele.code) === val) return ele.zhName;
    }
  }
  return val;
}
// 中文转code
export function value2code(name, list) {
  let code = name;
  if(list) {
    for (let i = 0; i < list.length; i++) {
      let ele = list[i];
      if (ele.zhName === name) return ele.code;
    }
  }
  return code;
}
// 保留两位小数
export function fixed2(number) {
  let remainder = number % 1;
  if (remainder > 0) number = number.toFixed(2);
  return number;
}
// 是否是数字
export function isNumber(obj) {
  let isn = Number(obj);
  return !isNaN(isn);
}
