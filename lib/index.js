"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("./isEmpty"));

var _moneyFormat = require("./moneyFormat");

var _toDatetime = _interopRequireWildcard(require("./toDatetime"));

var _localStorageUtil = _interopRequireDefault(require("./localStorageUtil"));

var _sessionStorageUtil = _interopRequireDefault(require("./sessionStorageUtil"));

var _getPlatformType = _interopRequireDefault(require("./getPlatformType"));

var _handler = require("./handler");

var _base = require("./base64");

var _string = _interopRequireDefault(require("./string"));

var _path = _interopRequireDefault(require("./path"));

// 统一输出utils下的工具
var _default = {
  string: _string.default,
  isEmpty: _isEmpty.default,
  path: _path.default,
  toBigMoney: _moneyFormat.toBigMoney,
  formatMoney: _moneyFormat.formatMoney,
  toDatetime: _toDatetime.default,
  localStorageUtil: _localStorageUtil.default,
  sessionStorageUtil: _sessionStorageUtil.default,
  getPlatformType: _getPlatformType.default,
  toDate: _toDatetime.toDate,
  Base64: _base.Base64
};
exports.default = _default;