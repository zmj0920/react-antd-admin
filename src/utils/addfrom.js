

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