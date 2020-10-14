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


function getBrowserInfoCore() {
  const getBrowserVersion = () => {
    const u = navigator.userAgent;
    return {
      // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android 终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为 iPhone 或者 QQHD 浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    };
  };

  return {
    versions: getBrowserVersion(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
}

/**
 * 获取浏览器信息
 *
 * @export
 * @returns
 */
export function getBrowserInfo() {
  return getBrowserInfoCore();
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
 * 构建输入描述文本
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
 * 返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function getRandomColor(seed) {
    // eslint-disable-next-line
    return `#${`00000${((seededRandom(seed) * 0x1000000) << 0).toString(16)}`.substr(-6)}`;
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