"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wxJsSdkHelper = require("./wxJsSdkHelper");

var _getPlatformType = _interopRequireDefault(require("./getPlatformType"));

var _default = function _default() {
  // Indicator.open({
  //     text: "加载扫一扫中...",
  //     spinnerType: "triple-bounce"
  // });
  // setTimeout(() => {
  //     Indicator.close();
  // }, 2000)
  function gotoFaceVerify() {
    //根据浏览器类型决定如何调取人脸识别
    if ((0, _getPlatformType.default)() == "03") {
      //微信渠道
      _wxJsSdkHelper.wxJsSdk.initWxConfig(scanQRCode);
    } else if ((0, _getPlatformType.default)() == "04") {
      //支付宝渠道
      ap.scan({
        type: 'qr'
      }, function (res) {
        console.log('res', res);

        if (res.error == 10) {// 错误码为10：用户取消操作
          // ...
        } else if (res.error == 11) {// 错误码为11：扫码失败
          // ....
        } else {
          console.log(res.code); // res.code为扫码返回的结果
        }
      });
    } else if ((0, _getPlatformType.default)() == "01" || (0, _getPlatformType.default)() == "02") {
      function success(d) {
        console.log('d', d);

        if (d.text && d.text.length > 0) {
          if (url.indexOf('//') > -1 || /[\w\d]+\.[\w\d]+\./.test(url)) {
            window.location.href = !~url.indexOf('//') ? '//' + url : url;
          } else {// this.$router.push({ path: url })
          }
        } //nav(d.text);


        setTimeout(function () {// Indicator.close();
        }, 0);
      }

      function fail() {
        setTimeout(function () {// Indicator.close();
        }, 0);
      }

      if (top && top.FXAPP) {
        top.FXAPP.postMessageToApp('scanQRCode', {}, success, fail);
      }
    } else {
      console.log("请在微信、支付宝或者app上打开");
      setTimeout(function () {// Indicator.close();
      }, 0);
    }
  }

  var scanQRCode = function scanQRCode() {
    console.log('scanQRCode');
    wx.scanQRCode({
      needResult: 0,
      // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"],
      // 可以指定扫二维码还是一维码，默认二者都有
      success: function success(res) {
        console.log('res'.res);
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      }
    });
    setTimeout(function () {// Indicator.close();
    }, 0);
  };

  gotoFaceVerify();
};

exports.default = _default;