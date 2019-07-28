import isEmpty from './isEmpty'
import { toBigMoney } from './moneyFormat'
import { formatMoney } from './moneyFormat'
import { formatMillion } from './moneyFormat'
import { toDate } from './toDatetime'
import toDatetime from './toDatetime'
import localStorageUtil from './localStorageUtil'
import sessionStorageUtil from './sessionStorageUtil'
import getPlatformType from './getPlatformType'
import { areaDataHandler } from './handler'
import { Base64 } from './base64'
import string from './string'
import path from './path'

// 统一输出utils下的工具
export default {
    string,
    isEmpty,
    path,
    toBigMoney,
    formatMoney,
    toDatetime,
    localStorageUtil,
    sessionStorageUtil,
    getPlatformType,
    toDate,
    Base64
}