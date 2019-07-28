"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.toDate = exports.default = void 0;

/**
 * 时间格式化
 *
 * @param {Date} data
 */

/**
 * 时间格式化
 *
 * @param {Date} data
 */
var _default = function _default(data) {
  var now = new Date(data);
  var year = padZero(now.getFullYear());
  var month = padZero(now.getMonth() + 1);
  var date = padZero(now.getDate());
  var hour = padZero(now.getHours());
  var minute = padZero(now.getMinutes());
  var second = padZero(now.getSeconds());
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
};

exports.default = _default;

var toDate = function toDate(data) {
  data = data.replace(/\-/g, "/");
  var now = new Date(data);
  var year = padZero(now.getFullYear());
  var month = padZero(now.getMonth() + 1);
  var date = padZero(now.getDate());
  return year + '-' + month + '-' + date;
};

exports.toDate = toDate;

var padZero = function padZero(val) {
  return Number(val) < 10 ? '0' + Number(val) : Number(val);
};

function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (var k in o) {
    var str = o[k] + '';

    if (new RegExp("(".concat(k, ")")).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}