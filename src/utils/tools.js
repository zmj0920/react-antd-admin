// import router from 'umi/router';
import {
  message
} from 'antd';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import copy from 'copy-to-clipboard';
import numeral from 'numeral';
import {
  isEqual as isEqualLodash,
  isFunction as isFunctionLodash,
  filter as filterLodash,
  sortBy as sortByLodash,
  findIndex as findIndexLodash,
  reverse as reverseLodash,
  replace as replaceLodash,
  trim as trimLodash,
  isEmpty as isEmptyLodash,
  isBoolean as isBooleanLodash,
  isUndefined as isUndefinedLodash,
  isDate as isDateLodash,
  isArray as isArrayLodash,
  remove as removeLodash,
} from 'lodash';

import {
  getConfigData
} from '../customConfig/config';

// import { logLevel } from './constants';

const storageKeyCollection = {
  metaData: 'metaData',
  token: 'token',
  areaFlag: 'areaFlag',
  city: 'city',
  currentOperator: 'currentOperator',
};

export function defaultBaseState() {
  return {
    dataLoading: false,
    processing: false,
    reloading: false,
    searching: false,
    refreshing: false,
    paging: false,
    firstLoadSuccess: false,
    loadSuccess: false,
    loadDataAfterMount: false,
    urlParams: null,
    externalData: null,
  };
}

export function defaultCoreState() {
  const data = {
    ...defaultBaseState(),
    ...{
      dataLoading: true
    }
  };

  return data;
}

export function defaultCommonState() {
  const data = {
    ...defaultCoreState(),
    ...{
      loadApiPath: '',
      pageName: '',
      metaData: null,
      metaExtra: null,
      metaListData: [],
      metaOriginalData: null,
    },
  };

  return data;
}

export function defaultListState() {
  const data = {
    ...defaultCommonState(),
    ...{
      loadDataAfterMount: true,
      dateRangeFieldName: '发生时间',
      tableScroll: {
        x: 1520
      },
      formValues: {},
      startTimeAlias: '',
      endTimeAlias: '',
      startTime: '',
      endTime: '',
      showSelect: false,
      selectedDataTableDataRows: [],
    },
  };

  return data;
}

export function defaultPageListState() {
  const data = {
    ...defaultCommonState(),
    ...{
      loadDataAfterMount: true,
      paramsKey: '',
      loadApiPath: '',
      dateRangeFieldName: '发生时间',
      tableScroll: {
        x: 1520
      },
      formValues: {},
      pageNo: 1,
      pageSize: 10,
      startTime: '',
      endTime: '',
      showSelect: false,
      selectedDataTableDataRows: [],
    },
  };

  return data;
}

export function defaultFormState() {
  const data = {
    ...defaultCommonState(),
    ...{
      loadDataAfterMount: true,
      errorFieldName: '',
      submitApiPath: ''
    },
  };

  return data;
}

export function getValue(obj) {
  return Object.keys(obj)
    .map(key => obj[key])
    .join(',');
}

/**
 * 复制到剪贴板
 * @param {*} text
 */
export function copyToClipboard(text) {
  copy(text);
  message.success(`已将 ${text} 复制到剪贴板！`);
}

/**
 * 复制到剪贴板
 * @param {*} text
 */
export function stringIsEmpty(text) {
  return isEmptyLodash((text || '').replace(' ', ''));
}

/**
 *替换指定字符串
 *
 * @export
 * @param {*} text
 * @param {*} replaceText
 * @param {*} beforeKeepNumber
 * @param {*} afterKeepNumber
 * @returns
 */
export function replaceTargetText(text, replaceText, beforeKeepNumber, afterKeepNumber) {
  let result = text;

  const textLength = (text || '').length;
  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (
      beforeKeepNumber >= textLength ||
      afterKeepNumber >= textLength ||
      (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength
    ) {
      result = text;
    } else {
      const beforeKeep = text.substr(0, beforeKeepNumber);
      const afterKeep = text.substr(textLength - afterKeepNumber, afterKeepNumber);
      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || '';
}

export function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */
export function corsTarget() {
  const c = getConfigData();

  return checkDevelopment() ? c.corsTargetDevelopment : c.corsTargetProduction;
}

export function dingIdTarget() {
  const c = getConfigData();

  return checkDevelopment() ? c.dingIdDevelopment : c.dingIdProduction;
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordLog(record, level = logLevel.debug) {
  if (logShowInConsole()) {

    console.log({
      level,
      record
    });
  }
}

function logShowInConsole() {
  const {
    NODE_ENV
  } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return false;
}

/**
 * 获取Guid
 *
 * @export
 * @param {*} v
 * @returns
 */
export function getGuid() {
  return uuidv4();
}

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isInvalid(v) {
  return typeof v === 'undefined';
}

export function toDatetime(v) {
  if ((v || null) == null) {
    return null;
  }

  const i = v.indexOf('T');

  if (i < 0) {

    const value = v.replace(/\-/g, '/');
    const result = new Date(value);

    return result;
  }

  return new Date(v);
}

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function formatDatetime(v, formatString = 'YYYY-MM-DD', defaultValue = '') {
  return (v || '') === '' ?
    defaultValue :
    moment(typeof v === 'object' ? v : new Date(v.replace('/', '-'))).format(formatString);
}

export function numeralFormat(v, formatString) {
  return numeral(v).format(formatString);
}

/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function stringToMoment(v) {
  if (moment.isMoment(v)) return v;

  const d = (v || '').toString();

  if (stringIsNullOrWhiteSpace(d)) {
    return null;
  }

  return moment(new Date(d.replace('/', '-')));
}

/**
 * 当前Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function getMomentNow() {
  return moment();
}

/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function dateToMoment(v) {
  return moment(v);
}

/**
 * 判断是否是时间字符串
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isDatetime(v) {
  const date = `${typeof v === 'undefined' ? null : v}`;
  const result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null) {
    return false;
  }

  const d = new Date(result[1], result[3] - 1, result[4]);
  return (
    d.getFullYear() === parseInt(result[1], 10) &&
    d.getMonth() + 1 === parseInt(result[3], 10) &&
    d.getDate() === parseInt(result[4], 10)
  );
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isNumber(v) {
  const str = `${typeof v === 'undefined' ? null : v}`;

  if (str === '') {
    return false;
  }

  const regular = /^[0-9]*$/;
  const re = new RegExp(regular);
  return re.test(str);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toNumber(v) {
  if (isNumber(v)) {
    return parseInt(v, 10);
  }

  return 0;
}

/**
 *
 *@param  val 值 len保留小数位数
 *
 */
export function roundToTarget(v, len) {
  const temp = 10 ** len;

  return Math.round(v * temp) / temp;
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isMoney(v) {
  const str = `${typeof v === 'undefined' ? null : v}`;

  if (str === '') {
    return false;
  }

  const regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  const re = new RegExp(regular);
  return re.test(str);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toMoney(v) {
  if (isMoney(v)) {
    return parseFloat(v, 10);
  }

  return 0;
}

/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatMoney(
  numberSource,
  placesSource = 2,
  symbolSource = '￥',
  thousandSource = ',',
  decimalSource = '.',
) {
  let number = numberSource || 0;
  // 保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数，否则默 认保留两位

  const placesSourceAbs = Math.abs(placesSource);

  const places = !isNaN(placesSourceAbs) ? placesSourceAbs : 2;
  // symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")
  const symbol = symbolSource !== undefined ? symbolSource : '￥';
  // thousand表示每几位用,隔开,是货币标识
  const thousand = thousandSource || ',';
  // decimal表示小数点
  const decimal = decimalSource || '.';
  // negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  // i表示处理过的纯数字
  const negative = number < 0 ? '-' : '';
  const i = `${parseInt((number = Math.abs(+number || 0).toFixed(places)), 10)}`;

  let j = i.length;

  j = j > 3 ? j % 3 : 0;

  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, `${symbolSource}1${thousand}`) +
    (places ?
      decimal +
      Math.abs(number - toNumber(i))
      .toFixed(places)
      .slice(2) :
      '')
  );
}

/**
 * 转换金额为人民币大写
 *
 * @export
 * @param {*} v
 * @returns
 */
export function formatMoneyToChinese(v) {
  let money = v;

  const cnNumber = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; // 汉字的数字
  const cnIntBasic = ['', '拾', '佰', '仟']; // 基本单位
  const cnIntUnits = ['', '万', '亿', '兆']; // 对应整数部分扩展单位
  const cnDecUnits = ['角', '分', '毫', '厘']; // 对应小数部分单位
  // var cnInteger = "整"; // 整数金额时后面跟的字符
  const cnIntLast = '元'; // 整型完以后的单位
  const maxNum = 999999999999999.9999; // 最大处理的数字

  let IntegerNum; // 金额整数部分
  let DecimalNum; // 金额小数部分
  let ChineseString = ''; // 输出的中文金额字符串
  let parts; // 分离金额后用的数组，预定义
  if (money === '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    return '超出最大处理数字';
  }
  if (money === 0) {
    ChineseString = cnNumber[0] + cnIntLast;

    return ChineseString;
  }
  money = money.toString(); // 转换为字符串
  if (money.indexOf('.') === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');

    [IntegerNum, DecimalNum] = parts;
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    let zeroCount = 0;
    const IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i += 1) {
      const n = IntegerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === '0') {
        zeroCount += 1;
      } else {
        if (zeroCount > 0) {
          ChineseString += cnNumber[0];
        }
        zeroCount = 0; // 归零
        ChineseString += cnNumber[parseInt(n, 10)] + cnIntBasic[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseString += cnIntUnits[q];
      }
    }
    ChineseString += cnIntLast;
    // 整型部分处理完毕
  }
  if (DecimalNum !== '') {
    // 小数部分
    const decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i += 1) {
      const n = DecimalNum.substr(i, 1);
      if (n !== '0') {
        ChineseString += cnNumber[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseString === '') {
    ChineseString += cnNumber[0] + cnIntLast;
  }

  return ChineseString;
}

function seededRandom(seed, min, max) {
  const maxValue = max || 1;
  const minValue = min || 0;
  const seedValue = (seed * 9301 + 49297) % 233280;
  const rnd = seedValue / 233280.0;
  return minValue + rnd * (maxValue - minValue);
}



/**
 * 封装表单项配置
 *
 * @export
 * @param {*} v
 * @param {*} justice
 * @param {*} defaultValue
 * @param {*} originalOption
 * @param {*} convertCallback
 */
export function refitFieldDecoratorOption(
  v,
  justice,
  defaultValue,
  originalOption,
  convertCallback,
) {
  const result = originalOption;
  const justiceV = typeof justice !== 'undefined' && justice !== null;
  const defaultV = typeof defaultValue === 'undefined' ? null : defaultValue;

  if (justiceV) {
    if (typeof convertValue === 'function') {
      result.initialValue = convertCallback(v) || defaultV;
    } else {
      result.initialValue = v || defaultV;
    }
  }
  return result;
}

/**
 * 封装公共数据
 *
 * @export 数据集合
 * @param {*} listData 源数据集合
 * @param {*} empty 要添加的首个数据
 * @param {*} otherListData 要添加的其他数据集合
 * @returns 封装后的数据集合
 */
export function refitCommonData(listData, empty, otherListData) {
  let result = [];

  if (typeof listData !== 'undefined') {
    if (listData !== null) {
      result = [...listData];
    }
  }

  if (typeof otherListData !== 'undefined') {
    if (otherListData !== null) {
      result = [...result, ...otherListData];
    }
  }

  if (typeof empty !== 'undefined') {
    if (empty !== null) {
      result = [empty, ...result];
    }
  }

  return result;
}

/**
 * 计算表达式的值
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function evil(fn) {
  // 一个变量指向Function，防止有些前端编译工具报错
  const Fn = Function;
  return new Fn(`return ${fn}`)();
}

/**
 * 获取Token键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getTokenKeyName() {
  return storageKeyCollection.token;
}

/**
 * 获取Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getToken() {
  const key = storageKeyCollection.token;

  return getStringFromLocalStorage(key);
}

/**
 * 设置Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setToken(v) {
  const key = storageKeyCollection.token;

  return saveStringToLocalStorage(key, v);
}

/**
 * 移除Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeToken(v) {
  const key = storageKeyCollection.token;

  return removeLocalStorage(key, v);
}

/**
 * 获取AreaFlag键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getAreaFlagKeyName() {
  return storageKeyCollection.areaFlag;
}

/**
 * 获取AreaFlag
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getAreaFlag() {
  const key = storageKeyCollection.areaFlag;

  return getStringFromLocalStorage(key);
}

/**
 * 设置AreaFlag
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setAreaFlag(v) {
  const key = storageKeyCollection.areaFlag;

  return saveStringToLocalStorage(key, v);
}

/**
 * 移除AreaFlag
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeAreaFlag(v) {
  const key = storageKeyCollection.areaFlag;

  return removeLocalStorage(key, v);
}

/**
 * 获取City
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCity() {
  const key = storageKeyCollection.city;

  return getJsonFromLocalStorage(key);
}

/**
 * 设置City
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCity(v) {
  const key = storageKeyCollection.city;

  return saveJsonToLocalStorage(key, v);
}

/**
 * 移除City
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCity(v) {
  const key = storageKeyCollection.city;

  return removeLocalStorage(key, v);
}

/**
 * 搜索集合中的匹配项
 *
 * @export
 * @param {*} itemKey
 * @param {*} itemValue
 * @param {*} sourceData
 * @returns
 */
export function searchFromList(itemKey, itemValue, sourceData) {
  const d = sourceData || [];
  let result = null;

  d.forEach(o => {
    if (o[itemKey] === itemValue) {
      result = o;
    }
  });

  return result;
}

function errorCustomData() {
  return {
    code: -1,
    message: '',
    data: null,
    list: [],
    extra: null,
  };
}

function dataExceptionNotice(d) {
  const {
    code,
    message: messageText
  } = d;
  const c = errorCustomData();

  const lastCustomMessage = window.lastCustomMessage || {
    code: -1,
    message: '',
    time: new Date().getTime(),
  };

  if (code !== c.code) {
    if ((messageText || '') !== '') {
      const currentTime = new Date().getTime();
      if (code === lastCustomMessage.code) {
        if (currentTime - lastCustomMessage.time > 800) {
          requestAnimationFrame(() => {
            message.error(messageText);
          });

          window.lastCustomMessage = {
            code,
            message: messageText,
            time: currentTime,
          };
        }
      } else {
        requestAnimationFrame(() => {
          message.error(messageText);
        });

        window.lastCustomMessage = {
          code,
          message: messageText,
          time: currentTime,
        };
      }
    }

    if (code === 2001) {
      requestAnimationFrame(() => {
        router.replace('/user/login');
      });
    }
  }
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldHelper(v, prefix = '注：') {
  return `${prefix}${v}。`;
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldDescription(v, op, other) {
  const o = (other || '') === '' ? '' : `,${other}`;
  return `请${op || '输入'}${v}${o}`;
}

/**
 * 预处理单项数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteSingleData(d) {
  const {
    code,
    message: messageText
  } = d || errorCustomData();
  let v = {};

  if (code === 200) {
    const {
      data,
      extra
    } = d;
    v = {
      code,
      message: messageText,
      data: data || {},
      extra: extra || {},
      dataSuccess: true,
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      data: null,
      extra: null,
      dataSuccess: false,
    };

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理集合数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteListData(d, listItemHandler) {
  const {
    code,
    message: messageText
  } = d || errorCustomData();
  let v = {};

  if (code === 200) {
    const {
      list: listData,
      extra: extraData
    } = d;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if ((o.key || null) == null) {
        o.key = `list-${index}`;
      }

      if (typeof listItemHandler === 'function') {
        o = listItemHandler(o);
      }
      return o;
    });

    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      extra: extraData,
      dataSuccess: true,
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      dataSuccess: false,
    };

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理分页数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemotePageListData(d, listItemHandler) {
  const {
    code,
    message: messageText
  } = d || errorCustomData();
  let v = {};

  if (code === 200) {
    const {
      list: listData,
      extra: extraData
    } = d;
    const {
      pageNo
    } = extraData;
    const list = (listData || []).map((item, index) => {
      let o = item;
      if ((o.key || null) == null) {
        o.key = `${pageNo}-${index}`;
      }

      if (typeof listItemHandler === 'function') {
        o = listItemHandler(o);
      }
      return o;
    });

    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      pagination: {
        total: extraData.total,
        pageSize: extraData.pageSize,
        current: parseInt(pageNo || 1, 10) || 1,
      },
      extra: extraData,
      dataSuccess: true,
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
      dataSuccess: false,
    };

    dataExceptionNotice(v);
  }
  return v;
}

/**
 * 预处理数据请求
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRequestParams(params, customHandle) {
  let submitData = params || {};

  if (typeof customHandle === 'function') {
    submitData = customHandle(submitData);
  }

  return submitData;
}

/**
 * 是否使用模拟访问
 *
 * @export
 * @returns
 */
export function useVirtualAccess() {
  return false;
}

/**
 * 封装模拟的登录验证
 *
 * @returns
 */
function apiVirtualAuthorize() {
  const tokenValue = getToken;
  return (tokenValue || '') !== '';
}

/**
 * 封装模拟的错误返回
 *
 * @export
 * @param {*} statusCode
 * @param {*} messageText
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export function apiVirtualFailData(statusCode, messageText, needAuthorize = true) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      message.error(messageText);
      return {
        code: statusCode,
        message: messageText,
      };
    }

    return {
      code: 2001,
      msg: '未授权的访问',
    };
  }

  message.error(messageText);
  return {
    code: statusCode,
    message: messageText,
  };
}

/**
 * 封装模拟的正确返回
 *
 * @export
 * @param {*} successData
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export function apiVirtualSuccessData(successData, needAuthorize = true) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      return {
        code: 200,
        msg: '',
        ...successData,
      };
    }

    return {
      code: 2001,
      msg: '未授权的访问',
    };
  }

  return {
    code: 200,
    msg: '',
    ...successData,
  };
}

/**
 * 封装正确的虚拟访问
 *
 * @export
 * @param {*} dataVirtual
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export async function apiVirtualSuccessAccess(dataVirtual, needAuthorize = true) {
  let result = {};
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(apiVirtualSuccessData(dataVirtual, needAuthorize));
    }, 300);
  }).then(data => {
    result = data;
  });

  message.info('由虚拟访问返回');

  const {
    code
  } = result;

  if (code === 2001) {
    router.push('/user/login');
  }

  return result;
}

/**
 * 封装失败的虚拟访问
 *
 * @export
 * @param {*} dataVirtual
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export async function apiVirtualFailAccess(dataVirtual, needAuthorize = true) {
  let result = {};
  // eslint-disable-next-line compat/compat
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(apiVirtualFailData(dataVirtual, needAuthorize));
    }, 300);
  }).then(data => {
    result = data;
  });

  message.info('由虚拟访问返回');

  const {
    code,
    message: messageText
  } = result;

  if (code === 2001) {
    router.push('/user/login');
  } else if (code !== 200) {
    message.warn(messageText);
  }

  return result;
}

/**
 * 封装模拟访问
 *
 * @export
 * @param {*} dataBuildFunction
 * dataBuildFunction示例
 * apiVirtualAccess(resolve => {
 *   setTimeout(() => {
 *     const { password, userName, type } = params;
 *     if (password === '888888' && userName === 'admin') {
 *       resolve(
 *         apiVirtualSuccessData(
 *           {
 *             id: 1,
 *             token: '059b1900-7d7b-40aa-872f-197d04b03385',
 *             userName: 'admin',
 *             type,
 *             role: [],
 *             currentAuthority: 'admin',
 *           },
 *           false
 *         )
 *       );
 *     } else if (password === '123456' && userName === 'user') {
 *       resolve(
 *         apiVirtualSuccessData(
 *           {
 *             id: 2,
 *             token: 'a9f98dab-00c1-4929-b79f-bacd1a7846d0',
 *             userName: 'user',
 *             type,
 *             role: [],
 *             currentAuthority: 'user',
 *           },
 *           false
 *         )
 *       );
 *     } else {
 *       resolve(apiVirtualFailData(1001, '用户名不存在或密码错误', false));
 *     }
 *   }, 300);
 * });
 * @returns
 */
export async function apiVirtualAccess(dataBuildFunction) {
  let result = {};
  // eslint-disable-next-line compat/compat
  await new Promise(resolve => {
    if (typeof dataBuildFunction === 'function') {
      setTimeout(dataBuildFunction(resolve));
    }
  }).then(data => {
    result = data;
  });

  message.info('由虚拟访问返回');

  const {
    code,
    message: messageText
  } = result;

  if (code !== 200) {
    message.warn(messageText);
  }

  return result;
}

/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromSessionStorage(key) {
  const storage = window.sessionStorage;
  const value = storage.getItem(key);

  if (process.env.NODE_ENV === 'development') {
    return value;
  }

  const decode = decodeBase64(value);
  const v = encodeBase64(decode);

  if (value !== v) {
    return null;
  }

  return decode;
}

/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromLocalStorage(key) {
  const storage = window.localStorage;
  const value = storage.getItem(key);

  if (process.env.NODE_ENV === 'development') {
    return value;
  }

  const decode = decodeBase64(value);
  const v = encodeBase64(decode);

  if (value !== v) {
    return null;
  }

  return decode;
}

/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromSessionStorage(key) {
  const jsonString = getStringFromSessionStorage(key);

  if (jsonString) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}

/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromLocalStorage(key) {
  const jsonString = getStringFromLocalStorage(key);

  if (jsonString) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}

/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToSessionStorage(key, value) {
  const storage = window.sessionStorage;

  if (process.env.NODE_ENV === 'development') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToLocalStorage(key, value) {
  const storage = window.localStorage;

  if (process.env.NODE_ENV === 'development') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}

/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToSessionStorage(key, json) {
  saveStringToSessionStorage(key, JSON.stringify(json || {}));
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToLocalStorage(key, json) {
  saveStringToLocalStorage(key, JSON.stringify(json || {}));
}

/**
 * 移除SessionStorage数据
 * @export
 * @param {*} key
 */
export function removeSessionStorage(key) {
  const storage = window.sessionStorage;
  storage.removeItem(key);
}

/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */
export function removeLocalStorage(key) {
  const storage = window.localStorage;
  storage.removeItem(key);
}

/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */
export function clearSessionStorage() {
  const storage = window.sessionStorage;
  storage.clear();
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearLocalStorage() {
  const storage = window.localStorage;
  storage.clear();
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearCustomData() {
  removeMetaDataCache();
  removeCurrentOperatorCache();
  removeToken();
  removeAreaFlag();
  removeCity();
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state，
 * @export
 */
// eslint-disable-next-line no-unused-vars
export function getDerivedStateFromPropsForUrlParamsCore(nextProps, prevState) {
  const {
    match
  } = nextProps;

  if ((match || null) != null) {
    const {
      params
    } = match;

    if ((params || null) != null) {
      return {
        urlParams: params
      };
    }
  }

  return null;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null，
 * @export
 */
export function getDerivedStateFromPropsForUrlParams(
  nextProps,
  prevState,
  defaultUrlParams = {
    id: ''
  },
  parseUrlParamsForSetState = null,
) {
  let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(nextProps, prevState);

  stateUrlParams = stateUrlParams || {
    urlParams: defaultUrlParams
  };

  const {
    urlParams: urlParamsPrev
  } = prevState;

  const {
    urlParams
  } = stateUrlParams;

  if (isEqualBySerialize({
      ...(urlParamsPrev || {}),
      ...{}
    }, {
      ...(urlParams || {}),
      ...{}
    })) {
    return prevState;
  }

  if (isFunction(parseUrlParamsForSetState)) {
    const data = parseUrlParamsForSetState(stateUrlParams);

    return {
      ...prevState,
      ...stateUrlParams,
      ...data
    };
  }

  return {
    ...prevState,
    ...stateUrlParams
  };
}

/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等。
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。
 */
export function isEqual(value, other) {
  return isEqualLodash(value, other);
}

export function isEqualBySerialize(value, other) {
  const d1 = JSON.stringify(value || {});
  const d2 = JSON.stringify(other || {});

  return d1 === d2;
}

export function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(JSON.stringify(value));
}

export function isFunction(value) {
  return isFunctionLodash(value);
}

export function isArray(value) {
  return isArrayLodash(value);
}

/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象，例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */
export function filter(collection, predicateFunction) {
  return filterLodash(collection, predicateFunction);
}

/**
 * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */
export function sortBy(collection, predicateFunction) {
  return sortByLodash(collection, predicateFunction);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array, predicateFunction, fromIndex = 0) {
  return findIndexLodash(array, predicateFunction, fromIndex);
}

export function reverse(array) {
  return reverseLodash(array);
}

export function trim(source) {
  return trimLodash(source);
}

export function replace(source, pattern, replacement) {
  return replaceLodash(source, pattern, replacement);
}

export function isBoolean(value) {
  return isBooleanLodash(value);
}

export function isUndefined(value) {
  return isUndefinedLodash(value);
}

export function isDate(value) {
  return isDateLodash(value);
}

/**
 * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数： (value, index, array)。
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */
export function removeFromArray(array, predicate) {
  return removeLodash(array, predicate);
}

export function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || '', ' ', '')) === '';
}

/**
 * 获取metaData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getMetaDataCache() {
  const key = storageKeyCollection.metaData;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.dataVersion || '') === '') {
    return null;
  }

  const now = parseInt(new Date().getTime() / 1000 / 60 / 5, 10);

  if (d.dataVersion < now) {
    return null;
  }

  if (d.areaFlag === '' || d.areaFlag !== getAreaFlag()) {
    return null;
  }

  return d.metaData || null;
}

/**
 * 设置metaData缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setMetaDataCache(o) {
  const key = storageKeyCollection.metaData;

  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const d = {
    metaData: o || null,
    dataVersion: now,
    areaFlag: getAreaFlag() || '',
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeMetaDataCache() {
  const key = storageKeyCollection.metaData;
  removeLocalStorage(key);
}

/**
 * 获取useParamsData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getUseParamsDataCache(key) {
  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    removeUseParamsDataCache(key);
    return null;
  }

  if ((d.dataVersion || '') === '') {
    removeUseParamsDataCache(key);
    return null;
  }

  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  if (d.dataVersion < now) {
    removeUseParamsDataCache(key);
    return null;
  }

  if (d.areaFlag === '' || d.areaFlag !== getAreaFlag()) {
    removeUseParamsDataCache(key);
    return null;
  }

  return d.useParamsData || null;
}

/**
 * 设置useParamsData缓存
 *
 * @export
 * @param {o} useParamsData数据
 * @returns
 */
export function setUseParamsDataCache(key, o) {
  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const d = {
    useParamsData: o || null,
    dataVersion: now,
    areaFlag: getAreaFlag() || '',
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeUseParamsDataCache(key) {
  removeLocalStorage(key);
}

/**
 * 获取缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentOperatorCache() {
  const key = storageKeyCollection.currentOperator;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if (d.flag === '' || d.flag !== getToken()) {
    return null;
  }

  return d.data || null;
}

/**
 * 设置metaData缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setCurrentOperatorCache(o) {
  const key = storageKeyCollection.currentOperator;

  const d = {
    data: o || null,
    flag: getToken() || '',
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 移除经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentOperatorCache() {
  const key = storageKeyCollection.currentOperator;
  removeLocalStorage(key);
}

/**
 * base64解码
 */
export function decodeBase64(target) {
  let commonContent = (target || '').replace(/\s/g, '+');
  commonContent = Buffer.from(commonContent, 'base64').toString();
  return commonContent;
}

/**
 * base64编码
 */
export function encodeBase64(target) {
  const base64Content = Buffer.from(target).toString('base64');
  return base64Content;
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function handleCommonDataAssist(state, action, callback = null) {
  const {
    payload: d,
    alias
  } = action;

  let v = pretreatmentRemoteSingleData(d);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return {
      ...state,
      data: v,
    };
  }

  const aliasData = {};
  aliasData[alias] = v;

  return {
    ...state,
    ...aliasData,
  };
}

export function handleListDataAssist(state, action, pretreatment = null, callback = null) {
  const {
    payload: d,
    alias
  } = action;

  let v = pretreatmentRemoteListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return {
      ...state,
      data: v,
    };
  }

  const aliasData = {};
  aliasData[alias] = v;

  return {
    ...state,
    ...aliasData,
  };
}

export function handlePageListDataAssist(state, action, pretreatment = null, callback = null) {
  const {
    payload: d,
    alias
  } = action;

  let v = pretreatmentRemotePageListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return {
      ...state,
      data: v,
    };
  }

  const aliasData = {};
  aliasData[alias] = v;

  return {
    ...state,
    ...aliasData,
  };

}
export function returnStartIndex(str, start) {
  let strStart = str.substr(str.indexOf(start) + start.length + 1);
  let end = strStart.indexOf('&');
  return strStart.substr(0, end);
}

function str2ASCII(val) {
  return ("0" + val.charCodeAt(0).toString(16)).slice(-2);
}

export function UrlEncode(str) {
  var res = "";
  var strSpec = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
  var text = "";

  for (var i = 0; i < str.length; i++) {
    var chr = str.charAt(i);
    var c = str2ASCII(chr);
    text += chr + ":" + c + "n";
    if (parseInt("0x" + c) > 0x7f) {
      res += "%" + c.slice(0, 2) + "%" + c.slice(-2);
    } else {
      if (chr == " ") res += "+";
      else if (strSpec.indexOf(chr) != -1) res += "%" + c.toString(16);
      else res += chr;
    }
  }
  return res;
}

export function randomPosition() {
  return {
    longitude: 100 + Math.random() * 20,
    latitude: 30 + Math.random() * 20
  }
}
export function randomMarker(len) {
  return Array(len).fill(true).map((e, idx) => ({
    content: '<div></div>',
    position: randomPosition()
  }))
}
