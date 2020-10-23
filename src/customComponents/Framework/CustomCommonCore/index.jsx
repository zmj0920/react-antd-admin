import React from 'react';
import { history } from 'umi';
import {
  Form,
  Select,
  Radio,
  Input,
  Icon,
  InputNumber,
  DatePicker,
  message
} from 'antd';

import {
  getDerivedStateFromPropsForUrlParams,
  isEqual,
  isFunction,
  defaultCommonState,
  pretreatmentRequestParams,
  isUndefined,
  recordLog,
  buildFieldDescription
} from '@/utils/tools';
import CustomCore from '../CustomCore';
const FormItem = Form.Item
class Index extends CustomCore {
  lastRequestingData = { type: '', payload: {} };

  constructor(props) {
    super(props);

    const defaultState = defaultCommonState();

    this.state = {
      ...defaultState,
      ...{ backPath: '' },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  doDidMountTask = () => {
    this.adjustWhenDidMount();

    this.init();
  };


  checkNeedUpdate = (preProps, preState, snapshot) => false;

  // 该方法必须重载覆盖
  getApiData = props => ({
    metaOriginalData: {
      dataSuccess: false,
    },
  });

  /**
   * 处理其他需要在组件挂在之后执行的流程
   *
   * @memberof Index
   */
  initOther = () => { };

  init = () => {
    this.initLoad();
    this.initOther();
  };


  beforeFirstLoadRequest = submitData => { };


  beforeReLoadRequest = submitData => { };


  beforeRequest = submitData => { };


  afterGetFirstRequestResult = (submitData, responseData) => { };


  afterGetRequestResult = (submitData, responseData) => { };


  afterGetReLoadRequestResult = (submitData, responseData) => { };

  getRequestingData() {
    return this.lastRequestingData;
  }

  setRequestingData(params, callback) {
    const d =
      params == null ? { type: '', payload: {} } : { ...{ type: '', payload: {} }, ...params };

    this.lastRequestingData = d;

    if (isFunction(callback)) {
      callback();
    }
  }

  clearRequestingData() {
    this.setRequestingData({ type: '', payload: {} });
  }

  initLoadRequestParams = o => o || {};

  supplementLoadRequestParams = o => o;

  // eslint-disable-next-line no-unused-vars
  checkLoadRequestParams = o => {
    return true;
  };

  initLoad = (callback = null) => {

    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
      dataLoading,
      loadSuccess,
      loadDataAfterMount,
    } = this.state;

    try {
      if (loadDataAfterMount) {
        if ((loadApiPath || '') === '') {
          message.error('loadApiPath需要配置');
          this.setState({
            dataLoading: false,
            loadSuccess: false,
            reloading: false,
            searching: false,
            refreshing: false,
            paging: false,
          });

          return;
        }

        let submitData = this.initLoadRequestParams() || {};

        submitData = pretreatmentRequestParams(submitData);

        submitData = this.supplementLoadRequestParams(submitData);

        const checkResult = this.checkLoadRequestParams(submitData);

        if (checkResult) {
          if (!firstLoadSuccess) {
            this.beforeFirstLoadRequest(submitData);
          }

          if (reloadingBefore) {
            this.beforeReLoadRequest(submitData);
          }

          this.beforeRequest(submitData);
          if (dataLoading && !loadSuccess) {
            this.initLoadCore(submitData, callback);
          } else {
            this.setState(
              {
                dataLoading: true,
                loadSuccess: false,
              },
              () => {
                this.initLoadCore(submitData, callback);
              },
            );
          }
        }
      } else {
        // 加载时执行完第一次方法之后设置为true
        this.setState({ loadDataAfterMount: true });
      }
    } catch (error) {
      recordLog({ loadApiPath });

      throw error;
    }
  };

  initLoadCore = (requestData, callback) => {

    try {
      const { dispatch } = this.props;
      const requestingDataPre = this.getRequestingData();

      const { loadApiPath, firstLoadSuccess } = this.state;

      // 处理频繁的相同请求
      if (
        !isEqual(requestingDataPre, {
          type: loadApiPath,
          payload: requestData,
        })
      ) {
        this.setRequestingData({ type: loadApiPath, payload: requestData });

        dispatch({
          type: loadApiPath,
          payload: requestData,
        }).then(() => {
          const metaOriginalData = this.getApiData(this.props);
          if (isUndefined(metaOriginalData)) {
            return;
          }

          this.lastLoadParams = requestData;

          const { dataSuccess } = metaOriginalData;

          if (dataSuccess) {
            const { list: metaListData, data: metaData, extra: metaExtra } = metaOriginalData;

            this.setState({
              metaData: metaData || null,
              metaExtra: metaExtra || null,
              metaListData: metaListData || [],
              metaOriginalData,
            });

            this.afterLoadSuccess(
              metaData || null,
              metaListData || [],
              metaExtra || null,
              metaOriginalData,
            );
          }

          const { reloading: reloadingComplete } = this.state;

          if (reloadingComplete) {
            this.afterReloadSuccess();
            this.afterGetReLoadRequestResult(requestData, metaOriginalData);
          }

          this.setState({
            dataLoading: false,
            loadSuccess: dataSuccess,
            reloading: false,
            searching: false,
            refreshing: false,
            paging: false,
          });

          if (!firstLoadSuccess) {
            this.setState(
              {
                firstLoadSuccess: true,
              },
              () => {
                this.afterFirstLoadSuccess();

                this.afterGetFirstRequestResult(requestData, metaOriginalData);
              },
            );
          }

          this.afterGetRequestResult(requestData, metaOriginalData);

          if (typeof callback === 'function') {
            callback();
          }

          this.clearRequestingData();
        });
      }
    } catch (error) {
      recordLog({ requestData });

      throw error;
    }
  };

  pageData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ paging: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  reloadData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ reloading: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  searchData = (otherState, callback = null) => {

    const s = { ...(otherState || {}), ...{ searching: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  refreshData = (callback = null) => {
    this.setState({ refreshing: true }, () => {
      this.initLoad(callback);
    });
  };

  reloadGlobalData = (callback = null) => {
    const { dispatch } = this.props;
    callback();
    // dispatch({
    //   type: 'global/getMetaData',
    //   payload: { force: true },
    // }).then(() => {
    //   if (isFunction(callback)) {
    //     callback();
    //   }
    // });
  };

  afterFirstLoadSuccess = () => { };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => { };

  afterReloadSuccess = () => { };

  backToList = () => {
    const { backPath } = this.state;

    this.goToPath(backPath);
  };

  checkWorkDoing() {
    const { dataLoading, reloading, searching, refreshing, paging, processing } = this.state;

    if (dataLoading || reloading || searching || refreshing || paging || processing) {
      message.info('数据正在处理中，请稍等一下再点哦');

      return true;
    }

    return false;
  }

  reloadByUrl() {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    dispatch(
      history.replace({
        pathname: `${pathname.replace('/load/', '/update/')}`,
      }),
    );
  }

  renderOther = () => {
    return null;
  };

  /** 输入框
      * 
      * @param {标题} label 
      * @param {key} name 
      * @param {默认值} value 
      * @param {必填} required 
      * @param {描述说明详情} helper 
      * @param {显示Icon} addonBefore 
      * @param {扩展属性} inputProps 
      * @param {样式控制} formItemLayout 
      * @param {提示语} reminderPrefix 
      * @param {正则匹配扩展 { pattern:new RegExp('^[0-9a-zA-Z_]{1,}$','g'),message:'只允许包含数字、字母、下划线'}} pattern 
      * @param {禁用} disabled 
      * @param {回调函数} onChangeCallback 
      */
  renderFormInputFormItem = (
    label,
    name,
    value = '',
    required = false,
    helper = null,
    addonBefore = null,
    inputProps = {},
    formItemLayout = {},
    reminderPrefix = '输入',
    pattern = {},
    disabled = false,
    onChangeCallback
  ) => {
    const title = label;
    const otherInputProps = {
      ...{
        addonBefore: addonBefore,
        placeholder: buildFieldDescription(title, reminderPrefix),
        disabled,
        onChange: (v, option) => {
          if (isFunction(onChangeCallback)) {
            onChangeCallback(v, option);
          }
        }
      },
      ...(inputProps || {}),
    };
    return (
      <FormItem
        {...formItemLayout}
        label={title}
        extra={helper}
        name={name}
        rules={[
          { required, message: buildFieldDescription(title, reminderPrefix) },
          pattern
        ]}
      >
        <Input value={value} {...otherInputProps} />
      </FormItem>
    );
  }

  renderFormInputNumberFormItem = (
    label,
    name,
    value = 0,
    required = false,
    helper = null,
    inputNumberProps = {},
    formItemLayout = {},
    reminderPrefix = '输入',
    disabled = false,
    onChangeCallback
  ) => {

    const title = label;
    const otherInputNumberProps = {
      ...{
        style: { width: '100%' },
        min: 0,
        placeholder: buildFieldDescription(title, reminderPrefix),
        disabled,
        onChange: (v, option) => {
          if (isFunction(onChangeCallback)) {
            onChangeCallback(v, option);
          }
        }
      },
      ...(inputNumberProps || {}),
    };

    return (

      <FormItem
        {...formItemLayout}
        label={title}
        extra={helper}
        name={name}
        rules={[
          { required, message: buildFieldDescription(title, reminderPrefix) },
        ]}
      >
        <InputNumber {...otherInputNumberProps} value={value} />
      </FormItem>
    );
  }
  renderFromRadioCore = (
    label,
    name,
    value,
    listDataSource,
    onChangeCallback,
    radioProps = {},
    formItemLayout = {},
    helper = null
  ) => {
    const listData = listDataSource || [];
    const title = label;
    const otherRadioProps = {
      ...(radioProps || {}),
    };



    onchange = e => {
      if (isFunction(onChangeCallback)) {
        onChangeCallback(e);
      }
    }

    return (
      <Form.Item name={name} {...(formItemLayout || {})} label={title} extra={helper}>
        <Radio.Group {...otherRadioProps} defaultValue={value}>
          {
            listData.length > 0 ? listData.map(value => {
              return <Radio key={value.flag} value={value.flag}>{value.name}</Radio>
            }) : null
          }
        </Radio.Group>
      </Form.Item>
      // <FormItem name={name} {...(formItemLayout || {})} label={title} extra={helper}>
      //     <Radio.Group {...otherRadioProps} onChange={this.onChange} defaultValue={value}>
      //         {
      //             listData.length > 0 ? listData.map(value => {
      //                 return <Radio key={value.flag} value={value.flag}>{value.name}</Radio>
      //             }) : null
      //         }

      //     </Radio.Group>
      // </FormItem>
    )
  };

}

export default Index;
