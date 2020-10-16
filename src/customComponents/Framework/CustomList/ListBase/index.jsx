import React from 'react';
import { Row, Col, Card, Form, Button, DatePicker, BackTop, Divider } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { defaultListState, buildFieldDescription } from '../../../../utils/tools';
import CustomAuthorization from '../../CustomAuthorization';

import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class SingleList extends CustomAuthorization {
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  onDateRangeChange = (dates, dateStrings) => {
    this.setState({
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedDataTableDataRows: rows,
    });
  };

  getPageName = () => {
    const { pageName } = this.state;

    return pageName;
  };

  getColumn = () => [];

  handleFormReset = () => {
    // 需要继承重载
  };

  // 其他项重置
  handleFormOtherReset = () => {};

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

  renderSimpleFormButton = (expandButton, ColMd = 6) => {
    const { reloading, searching, refreshing } = this.state;

    return (
      <Col md={ColMd} sm={24}>
        <span className={styles.submitButtons}>
          <Button loading={searching} type="primary" 
          // icon="search"
           htmlType="submit">
            查询
          </Button>
          <Button
            loading={reloading}
            style={{ marginLeft: 8 }}
            // icon="reload"
            onClick={() => {
              this.handleFormReset();
            }}
          >
            重置
          </Button>
          <Divider type="vertical" />
          <Button
            loading={refreshing}
            className={styles.searchButtonMarginLeft}
            // icon="reload"
            onClick={() => {
              if (!this.checkWorkDoing()) {
                this.refreshData();
              }
            }}
          >
            刷新
          </Button>
          {expandButton}
        </span>
      </Col>
    );
  };

  renderSimpleFormRangePicker = (dateRangeFieldName, ColMd = 8, rangePickerProps = null) => {
    // const { form } = this.props;
    // const { getFieldDecorator } = form;

    const p = {
      ...{
        style: { width: '100%' },
        showTime: { format: 'HH:mm' },
        format: 'YYYY-MM-DD HH:mm',
        placeholder: ['开始时间', '结束时间'],
        onChange: (dates, dateStrings) => {
          this.onDateRangeChange(dates, dateStrings);
        },
        ...(rangePickerProps || {}),
      },
    };

    return (
      <Col md={ColMd} sm={24}>
        <FormItem label={dateRangeFieldName}  name="dateRange"  rules={[
              {
                required: false,
                message: buildFieldDescription(dateRangeFieldName, '选择'),
              },
            ]}>
         
          <RangePicker {...p} />
        </FormItem>
      </Col>
    );
  };

  

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {/* {this.renderSimpleFormRangePicker(dateRangeFieldName, 10)} */}
          {this.renderSimpleFormButton(null, 12)}
        </Row>
      </>
    );
  };

  renderSimpleForm = () => (
    <Form onSubmit={this.handleSearch} layout="inline">
      {this.renderSimpleFormRow()}
    </Form>
  );

  renderForm = () => this.renderSimpleForm();

  // eslint-disable-next-line arrow-body-style
  buildTableOtherConfig = () => {
    // 可以配置额外的Table属性

    return {};
  };

  buildTableConfig = () => {
    const columns = this.getColumn();

    return {
      ...this.buildTableOtherConfig(),
      columns,
    };
  };

  // eslint-disable-next-line no-unused-vars
  renderTable = config => null;

  renderAboveTable = () => null;

  render() {
    return (
      <PageHeaderWrapper title={this.getPageName()}>
        <Card bordered={false} className={styles.containorBox}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderOther()}
            {this.renderAboveTable()}
            {this.renderTable()}
          </div>
        </Card>
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default SingleList;
