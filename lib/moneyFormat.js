"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBigMoney = toBigMoney;
exports.fmoney = exports.csMoenyFormat = exports.formatMillion = exports.rmbFormat = exports.formatMoney = void 0;

/*
 *  import {formatMoney} from '@/utils/moneyFormat';
 *
 */
var formatMoney = function formatMoney(amount) {
  var amount = Number(amount);
  var label = '';

  if (amount < 0) {
    amount = -amount;
    label = '-';
  }

  ;
  var MILLION = Number(10000.0);
  var MILLIONS = Number(1000000.0);
  var BILLION = Number(100000000.0);
  var MILLION_UNIT = "万";
  var BILLION_UNIT = "亿";
  var moneyObj = {
    amount: 0,
    //-1000.00
    unit: '',
    //亿
    result: '' //-10,00.00亿
    //金额大于1百万小于1亿

  };

  if (amount > MILLIONS && amount < BILLION) {
    moneyObj.amount = parseFloat(label + Math.round(amount * 100 / MILLION) / 100).toFixed(2);
    moneyObj.unit = MILLION_UNIT;
    moneyObj.result = toMoney(label + Math.round(amount * 100 / MILLION) / 100) + MILLION_UNIT;
  } else if (amount >= BILLION) {
    //金额大于1亿
    moneyObj.amount = parseFloat(label + Math.round(amount * 100 / BILLION) / 100).toFixed(2);
    moneyObj.unit = BILLION_UNIT;
    moneyObj.result = toMoney(label + Math.round(amount * 100 / BILLION) / 100) + BILLION_UNIT;
  } else {
    moneyObj.amount = parseFloat(label + amount).toFixed(2);
    moneyObj.result = toMoney(label + amount);
  }

  return moneyObj;
}; // direct output


exports.formatMoney = formatMoney;

function toBigMoney(price) {
  var moneyObj = formatMoney(price);
  return parseFloat(moneyObj.amount).toFixed(2) + moneyObj.unit;
} //含有 ¥ 的result  又改了。。mdzz


var rmbFormat = function rmbFormat(amount) {
  var amount = Number(amount);
  var label = '';

  if (amount < 0) {
    amount = -amount;
    label = '-';
  }

  ;
  var MILLION = Number(10000.0);
  var MILLIONS = Number(1000000.0);
  var BILLION = Number(100000000.0);
  var MILLION_UNIT = "万";
  var BILLION_UNIT = "亿";
  var moneyObj = {
    // amount: 0, //1,000.00 绝对值
    // unit: '', //亿 单位
    // label:'', //正负数符号
    result: '' //- ¥10,00.00亿  含有 ¥ 符号
    //金额大于1百万小于1亿

  };

  if (amount > MILLIONS && amount < BILLION) {
    moneyObj.result = '¥' + label + toMoney(Math.round(amount * 100 / MILLION) / 100) + MILLION_UNIT;
  } else if (amount >= BILLION) {
    //金额大于1亿
    moneyObj.result = '¥' + label + toMoney(Math.round(amount * 100 / BILLION) / 100) + BILLION_UNIT;
  } else {
    moneyObj.result = '¥' + label + toMoney(amount);
  }

  return moneyObj.result;
};

exports.rmbFormat = rmbFormat;

var formatMillion = function formatMillion(num) {
  if (num) {
    var temp = Number(num);

    if (num < 1000) {
      return Math.round(num / 100) / 100 + 'W';
    } else if (num >= 1000) {
      return Math.round(num / 1000) / 10 + 'W';
    }
  }
};

exports.formatMillion = formatMillion;

var csMoenyFormat = function csMoenyFormat(money, type) {
  var pM = Math.ceil(money);
  var m = pM.toString();
  var l = m.length;
  var h = parseInt(m[0]) * Math.pow(10, l - 1);

  if (pM == 0 || l > 1 && pM % h == 0) {
    return pM;
  }

  if (type == 'ceil') {
    var o = l > 1 ? parseInt(m[0]) + 1 : 10;
    return o * Math.pow(10, l - 1);
  } else if (type == 'floor') {
    var _o = l > 1 ? parseInt(m[0]) : 0;

    return _o * Math.pow(10, l - 1);
  }
}; //处理输入金额函数


exports.csMoenyFormat = csMoenyFormat;

var fmoney = function fmoney(s, n, e) {
  if (s === undefined) {
    return '0.00';
  }

  var ss = s; //赋值两位数

  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d.-]/g, "")).toFixed(n) + ""; //更改这里n数也可确定要保留的小数位

  var l = s.split(".")[0].split("").reverse();
  var r = s.split(".")[1] || '00';
  var t = "";

  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
  }

  if (e == "") {
    //时间格式化
    if (l.length == 2) {
      return ss;
    } else {
      //
      return r.substring(0, 2) + t.split("").reverse().join(""); //保留2位小数  如果要改动 把substring 最后一位数改动就可
    }
  } else {
    //金额格式化
    return t.split("").reverse().join("") + e + r.substring(0, 2); //保留2位小数  如果要改动 把substring 最后一位数改动就可
  }
};

exports.fmoney = fmoney;