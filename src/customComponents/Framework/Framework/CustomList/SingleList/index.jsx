import React from 'react';
import { message } from 'antd';

import { defaultListState, stringIsNullOrWhiteSpace } from '../../../../utils/tools';
import ListBase from '../ListBase';
import StandardTableCustom from '../../../StandardTableCustom';

class SingleList extends ListBase {
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  handleFormReset = () => {
    const { form } = this.props;

    form.resetFields();

    this.handleFormOtherReset();

    this.setState(
      {
        formValues: {},
        startTime: '',
        endTime: '',
      },
      () => {
        this.reloadData();
      },
    );
  };

  initLoadRequestParams = (o = {}) => {
    let d = o;

    const { loadApiPath, formValues, filters, sorter } = this.state;

    if ((loadApiPath || '') === '') {
      message.error('loadApiPath需要配置');
      return d;
    }

    const { startTimeAlias, endTimeAlias, startTime, endTime } = this.state;

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
        ...(sorter || {}),
      },
    };

    delete d.dateRange;

    return d;
  };

  handleSearch = e => {
    e.preventDefault();

    if (this.checkWorkDoing()) {
      return;
    }

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.searchData({ formValues: values });
    });
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
      data: metaOriginalData || { list: [] },
      showSelect,
      pagination: false,
      selectedRows: selectedDataTableDataRows,
      columns,
      onSelectRow: this.handleSelectRows,
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

export default SingleList;
