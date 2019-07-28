"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blurAdjust = exports.getdata = exports.geneUUID = exports.deleteUrlParam = exports.deepCopy = exports.realLength = exports.areaDataHandler = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var areaDataHandler = function areaDataHandler(res) {
  var options = res.map(function (item) {
    var option = {
      value: item.areaCode,
      label: item.areaName,
      children: []
    };

    if (item.subArea.length > 0) {
      option.children = item.subArea.map(function (_item) {
        if (_item.subArea.length > 0) {
          var _o = {
            value: _item.areaCode,
            label: _item.areaName,
            children: []
          };
          _o.children = _item.subArea.map(function (_s) {
            return {
              value: _s.areaCode,
              label: _s.areaName
            };
          });
          return _o;
        } else {
          return {
            value: _item.areaCode,
            label: _item.areaName
          };
        }
      });
    } else {
      option.children.push({
        value: '',
        label: '全部'
      });
    }

    return option;
  });
  return options;
};
/**
 * 获取字符串实际长度（一个汉字等于两个字符长度）
 *
 * import util from "@/utils/realLength"
 *
 *
 * let str = "我是test"
 * let length = realLength(str)
 * console.log(length) // 8
 *
 *
 * @param {String} str
 */


exports.areaDataHandler = areaDataHandler;

var realLength = function realLength(str) {
  if (str) {
    return str.replace(/[^\x00-\xff]/g, "xx").length;
  } else {
    return 0;
  }
};

exports.realLength = realLength;

var deepCopy = function deepCopy(obj) {
  //对象深复制
  var newObj = obj.constructor === Array ? [] : {};
  newObj.constructor = obj.constructor;

  if ((0, _typeof2.default)(obj) !== "object") {
    return obj;
  } else if (window.JSON) {
    //若需要考虑特殊的数据类型，如正则，函数等，需把这个else if去掉即可
    newObj = JSON.parse(JSON.stringify(obj));
  } else {
    for (var prop in obj) {
      if (obj[prop].constructor === RegExp || obj[prop].constructor === Date) {
        newObj[prop] = obj[prop];
      } else if ((0, _typeof2.default)(obj[prop]) === 'object') {
        //递归
        newObj[prop] = deepCopy(obj[prop]);
      } else {
        newObj[prop] = obj[prop];
      }
    }
  }

  return newObj;
};
/**
 * 删除URL上的指定参数
 * @param {*} url
 * @param {*} paramName
 */


exports.deepCopy = deepCopy;

var deleteUrlParam = function deleteUrlParam(url, paramName) {
  //处理url 兼容 http://XXX/***.html#page1模式的url的处理
  var url_prefix = "";
  var uArr = url.split('#');

  if (uArr.length > 1 && uArr[1].length > 1) {
    url_prefix = uArr[0] + "#";
    url = url.substr(url.indexOf('#') + 1);
  }

  var str = "";
  if (url.indexOf('?') != -1) str = url.substr(url.indexOf('?') + 1);else return url_prefix + url;
  var arr = "";
  var returnurl = "";

  if (str.indexOf('&') != -1) {
    arr = str.split('&');

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].split('=')[0] != paramName) {
        returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
      }
    }

    return url_prefix + url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
  } else {
    arr = str.split('=');
    if (arr[0] == paramName) return url_prefix + url.substr(0, url.indexOf('?'));else return url_prefix + url;
  }
};
/**
 * 生成uuid
 * @param len 长度
 * @param radix 基数
 * @returns {string}
 */


exports.deleteUrlParam = deleteUrlParam;

var geneUUID = function geneUUID(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
      i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    // rfc4122, version 4 form
    var r; // rfc4122 requires these characters

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4'; // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }

  return uuid.join('');
};
/**
 * 
 * @param { 遍历的对象 } list 
 * @param { 传入的code索引名称，是name或者是code } key 
 * @param { 返回传入的参数，根据这个参数返回key的值 } code 
 * @return getData('zw','code','02')  return '财务负责人'
 * 
 */


exports.geneUUID = geneUUID;

var getdata = function getdata(list, key, code) {
  if (list) {
    var tempobj = list;

    if (key == 'name') {
      for (var i = 0; i < tempobj.length; i++) {
        if (tempobj[i].name == code) {
          return tempobj[i].code;
        }
      }
    } else if (key == 'code') {
      for (var i = 0; i < tempobj.length; i++) {
        if (tempobj[i].code == code) {
          return tempobj[i].name;
        }
      }
    } else {
      return "";
    }
  } else {
    return "";
  }
};

exports.getdata = getdata;

var blurAdjust = function blurAdjust() {
  setTimeout(function () {
    // alert("1231321233")
    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
      return;
    }

    var result = 'pc';

    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      //判断iPhone|iPad|iPod|iOS
      result = 'ios';
    } else if (/(Android)/i.test(navigator.userAgent)) {
      //判断Android
      result = 'android';
    }

    if (result = 'ios') {
      document.activeElement.scrollIntoViewIfNeeded(true);
    }
  }, 100);
};

exports.blurAdjust = blurAdjust;