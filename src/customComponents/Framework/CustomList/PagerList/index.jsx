import React, { createRef } from 'react';
import { message } from 'antd';

import {
  defaultPageListState,
  setUseParamsDataCache,
  getValue,
  getUseParamsDataCache,
  dateToMoment,
  stringIsNullOrWhiteSpace,
} from '../../../../utils/tools';
import ListBase from '../ListBase';
import StandardTableCustom from '../../../StandardTableCustom';

class PagerList extends ListBase {
  lastLoadParams = null;
 
  useParamsKey = true;

  constructor(props) {
    super(props);

    const defaultState = defaultPageListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  handleFormReset = (checkWorkDoing = true) => {
    if (checkWorkDoing) {
      if (this.checkWorkDoing()) {
        return;
      }
    }

    const { pageSize } = this.state;

    this.formRef.current.resetFields();

    this.handleFormOtherReset();

    this.setState(
      {
        formValues: {},
        startTime: '',
        endTime: '',
        pageNo: 1,
        pageSize,
      },
      () => {
        this.reloadData();
      },
    );
  };

  /**
   * 轻微调整初始化请求数据体
   *
   * @memberof PagerList
   */
  adjustLoadRequestParams = o => o || {};

  /**
   * 创建初始化请求数据体
   *
   * @memberof PagerList
   */
  initLoadRequestParams = o => {
    let d = o || {};

    const { paramsKey, loadApiPath, formValues, filters, sorter } = this.state;

    if ((loadApiPath || '') === '') {
      message.error('loadApiPath需要配置');
      return d;
    }

    if (this.useParamsKey) {
      if ((paramsKey || '') === '') {
        message.error('paramsKey需要配置');
        return d;
      }

      d = getUseParamsDataCache(paramsKey);

      this.useParamsKey = false;
    } else {
      const { startTimeAlias, endTimeAlias, pageNo, pageSize, startTime, endTime } = this.state;

      if (!stringIsNullOrWhiteSpace(startTime)) {
        if (!stringIsNullOrWhiteSpace(startTimeAlias)) {
          d[startTimeAlias] = startTime;
        } else {
          d.startTime = startTime;
        }
      }

      if (!stringIsNullOrWhiteSpace(endTime)) {
        if (!stringIsNullOrWhiteSpace(endTimeAlias)) {
          d[endTimeAlias] = endTime;
        } else {
          d.endTime = endTime;
        }
      }

      d = {
        ...d,
        ...{
          ...(formValues || {}),
          ...(filters || {}),
          ...{ pageNo, pageSize },
          ...(sorter || {}),
        },
      };

      delete d.dateRange;
    }

    return this.adjustLoadRequestParams(d);
  };

  // eslint-disable-next-line no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {
    const { form } = this.props;
    const { urlParams } = this.state;

    let pageKey = 'no';

    if (urlParams != null) {
      pageKey = urlParams.pageKey || 'no';
    }

    const p = submitData;

    if (pageKey === 'key' && p != null) {
      if (p.startTime && p.endTime) {
        p.dateRange = [dateToMoment(p.startTime), dateToMoment(p.endTime)];
        // p.dateRange = `${p.startTime}-${p.endTime}`;
      }

      const d = form.getFieldsValue();

      Object.keys(d).forEach(key => {
        const c = p[key] === 0 ? 0 : p[key] || null;

        if (c != null) {
          const obj = {};
          obj[key] = c;
          form.setFieldsValue(obj);
        }
      });

      this.adjustRenderLoadRequestParamsWithKey(d);
    }
  };

  // eslint-disable-next-line no-unused-vars
  adjustRenderLoadRequestParamsWithKey = d => { };

  afterGetRequestResult = () => {
    const { paramsKey } = this.state;

    if (!stringIsNullOrWhiteSpace(paramsKey)) {
      setUseParamsDataCache(paramsKey, this.lastLoadParams);
    }
  };

  handleSearch = e => {
    e.preventDefault();
    if (this.checkWorkDoing()) {
      return;
    }
    const { pageSize } = this.state;
    const {
      current: { validateFields },
    } = this.formRef
    validateFields().then((fieldsValue) => {
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.searchData({ formValues: values, pageNo: 1, pageSize });
    }).catch(err => {
      if (err) return;
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    if (this.checkWorkDoing()) {
      return;
    }

    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      formValues,
      filters,
    };

    if (sorter.field) {
      params.sorter = { sorter: `${sorter.field}_${sorter.order}` };
    }

    this.pageData(params);
  };

  renderTable = () => {
    const {
      tableScroll,
      showSelect,
      selectedDataTableDataRows,
      metaOriginalData,
      dataLoading,
      processing,
    } = this.state;

    const { styleSet, columns, expandedRowRender } = this.buildTableConfig();

    const standardTableCustomOption = {
      loading: dataLoading || processing,
      data: metaOriginalData || { list: [], pagination: {} },
      showSelect,
      selectedRows: selectedDataTableDataRows,
      columns,
      onSelectRow: this.handleSelectRows,
      onChange: this.handleStandardTableChange,
    };

    if ((styleSet || null) != null) {
      standardTableCustomOption.style = styleSet;
    }

    if ((tableScroll || null) != null) {
      standardTableCustomOption.scroll = tableScroll;
    }

    if ((expandedRowRender || null) != null) {
      standardTableCustomOption.expandedRowRender = expandedRowRender;
    }

    return <StandardTableCustom {...standardTableCustomOption} />;
  };
}

export default PagerList;
