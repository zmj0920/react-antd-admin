import React, { Component, createRef } from 'react';
import { connect, history } from 'umi';
import {
  Row,
  Col,
  Divider,
  Form,
  Input,
  Icon,
  Button,
  message,
  Popconfirm,
  Space,
  Card,
  Descriptions,
} from 'antd';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import ProTableCustom from '@/customComponents/ProTableCustom';
import { testData } from '@/services/user';
import request from 'umi-request';
import moment from 'moment';
import style from '@/pages/Welcome.less';
import LightFilterCustomTest from '@/pages/ModalFrom/LightFilterCustomTest';
import ProCard from '@ant-design/pro-card';
@connect(({ user, global, loading }) => ({
  global,
  user,
  loading: loading.models.user,
}))
class Index extends ProTableCustom {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        showSelect: true,
        // showExpandedRowRender:true
        tableScroll: { x: 1300 },
      },
    };
  }

  getApiData = (props) => {
    const {
      user: { data },
    } = props;

    return data;
  };

  handleAdd = (value) => {
    console.log(value);
    if (value) {
      this.reloadData();
    }
  };

  // handleBatchRemove = (selectedRows) => {};

  handleDelete = (value) => {};

  getRequest = (params) => {
    return testData({ ...params });
  };

  tableExtraRender = (_, data) => {
    return (
      <>
        <ProCard>
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Row">{data.length}</Descriptions.Item>
            <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
            <Descriptions.Item label="Association">
              <a>421421</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
            <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
          </Descriptions>
        </ProCard>
      </>
    );
  };

  params = { age: 20 };

  getColumn = () => [
    {
      title: '编号',
      dataIndex: 'id',
      width: 60,
      align: 'center',
      hideInForm: true,
      // children: [
      //   {
      //     title: 'money',
      //     dataIndex: 'money',
      //     valueType: 'money',
      //   },
      //   {
      //     title: 'name',
      //     dataIndex: 'name',
      //     valueType: 'text',
      //   },
      // ],
    },
    {
      title: '描述',
      dataIndex: 'desc',
      width: 80,
      align: 'center',
      copyable: true, //是否支持复制
      ellipsis: true, //是否自动缩略
      // valueEnum: { //枚举值显示
      //   all: {
      //     text: '全部',
      //     status: 'Default',
      //   },
      //}
      // valueType:'',//值的显示类型
      // | money | 转化值为金额 | ¥10,000.26 |
      // | date | 日期 | 2019-11-16 |
      // | dateRange | 日期区间 | 2019-11-16 2019-11-18 |
      // | dateTime | 日期和时间 | 2019-11-16 12:50:00 |
      // | dateTimeRange | 日期和时间区间 | 2019-11-16 12:50:00 2019-11-18 12:50:00 |
      // | time | 时间 | 12:50:00 |
      // | option | 操作项，会自动增加 marginRight，只支持一个数组,表单中会自动忽略 | `[<a>操作a</a>,<a>操作b</a>]` |
      // | text | 默认值，不做任何处理 | - |
      // | select | 选择 | - |
      // | textarea | 与 text 相同， form 转化时会转为 textarea 组件 | - |
      // | index | 序号列 | - |
      // | indexBorder | 带 border 的序号列 | - |
      // | progress | 进度条 | - |
      // | digit | [格式化](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)数字展示，form 转化时会转为 inputNumber | - |
      // | percent | 百分比 | +1.12 |
      // | code | 代码块 | `const a = b` |
      // | avatar | 头像 | 展示一个头像 |
      // | password | 密码框 | 密码相关的展示 |
      // hideInSearch:true,//在查询表单中不展示此项
      // hideInTable:true,//在查询表格中不展示此项
      // hideInForm:true,//在表单中不展示此项
      // filters:true,表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      // order:1, //查询表单中的权重，权重大排序靠前
      // renderFormItem: (item, { defaultRender, ...rest }, form) => { //渲染查询表单的输入组件
      //   const status = form.getFieldValue('status');

      //   if (`${status}` === '0') {
      //     return false;
      //   }

      //   if (`${status}` === '3') {
      //     return <Input {...rest} placeholder="请输入异常原因！" />;
      //   }

      //   return defaultRender(item);
      // },
      tooltip: '会在 title 之后展示一个 icon，hover 之后提示一些信息',
      // width: '30%',
      // search: false,
      // search.transform
    },
    {
      title: '时间区间',
      key: 'dateTimeRange',
      width: 100,
      align: 'center',
      dataIndex: 'createdAtRange',
      valueType: 'dateTimeRange',
      // hideInForm: true,
      // initialValue: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
      fieldProps: {
        className: `${style.pre}`,
      },
      search: {
        transform: (value) => ({
          //转化值的 key, 一般用于事件区间的转化
          startTime: value[0],
          endTime: value[1],
        }),
      },
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      width: 100,
      align: 'center',
      sorter: true,
      hideInForm: true,
      renderText: (val) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      // width: 100,
      hideInForm: false,
      initialValue: ['1', '2'],
      // initialValue: 0, //多选
      // valueType: 'select', // 表单类型和request一起使用
      // valueType: 'radio', //单选状态
      // valueType: 'radioButton', //单选按钮状态
      valueType: 'checkbox', //多选
      // valueEnum: {
      //   0: { text: '关闭', status: 'Default' },
      //   1: { text: '运行中', status: 'Processing' },
      //   2: { text: '已上线', status: 'Success' },
      //   3: { text: '异常', status: 'Error' },
      // },
      request: async () => [
        {
          label: '全部',
          value: '0',
          status: 'Default',
        },
        {
          label: '未解决',
          value: '1',
          status: 'Error',
        },
        {
          label: '已解决',
          value: '2',
          status: 'Success',
        },
        {
          label: '已上线',
          value: '3',
          status: 'Success',
        },
        {
          label: '解决中',
          value: '4',
          status: 'Processing',
        },
      ],
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      align: 'center',
      width: 100,
      sorter: true,
      valueType: 'dateTime',
      hideInForm: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      align: 'center',
      fixed: 'right',
      // fixed: 'left',
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
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          {/* <a
            onClick={() => {
              this.testData(record)
            }}
          >
            清空选中
          </a> */}
          <Divider type="vertical" />
        </>
      ),
    },
  ];

  headerTitle = () => {
    return (
      <Space>
        <LightFilterCustomTest />
      </Space>
    );
  };

  // renderCustomFormContent = () => {
  //   return (
  //     <LightFilterCustomTest />
  //   )
  // }
}

export default Index;
