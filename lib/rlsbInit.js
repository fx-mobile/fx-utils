"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wxJsSdkHelper = require("./wxJsSdkHelper");

var _getPlatformType = _interopRequireDefault(require("./getPlatformType"));

var _vue = _interopRequireDefault(require("vue"));

var _default = function _default(option, self) {
  console.log('option', option); // Indicator.open({
  //     text: "加载人脸识别中...",
  //     spinnerType: "triple-bounce"
  // });
  // setTimeout(() => {
  //     Indicator.close();
  // }, 4000)

  function successCallback(res) {
    if (option.action == 'login' || option.action == 'smrz') {
      if (option.pcLoginCallback) {
        option.pcLoginCallback(res);
      } else {}
    } else {
      if (option.callback) {
        option.djCallback(res);
      }

      console.log("实名注册成功！");
    }
  }

  function errorCallback(res) {
    if (res.errorcode == 1024) {} else {}
  }

  function gotoFaceVerify() {
    //根据浏览器类型决定如何调取人脸识别
    if ((0, _getPlatformType.default)() == "03") {
      //微信渠道
      _wxJsSdkHelper.wxJsSdk.initWxConfig(checkFPVI);
    } else if ((0, _getPlatformType.default)() == "04") {//支付宝渠道
    } else if ((0, _getPlatformType.default)() == "01" || (0, _getPlatformType.default)() == "02") {
      checkAppSmrzResult();
    } else {
      console.log("请在微信、支付宝或者app上打开");
      setTimeout(function () {
        console.log('error');
      }, 0);
    }
  }

  var checkFPVI = function checkFPVI() {
    var that = this;
    console.log('checkFPVI');
    wx.invoke("checkIsSupportFaceDetect", {}, function (res) {
      console.log(res.err_code);
      console.log(res.err_msg);

      if (res.err_code == 0) {
        //发起微信人脸识别
        wx.invoke("requestWxFacePictureVerify", {
          check_alive_type: "1",
          request_verify_pre_info: '{"name": "' + option.certName + '", "id_card_number": "' + option.certNo + '"}'
        }, function (res) {
          console.log(res.err_code);
          console.log(res.err_msg);

          if (res.err_code == 0) {
            try {
              var verify_result = res.verify_result;

              if (verify_result) {
                checkVerifyResult(verify_result);
              }
            } catch (e) {
              console.log("微信实名异常");
            }
          } else {// Toast(res.err_msg);
          }
        });
      } else {
        // Indicator.close();
        console.log("发起人脸识别失败！" + res.err_msg);
      }
    });
  };

  var checkVerifyResult = function checkVerifyResult(verifyResult) {
    var param = {
      certName: option.certName,
      certNo: option.certNo,
      phoneNum: option.phoneNum,
      verifyResult: verifyResult,
      action: option.action,
      xb: option.xb,
      zjyxqz: option.zjyxqz,
      zjdz: option.zjdz,
      yzm: option.yzm
    };

    if (option.certType) {
      param.certType = option.certType;
    }

    if (option.regionCode) {
      param.regionCode = option.regionCode;
    }
  };

  var checkAppSmrzResult = function checkAppSmrzResult() {
    function success(d) {
      if (d.flag == 'ok') {
        console.log('rlsb-data', d);
        var params = {
          phoneNum: option.phoneNum,
          yzm: option.yzm,
          certNo: option.certNo,
          certName: option.certName,
          xb: option.xb,
          zjyxqz: option.zjyxqz,
          zjdz: option.zjdz,
          key: d.key,
          faceImgBase64: d.data,
          action: option.action
        };

        if (option.certType) {
          params.certType = option.certType;
        }

        if (option.regionCode) {
          params.regionCode = option.regionCode;
        }
      } else {
        console.log('扫描姿势不正确，请重新扫描');
      }
    }

    function fail() {
      setTimeout(function () {
        console.log('error');
      }, 0);
    }

    if (top && top.FXAPP) {
      top.FXAPP.postMessageToApp('startAuth', {
        xm: option.certName,
        zjhm: option.certNo
      }, success, fail);
    }
  };

  gotoFaceVerify();
};

exports.default = _default;