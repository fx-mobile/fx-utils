"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 获取平台类型(01android，02ios，03微信,04支付宝)
 */
var _default = function _default() {
  var browser = navigator.userAgent.toLowerCase();
  var deviceIsWx = browser.match(/MicroMessenger/i) == "micromessenger";
  var deviceIsAlipay = browser.match(/Alipay/i) == "alipay";
  var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
  var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
  var deviceIsIOS = /iPhone/.test(navigator.userAgent) && !deviceIsWindowsPhone;

  if (deviceIsWx) {
    return "03";
  } else if (deviceIsAlipay) {
    return "04";
  } else if (deviceIsAndroid) {
    return "01";
  } else if (deviceIsIOS) {
    return "02";
  }
};

exports.default = _default;