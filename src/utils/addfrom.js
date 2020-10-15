
/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state，
 * @export
 */
// eslint-disable-next-line no-unused-vars
export function getDerivedStateFromPropsForUrlParamsCore(nextProps, prevState) {
  const { match } = nextProps;

  if ((match || null) != null) {
    const { params } = match;

    if ((params || null) != null) {
      return { urlParams: params };
    }
  }

  return null;
}

/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等。
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。
 */

export function isEqualBySerialize(value, other) {
  const d1 = JSON.stringify(value || {});
  const d2 = JSON.stringify(other || {});

  return d1 === d2;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null，
 * @export
 */
export function getDerivedStateFromPropsForUrlParams(
    nextProps,
    prevState,
    defaultUrlParams = { id: '' },
    parseUrlParamsForSetState = null,
  ) {
    let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(nextProps, prevState);
  
    stateUrlParams = stateUrlParams || { urlParams: defaultUrlParams };
  
    const { urlParams: urlParamsPrev } = prevState;
  
    const { urlParams } = stateUrlParams;
  
    if (isEqualBySerialize({ ...(urlParamsPrev || {}), ...{} }, { ...(urlParams || {}), ...{} })) {
      return prevState;
    }
  
    if (isFunction(parseUrlParamsForSetState)) {
      const data = parseUrlParamsForSetState(stateUrlParams);
  
      return { ...prevState, ...stateUrlParams, ...data };
    }
  
    return { ...prevState, ...stateUrlParams };
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