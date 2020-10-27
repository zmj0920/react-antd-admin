# Ant Design Pro


#### 前言
以下文章纯属个人理解，便于记录学习，肯定有理解错误或理解不到位的地方，
意在站在前辈的肩膀，分享个人对技术的通俗理解，共同成长！

> Author:君吟
> Email: 506499594@qq.com  
> github: https://github.com/zmj0920/FleetingTime


#### 运行
```
npm run start
```

#### 打包
```
npm run build
```


## ProTable 基础使用规则
```jsx
import { PureComponent, createRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Tag,
  Space,
  Divider,
  message,
  Input,
  Drawer,
  Badge,
  Card,
  Descriptions
} from 'antd';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { testData } from '@/services/user'
import request from 'umi-request';
class ProTableCustom extends PureComponent {
  actionRef = createRef();
  constructor(props) {
    super(props);
    this.state = {
      createModalVisible: false,
      updateModalVisible: false,
      updateFormValues: null,
      selectedRows: [],
      selectedRowKeys: [],
    }
  }

  /**
   * 加载更多
   */
  fetchMore = () => {
    if (this.actionRef.current) {
      this.actionRef.current.fetchMore();
    }
  }

  //刷新数据
  reloadData = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reload();
    }
  }

  /**
   * 重置到默认状态
   */
  fromReset = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reset();
    }
  }

  /**
   * 清空选中项
   */
  clearSelected = () => {
    if (this.actionRef.current) {
      this.actionRef.current.clearSelected();
    }
  }

  /**
   * 批量操作选择
   * @param {选择key*} selectedRowKeys 
   * @param {选择的行数据*} selectedRows 
   */
  handleSelectRows = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys)
    this.setState({
      selectedRows: selectedRows,
      selectedRowKeys
    })
  }

  /**
   * 清空选择数据
   */
  cleanSelectedRows = () => {
    this.setState({ selectedRows: [] })
  };



  //重写表格列表配置
  getColumn = () => [];

  /**
   * 新增弹框
   */
  onAdd = (visible) => {
    this.setState({ createModalVisible: visible })
  };

  /**
   * 修改表单弹窗
   * @param {} visible 
   */
  onUpdate = (visible) => {
    this.setState({ updateModalVisible: visible })
  }

  /* 表单提交 */
  handleAdd = (value) => {

  }


  /* 修改表单提交 */
  handleUpdate = (value) => {

  }

  /**
   * 修改方法获取数据更新
   * @param {*} record 
   */
  setUpdateFormValues = (record) => {
    this.setState({
      updateFormValues: record
    })
  }

  /**
   * 批量删除
   */
  handleBatchRemove = (selectedRows) => {

  }

  /**
   * 自定义批量操作工具栏右侧选项区域, false 时不显示
   * @param {*} param0 
   */
  tableAlertOptionRender = ({ selectedRowKeys, selectedRows, onCleanSelected }) => {
    return (
      <Space size={16}>
        <a>导出数据</a>
        <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
          取消选择
        </a>
      </Space>
    );
  }

  /**
   * 自定义批量操作工具栏左侧信息区域, false 时不显示
   */
  toolBarRender = () => {
    return [
      <Button type="primary" onClick={() => this.onAdd(true)}>
        <PlusOutlined /> 新建
      </Button>,
    ]
  }

  /**
   * 分页配置 false 不显示分页
   */
  // pagination = true

  pagination = {
    showQuickJumper: false,//是否显示跳转页
    pageSize: 10,        //配置默认显示数据条数
  }


  /**
   * 表格数据配置
   */
  dataSource = [{
    "id": 99, "key": 99, "disabled": false, "href": "https://ant.design",
    "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
    "name": "TradeCode 99", "owner": "曲丽丽", "desc": "这是一段描述",
    "callNo": 510, "status": 2, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 19
  },
  {
    "id": 98, "key": 98, "disabled": false, "href": "https://ant.design", "avatar":
      "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
    "name": "TradeCode 98", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 416,
    "status": 1, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 97
  }]

  /**
   * 转化 moment 格式数据为特定类型，false 不做转化
   */
  dateFormatter = "string"

  /**
   * 表头显示配置可以返回jsx模板
   */
  headerTitle = "高级表格"

  /**
   * 对request 请求数据进行处理
   * @param {*} data 
   */
  postFn = (data) => {
    let array = data
    for (let index = 0; index < array.length; index++) {
      array[index].city = "郑州"
    }
    console.log(array)
    return array
  }

  /**
   * 搜索前处理操作
   * @param {搜索参数} params 
   */
  beforeSearchSubmit = (params) => {
    console.log(params)
    return params
  }

  /**
   * table 工具栏，设为 false 时不显示
   */
  options = { fullScreen: true, reload: true, setting: true, search: true, }



  /**
   * 不同屏幕显示方式
   */
  defaultColConfig = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 6,
  };

  /**
  * 设置搜索显示不显示search=false
  */

  search = {
    labelWidth: 120,//标签的宽度
    span: this.defaultColConfig,//搜索栏显示方式
    // searchText:'搜索',
    //resetText：'重置',
    // submitText:'提交'
    // defaultCollapsed: false,//设置面板默认值
    // filterType: 'light',//轻量级表格查询配置
    // collapsed:false,  //是否收起
    //是否收起事件
    // onCollapse: (collapsed)=>{
    //    console.log(collapsed)
    // },
    //搜索栏工具重写
    // optionRender: ({ searchText, resetText }, { form }) => [
    //   <Button
    //     key="searchText"
    //     type="primary"
    //     onClick={() => {
    //       form?.submit();
    //     }}
    //   >
    //     {searchText}
    //   </Button>,
    //   <Button
    //     key="resetText"
    //     onClick={() => {
    //       form?.resetFields();
    //     }}
    //   >
    //     {resetText}
    //   </Button>,
    //   <Button key="out">导出</Button>,
    // ],
    //收起按钮配置
    // collapseRender: (collapsed, showCollapseButton) => {
    //   return null
    // }
  }
  /**
   * 搜索表单数据获取antd form 的配置
   */
  form = {
    onValuesChange: (values, all) => {
      console.log(values, all);
    },
  };

  /**
   * 重置表单事件
   */
  resetFn = () => {
    console.log("重置表单")
  }


  /**
   * 表格嵌套
   */
  // expandedRowRender = () => {
  //   const data = [];
  //   for (let i = 0; i < 3; i += 1) {
  //     data.push({
  //       key: i,
  //       date: '2014-12-24 23:12:00',
  //       name: 'This is production name',
  //       upgradeNum: 'Upgraded: 56',
  //     });
  //   }
  //   return (
  //     <ProTable
  //       columns={[
  //         {
  //           title: 'Date',
  //           dataIndex: 'date',
  //           key: 'date',
  //         },
  //         {
  //           title: 'Name',
  //           dataIndex: 'name',
  //           key: 'name',
  //         },
  //         {
  //           title: 'Upgrade Status',
  //           dataIndex: 'upgradeNum',
  //           key: 'upgradeNum',
  //         },
  //         {
  //           title: 'Action',
  //           dataIndex: 'operation',
  //           key: 'operation',
  //           valueType: 'option',
  //           render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
  //         },
  //       ]}
  //       headerTitle={false}
  //       search={false}
  //       options={false}
  //       dataSource={data}
  //       pagination={false}
  //     />
  //   );
  // };

  /**
   * 关闭表格嵌套
   */
  expandedRowRender = false


  renderBadge = count => (
    <Badge
      count={count}
      style={{
        marginTop: -4,
        marginLeft: 4,
        color: '#999',
        backgroundColor: '#eee',
      }}
    />
  );

  /**
   * 自定义工具栏渲染
   */
  toolbar = {
    multipleLine: true,
    filter: (
      <LightFilter
        style={{
          marginTop: 8,
        }}
      >
        <ProFormDatePicker name="startdate" label="响应日期" />
      </LightFilter>
    ),
    tabs: {
      items: [
        {
          key: 'tab1',
          tab: '标签一',
        },
        {
          key: 'tab2',
          tab: '标签二',
        },
      ],
    },
    menu: {
      type: 'inline',
      items: [
        {
          label: <span>全部应用{this.renderBadge(101)}</span>,
          key: 'all',
        },
        {
          label: <span>我创建的应用{this.renderBadge(3)}</span>,
          key: 'todo',
        },
      ],
    },
    actions: [
      <Button key="primary" type="primary">
        新建应用
      </Button>,
    ],
  }

  /**
   * 自定义工具栏渲染
   */
  toolbar = false

  /**
   * 配置主题显示数据
   * @param {*} _ 
   * @param {*} data 
   */
  tableExtraRender = (_, data) => {
    // return null
    return (
      <>
        <Card>
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Row">{data.length}</Descriptions.Item>
            <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
            <Descriptions.Item label="Association">
              <a>421421</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
            <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
          </Descriptions>
        </Card>
      </>
    )
  }
  /**
   * 用于查询多余参数
   */
  params = {}

  /**
   * 数据加载失败
   */
  onRequestError = (error) => {

  }

  render() {
    const {
      createModalVisible,
      updateModalVisible,
      updateFormValues,
      selectedRowKeys,
      selectedRows,
    } = this.state
    /**
     * 多选配置
     */
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectRows,
    };

    const expandable = {
      expandedRowRender: this.expandedRowRender
    }

    return (
      <>
        <PageContainer>
          <ProTable
            columns={this.getColumn()}
            pagination={this.pagination}
            search={this.search}
            options={this.options}
            actionRef={this.actionRef}
            request={(params) => testData({ ...params })}
            postData={this.postFn}
            dataSource={this.dataSource}
            rowKey="key"
            dateFormatter={this.dateFormatter}
            headerTitle={this.headerTitle}
            rowSelection={rowSelection}
            tableAlertOptionRender={this.tableAlertOptionRender}
            toolBarRender={this.toolBarRender}
            beforeSearchSubmit={this.beforeSearchSubmit}
            form={this.form}
            onReset={this.resetFn}
            expandable={expandable}
            toolbar={this.toolbar}
            tableExtraRender={this.tableExtraRender}
            params={this.params}
            onRequestError={this.onRequestError}
          />
          {selectedRows?.length > 0 && (
            <FooterToolbar
              extra={
                <div>
                  已选择{' '}
                  <a
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {selectedRowKeys.length}
                  </a>{' '} 项&nbsp;&nbsp;
                   <span>
                    服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
                  </span>
                </div>
              }
            >
              <Button
                onClick={() => {
                  this.handleBatchRemove(selectedRows);
                  this.cleanSelectedRows();
                  this.actionRef.current?.reloadAndRest?.();
                }}
              >
                批量删除
            </Button>
              <Button type="primary">批量审批</Button>
            </FooterToolbar>
          )
          }
          <CreateForm
            onCancel={() => this.onAdd(false)}
            modalVisible={createModalVisible}
            modalTitle={"新建表单"}
          >
            <ProTable
              onSubmit={(value) => {
                this.handleAdd(value);
              }}
              rowKey="key"
              type="form"
              columns={this.getColumn()}
            />
          </CreateForm>

          {updateFormValues && Object.keys(updateFormValues).length ? (
            <UpdateForm
              onCancel={() => {
                this.onUpdate(false);
                this.setUpdateFormValues([]);
              }}
              modalTitle={"修改表单"}
              updateModalVisible={updateModalVisible}
            >
              <ProTable
                onSubmit={(value) => {
                  this.handleUpdate(value);
                }}
                rowKey="key"
                type="form"
                values={updateFormValues}
                columns={this.getColumn()}
              />
            </UpdateForm>
          ) : null}
        </PageContainer>
      </>
    );
  }
}

export default ProTableCustom;
```

## 继承ProTableCustom

```jsx
import React, { Component, createRef } from 'react';
import { connect, history } from 'umi';
import { Row, Col, Divider, Form, Input, Icon, Button, message, Popconfirm } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ProTableCustom from '@/customComponents/ProTableCustom';
import request from 'umi-request';
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
      copyable: true,//是否支持复制
      ellipsis: true,//是否自动缩略
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
      dataIndex: 'createdAtRange',
      valueType: 'dateTimeRange',
      search: {
        transform: value => ({//转化值的 key, 一般用于事件区间的转化
          startTime: value[0],
          endTime: value[1],
        }),
      },
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
      hideInForm: false,
      // initialValue: 'all',
      initialValue: ['all'], //多选
      // valueType: 'select', // 表单类型和request一起使用
      // valueType: 'radio', //单选状态
      // valueType: 'radioButton', //单选按钮状态
      valueType: 'checkbox',//多选
      request: async () => [
        {
          label: '全部',
          value: 'all',
          status: 'Default',
        },
        {
          label: '未解决',
          value: 'error',
          status: 'Error',
        },
        {
          label: '已解决',
          value: 'close',
          status: 'Success',
        },
        {
          label: '已上线',
          value: 'online',
          status: 'Success',
        },
        {
          label: '解决中',
          value: 'running',
          status: 'Processing',
        },

      ],
      // valueEnum: {
      //   all: {
      //     text: '全部',
      //     status: 'Default',
      //   },
      //   close: {
      //     text: '关闭',
      //     status: 'Default',
      //   },
      //   running: {
      //     text: '运行中',
      //     status: 'Processing',
      //   },
      //   online: {
      //     text: '已上线',
      //     status: 'Success',
      //   },
      //   error: {
      //     text: '异常',
      //     status: 'Error',
      //   },
      // },
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
      // fixed: 'right',
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
          <Divider type="vertical" />
          <a
            onClick={() => {
              this.clearSelected();
            }}
          >
            清空选中
          </a>
          <Divider type="vertical" />
        </>
      ),
    },
  ];
}

export default Welcome
```