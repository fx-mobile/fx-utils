"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wxJsSdk = void 0;

var _async = require("@/api/async");

var JsSdk_OPTIONS = {
  isWxConfig: false,
  title: "",
  desc: "",
  imgUrl: "",
  wechatCode: "",
  link: window.location.href
};
var wxJsSdk = {
  /**
   * 微信JS-SDK初始化设置
   */
  initWxConfig: function initWxConfig(readyCallback) {
    var url = window.location.href.split("#")[0];
    console.log('url1', url);
    var param = {};
    param.url = url;
    return new Promise(function (resolve) {
      (0, _async.customAsync)({
        that: window,
        method: "getJsSdkConfig",
        paramObj: param,
        notShowLoading: true,
        callback: function callback(res) {
          var wxInfo = res.data;
          console.log("授权返回数据=====>");
          wx.config({
            beta: true,
            debug: false,
            ////生产环境需要关闭debug模式
            appId: wxInfo.appId,
            //appId通过微信服务号后台查看
            timestamp: wxInfo.timestamp,
            //生成签名的时间戳
            nonceStr: wxInfo.nonceStr,
            //生成签名的随机字符串
            signature: wxInfo.signature,
            //签名
            jsApiList: [//需要调用的JS接口列表
            "checkJsApi", "requestWxFacePictureVerify", "checkIsSupportFaceDetect", "scanQRCode"]
          });
          wx.ready(function () {
            JsSdk_OPTIONS.isWxConfig = true;

            if (typeof readyCallback == "function") {
              readyCallback();
            }

            resolve(); //初始化成功之后再回调分享信息设置
          });
        }
      });
    });
  },

  /**
   * 关闭窗口
   */
  closeWindow: function closeWindow(options) {
    wxJsSdk.initWxConfig().then(function () {
      wx.closeWindow();
    });
  },

  /**
   * 微信分享监听配置
   */
  toShare: function toShare(options) {
    if (options) {
      JsSdk_OPTIONS.title = options.title;
      JsSdk_OPTIONS.desc = options.desc;
      JsSdk_OPTIONS.imgUrl = options.imgUrl;
      JsSdk_OPTIONS.link = options.link;
    }
    /*   if (!window.isWeiXin()) {
             return
       }*/
    //分享给好友


    console.log("onMenuShareAppMessage"); //分享给好友

    wxJsSdk.initWxConfig().then(function () {
      console.log('JsSdk_OPTIONS', JsSdk_OPTIONS);
      wx.onMenuShareAppMessage({
        title: JsSdk_OPTIONS.title,
        // 分享标题
        desc: JsSdk_OPTIONS.desc,
        // 分享描述
        link: JsSdk_OPTIONS.link,
        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: JsSdk_OPTIONS.imgUrl,
        // 自定义图标
        type: "link",
        // 分享类型,music、video或link，不填默认为link
        dataUrl: "",
        // 如果type是music或video，则要提供数据链接，默认为空
        success: function success(res) {
          console.log("success", res); // 用户确认分享后执行的回调函数
        },
        cancel: function cancel() {
          console.log("cancel"); // 用户取消分享后执行的回调函数
        },
        fail: function fail(res) {
          console.log("分享失败", res);
        }
      }); //分享朋友圈

      console.log("onMenuShareTimeline");
      wx.onMenuShareTimeline({
        title: JsSdk_OPTIONS.title,
        link: JsSdk_OPTIONS.link,
        imgUrl: JsSdk_OPTIONS.imgUrl,
        success: function success() {
          options.onMenuShareTimeline(); // 用户确认分享后执行的回调函数
        },
        cancel: function cancel() {
          // 用户取消分享后执行的回调函数
          console.log("cancel");
        },
        fail: function fail(res) {
          console.log("fail", res);
          console.log("分享失败");
        }
      }); //分享给QQ好友

      console.log("onMenuShareQQ");
      wx.onMenuShareQQ({
        title: JsSdk_OPTIONS.title,
        // 分享标题
        desc: JsSdk_OPTIONS.desc,
        // 分享描述
        link: JsSdk_OPTIONS.link,
        // 分享链接
        imgUrl: JsSdk_OPTIONS.imgUrl,
        // 分享图标
        success: function success() {
          console.log("success", res); // 用户确认分享后执行的回调函数
        },
        cancel: function cancel() {
          console.log("cancel"); // 用户取消分享后执行的回调函数
        },
        fail: function fail(res) {
          console.log("分享失败", res);
        }
      }); //分享到QQ空间

      console.log("onMenuShareQZone");
      wx.onMenuShareQZone({
        title: JsSdk_OPTIONS.title,
        // 分享标题
        desc: JsSdk_OPTIONS.desc,
        // 分享描述
        link: JsSdk_OPTIONS.link,
        // 分享链接
        imgUrl: JsSdk_OPTIONS.imgUrl,
        // 分享图标
        success: function success() {// 用户确认分享后执行的回调函数
        },
        cancel: function cancel() {// 用户取消分享后执行的回调函数
        }
      });
    });
  },

  /**
   * 图片预览
   */
  previewImage: function previewImage(options) {
    /*  if (!window.isWeiXin()) {
          return
      }*/
    console.log("调用预览", options);
    wxJsSdk.initWxConfig().then(function () {
      wx.previewImage({
        current: options.current,
        // 当前显示图片的http链接
        urls: options.urls // 需要预览的图片http链接列表

      });
    });
  },

  /**
   * 获取地理位置
   */
  getLocation: function getLocation(callback) {
    wxJsSdk.initWxConfig().then(function () {
      wx.getLocation({
        type: 'wgs84',
        // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function success(res) {
          callback(res);
        }
      });
    });
  }
};
exports.wxJsSdk = wxJsSdk;