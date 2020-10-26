import React, { Component, createRef } from 'react';
import { connect, history } from 'umi';
import { Row, Col, Divider, Form, Input, Icon, Button, message,Popconfirm } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ProTableCustom from '@/customComponents/ProTableCustom';

@connect(({ user, global, loading }) => ({
  global,
  user,
  loading: loading.models.user,
}))
class Welcome extends ProTableCustom {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...{
        dataLoading: false,

      },
    };
  }



  handleAdd = (value) => {
    console.log(value)
    if (value) {
      this.reloadData()
    }
  }

  handleBatchRemove = (selectedRows) => {

  }

  handleDelete = (value) => {

  }

  getColumn = () => [
    {
      title: "id",
      dataIndex: 'id',
      // width: 100,
      align: 'center',
      hideInForm: true,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      // width: '30%',
      search: false,
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      // width: 200,
      sorter: true,
      hideInForm: true,
      renderText: (val) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      // width: 100,
      hideInForm: true,
      initialValue:'关闭',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      // width: 100,
      sorter: true,
      valueType: 'dateTime',
      hideInForm: false,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              this.onUpdate(true);
              this.setUpdateFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <Popconfirm
            placement="top"
            title="确定要删除吗？"
            onConfirm={this.handleDelete(record)}
            okText="确定"
            cancelText="取消">
            <a>
              删除
            </a>
          </Popconfirm>
        </>
      ),
    },
  ];

}



export default Welcome