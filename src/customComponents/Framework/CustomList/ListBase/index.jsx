import React, { createRef } from 'react';
import { Row, Col, Card, Form, Button, DatePicker, BackTop, Divider } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchOutlined, ReloadOutlined, } from '@ant-design/icons';
import { defaultListState } from '@/utils/tools';
import CustomAuthorization from '../../CustomAuthorization';
import styles from './index.less';

class SingleList extends CustomAuthorization {
  formRef = createRef();
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

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
  handleFormOtherReset = () => { };

  handleSearch = e => {
    e.preventDefault();

    if (this.checkWorkDoing()) {
      return;
    }

    const {
      current: { validateFields },
    } = this.formRef


    validateFields().then(fieldsValue => {
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.searchData({ formValues: values });
    })
      .catch(err => {
        if (err) return;
      })
  };

  renderSimpleFormButton = (expandButton, ColMd = 6) => {
    const { reloading, searching, refreshing } = this.state;

    return (
      <Col md={ColMd} sm={24}>
        <span className={styles.submitButtons}>
          <Button loading={searching} type="primary"
            icon={<SearchOutlined />}
            onClick={(e) => {
              this.handleSearch(e);
            }}
          >
            查询
          </Button>
          <Button
            loading={reloading}
            style={{ marginLeft: 8 }}
            icon={<ReloadOutlined />}
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
            icon={<ReloadOutlined />}
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

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormButton(null, 12)}
        </Row>
      </>
    );
  };

  renderSimpleForm = () => (
    <Form ref={this.formRef} onSubmit={this.handleSearch} layout="inline">
      {this.renderSimpleFormRow()}
    </Form>
  );

  renderForm = () => this.renderSimpleForm();


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
