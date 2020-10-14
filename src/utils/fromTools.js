import {
  isFunction as isFunctionLodash
} from 'lodash';
import moment from 'moment';

/**
 * 输入文本描述
 * @param {提示信息} v 
 * @param {默认输入，可以选填例如选择} op 
 * @param {其他} other 
 */
export function buildFieldDescription(v, op, other) {
  const o = (other || '') === '' ? '' : `,${other}`;
  return `请${op || '输入'}${v}${o}`;
}

/**
 * 判断是否是函数
 * @param {} value 
 */

export function isFunction(value) {
    return isFunctionLodash(value);
  }

  
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
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function formatDatetime(v, formatString = 'YYYY-MM-DD', defaultValue = '') {
  return (v || '') === ''
    ? defaultValue
    : moment(typeof v === 'object' ? v : new Date(v.replace('/', '-'))).format(formatString);
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