import { PureComponent, createRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Badge, Space, BackTop, Tag, message, Input, Descriptions } from 'antd';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

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
    };
  }

  /**
   * 加载更多
   */
  fetchMore = () => {
    if (this.actionRef.current) {
      this.actionRef.current.fetchMore();
    }
  };

  //刷新数据
  reloadData = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reload();
    }
  };

  /**
   * 重置到默认状态
   */
  fromReset = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reset();
    }
  };

  /**
   * 清空选中项
   */
  clearSelected = () => {
    if (this.actionRef.current) {
      this.actionRef.current.clearSelected();
    }
  };

  /**
   * 批量操作选择
   * @param {选择key*} selectedRowKeys
   * @param {选择的行数据*} selectedRows
   */
  handleSelectRows = (selectedRowKeys, selectedRows) => {
    // console.log(selectedRowKeys);

    this.setState({
      selectedRows: selectedRows,
      selectedRowKeys,
    });
  };

  /**
   * 清空选择数据
   */
  cleanSelectedRows = () => {
    this.setState({ selectedRows: [] });
  };

  //重写表格列表配置
  getColumn = () => [];

  /**
   * 新增弹框
   */
  onAdd = (visible) => {
    this.setState({ createModalVisible: visible });
  };

  /**
   * 修改表单弹窗
   * @param {} visible
   */
  onUpdate = (visible) => {
    this.setState({ updateModalVisible: visible });
  };

  /* 表单提交 */
  handleAdd = (value) => {};

  /* 修改表单提交 */
  handleUpdate = (value) => {};

  /**
   * 修改方法获取数据更新
   * @param {*} record
   */
  setUpdateFormValues = (record) => {
    this.setState({
      updateFormValues: record,
    });
  };

  /**
   * 批量删除
   */
  handleBatchDelete = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys);
    this.cleanSelectedRows();
    this.actionRef.current?.reloadAndRest?.();
  };

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
  };

  /**
   * 自定义批量操作工具栏左侧信息区域, false 时不显示
   */
  toolBarRender = () => {
    return [
      <Button type="primary" key="newButton" onClick={() => this.onAdd(true)}>
        <PlusOutlined /> 新建
      </Button>,
    ];
  };

  /**
   * 分页配置 false 不显示分页
   */
  // pagination = true

  /**
   * 分页配置
   */
  pagination = {
    showQuickJumper: false, //是否显示跳转页
    pageSize: 10, //配置默认显示数据条数
  };

  /**
   * 表格数据配置
   */
  dataSource = [
    {
      id: 99,
      key: 99,
      disabled: false,
      href: 'https://ant.design',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      name: 'TradeCode 99',
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: 510,
      status: 2,
      updatedAt: '2020-10-26T06:34:17.289Z',
      createdAt: '2020-10-26T06:34:17.289Z',
      progress: 19,
    },
    {
      id: 98,
      key: 98,
      disabled: false,
      href: 'https://ant.design',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      name: 'TradeCode 98',
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: 416,
      status: 1,
      updatedAt: '2020-10-26T06:34:17.289Z',
      createdAt: '2020-10-26T06:34:17.289Z',
      progress: 97,
    },
  ];

  /**
   * 转化 moment 格式数据为特定类型，false 不做转化
   */
  dateFormatter = 'string';

  /**
   * 表头
   */
  headerTitle = () => '高级表格';

  /**
   * 对request 请求数据进行处理
   * @param {*} data
   */
  postFn = (data) => {
    let array = data;
    for (let index = 0; index < array.length; index++) {
      array[index].city = '郑州';
    }
    // console.log(array)
    return array;
  };

  /**
   * 搜索前处理操作
   * @param {搜索参数} params
   */
  beforeSearchSubmit = (params) => {
    // console.log(params)
    return params;
  };

  /**
   * table 工具栏，设为 false 时不显示
   */
  options = { fullScreen: true, reload: true, setting: true, search: true };

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
    labelWidth: 120, //标签的宽度
    span: this.defaultColConfig, //搜索栏显示方式
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
  };

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
    console.log('重置表单');
  };

  /**
   * 表格嵌套
   */
  expandedRowRender = () => {
    const data = [];
    for (let i = 0; i < 3; i += 1) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return (
      <ProTable
        columns={[
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Upgrade Status',
            dataIndex: 'upgradeNum',
            key: 'upgradeNum',
          },
          {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            valueType: 'option',
            render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
          },
        ]}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={data}
        pagination={false}
      />
    );
  };

  renderBadge = (count) => (
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
  // toolbar = {
  //   multipleLine: true,
  //   filter: (
  //     <LightFilter
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       <ProFormDatePicker name="startdate" label="响应日期" />
  //     </LightFilter>
  //   ),
  //   tabs: {
  //     items: [
  //       {
  //         key: 'tab1',
  //         tab: '标签一',
  //       },
  //       {
  //         key: 'tab2',
  //         tab: '标签二',
  //       },
  //     ],
  //   },
  //   menu: {
  //     type: 'inline',
  //     items: [
  //       {
  //         label: <span>全部应用{this.renderBadge(101)}</span>,
  //         key: 'all',
  //       },
  //       {
  //         label: <span>我创建的应用{this.renderBadge(3)}</span>,
  //         key: 'todo',
  //       },
  //     ],
  //   },
  //   actions: [
  //     <Button key="primary" type="primary">
  //       新建应用
  //     </Button>,
  //   ],
  // }

  /**
   * 自定义工具栏渲染
   */
  toolbar = false;

  /**
   * 配置主题显示数据
   * @param {*} _
   * @param {*} data
   */
  tableExtraRender = (_, data) => {
    return null;
    // return (
    //   <>
    //     <ProCard>
    //       <Descriptions size="small" column={3}>
    //         <Descriptions.Item label="Row">{data.length}</Descriptions.Item>
    //         <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
    //         <Descriptions.Item label="Association">
    //           <a>421421</a>
    //         </Descriptions.Item>
    //         <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
    //         <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
    //       </Descriptions>
    //     </ProCard>
    //   </>
    // )
  };

  /**
   * 用于查询多余参数
   */
  params = {};

  /**
   * 数据加载失败
   */
  onRequestError = (error) => {};

  /**
   * 渲染表格请求函数
   * @param {请求参数} params
   */
  getRequest = (params) => {
    // return testData({ ...params })
  };

  /**
   * 扩展表单
   */
  renderCustomFormContent = () => null;

  /**
   * 自定义logo
   */
  pageHeaderLogo = () => 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4';

  /**
   * 批量操作
   */
  footerToolbar = () => {
    const { selectedRowKeys, selectedRows } = this.state;
    return (
      selectedRows?.length > 0 && (
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
              </a>{' '}
              项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            key="handleBatchDelete"
            onClick={() => {
              this.handleBatchDelete(selectedRowKeys, selectedRows);
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )
    );
  };

  /**
   * 头部显示内容配置
   */
  pageHeaderContent = () => null;

  render() {
    const {
      createModalVisible,
      updateModalVisible,
      updateFormValues,
      selectedRowKeys,
      pageName,
      showSelect: showSelectOption,
      showExpandedRowRender: showExpandedRowRenderOption,
      tableScroll, // 固定表格设置滚动条长度
      rowKey,
    } = this.state;

    const showSelect = showSelectOption || false;

    /**
     * 多选配置 state  showSelect 配置true显示默认隐藏
     */
    const rowSelection = !showSelect
      ? false
      : {
          selectedRowKeys,
          onChange: this.handleSelectRows,
        };

    const showExpandedRowRender = showExpandedRowRenderOption || false;

    /**
     * 嵌套表格state  showExpandedRowRender 配置true显示默认隐藏
     */
    const expandable = !showExpandedRowRender
      ? false
      : {
          expandedRowRender: this.expandedRowRender,
        };

    /**
     * 扩展配置
     */
    const standardTableCustomOption = {
      scroll: tableScroll,
      pagination: this.pagination,
      search: this.search,
      options: this.options,
      postData: this.postFn,
      dataSource: this.dataSource,
      dateFormatter: this.dateFormatter,
      tableAlertOptionRender: this.tableAlertOptionRender,
      toolBarRender: this.toolBarRender,
      beforeSearchSubmit: this.beforeSearchSubmit,
      form: this.form,
      onReset: this.resetFn,
      toolbar: this.toolbar,
      tableExtraRender: this.tableExtraRender,
      params: this.params,
      onRequestError: this.onRequestError,
    };

    return (
      <>
        <PageContainer
          title={pageName}
          avatar={{ src: this.pageHeaderLogo() }}
          content={this.pageHeaderContent()}
        >
          {this.renderCustomFormContent()}
          <ProTable
            {...standardTableCustomOption}
            columns={this.getColumn()}
            request={(params) => this.getRequest(params)}
            rowKey={rowKey || 'key'}
            headerTitle={this.headerTitle()}
            rowSelection={rowSelection}
            expandable={expandable}
            actionRef={this.actionRef}
          />
          <CreateForm
            onCancel={() => this.onAdd(false)}
            modalVisible={createModalVisible}
            modalTitle={'新建表单'}
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
          {this.footerToolbar()}
          {updateFormValues && Object.keys(updateFormValues).length ? (
            <UpdateForm
              onCancel={() => {
                this.onUpdate(false);
                this.setUpdateFormValues([]);
              }}
              modalTitle={'修改表单'}
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
          <BackTop />
        </PageContainer>
      </>
    );
  }
}

export default ProTableCustom;
