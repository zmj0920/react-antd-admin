import React, { PureComponent } from 'react';
import { Table, Alert, Spin } from 'antd';

import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTableCustom extends PureComponent {
  constructor(props) {
    super(props);

    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if ((nextProps.selectedRows || []).length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: (selectedRows || []).reduce(
        (sum, val) => sum + parseFloat(val[item.dataIndex], 10),
        0
      ),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows || []);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      data: { list, pagination },
      loading,
      rowKey,
      showSelect: showSelectOption,
      ...rest
    } = this.props;

    const { columns } = rest
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const { selectedRows } = this.props;
    const showSelect = showSelectOption || false;

    const rowSelection =
      (selectedRows || []).length === 0 && !showSelect
        ? null
        : {
          selectedRowKeys,
          onChange: this.handleRowSelectChange,
          getCheckboxProps: record => ({
            disabled: record.disabled,
          }),
        };
    const rowSelectionMessage =
      rowSelection === null ? (
        ''
      ) : (
          <div className={styles.tableAlert}>
            <Alert
              message={
                <>
                  已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                  {needTotalList.map(item => (
                    <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                      {item.title}
                    总计&nbsp;
                      <span style={{ fontWeight: 600 }}>
                        {item.render ? item.render(item.total) : item.total}
                      </span>
                    </span>
                  ))}
                  <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                    清空
                </a>
                </>
              }
              type="info"
              showIcon
            />
          </div>
        );
    return (
      <div className={styles.standardTableCustom}>
        {rowSelectionMessage}
        <Spin spinning={loading}>
          {
           columns.length !=0 ? (
              <Table
                rowKey={rowKey || 'key'}
                // loading={loading}
                // size="small"
                rowSelection={rowSelection}
                dataSource={list}
                pagination={paginationProps}
                onChange={this.handleTableChange}
                {...rest}
              />
            ) : (<div></div>)
          }
        </Spin>
      </div>
    );
  }
}

export default StandardTableCustom;
