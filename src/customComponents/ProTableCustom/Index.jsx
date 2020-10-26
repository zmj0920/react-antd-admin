import { PureComponent, createRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Tag,
  Space,
  Divider,
  message,
  Input,
  Drawer
} from 'antd';
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
      row: null
    }
  }


  setRow = (entity) => {
    // this.setState({row:true})
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

  //刷新数据
  reloadData = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reload();
    }
  }

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
  pagination = true
  /**
   * 表格数据配置
   */
  dataSource = [{ "id": 99, "key": 99, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 99", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 510, "status": 2, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 19 }, { "id": 98, "key": 98, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 98", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 416, "status": 1, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 97 }, { "id": 97, "key": 97, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 97", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 182, "status": 1, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 48 }, { "id": 96, "key": 96, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 96", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 799, "status": 2, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 96 }, { "id": 95, "key": 95, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 95", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 34, "status": 2, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 1 }, { "id": 94, "key": 94, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 94", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 687, "status": 1, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 65 }, { "id": 93, "key": 93, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 93", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 255, "status": 2, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 64 }, { "id": 92, "key": 92, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 92", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 102, "status": 3, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 13 }, { "id": 91, "key": 91, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 91", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 359, "status": 2, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 21 }, { "id": 90, "key": 90, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 90", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 398, "status": 3, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 73 }, { "id": 89, "key": 89, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 89", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 355, "status": 0, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 94 }, { "id": 88, "key": 88, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 88", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 427, "status": 3, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 57 }, { "id": 87, "key": 87, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 87", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 571, "status": 0, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 98 }, { "id": 86, "key": 86, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 86", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 804, "status": 2, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 36 }, { "id": 85, "key": 85, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 85", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 252, "status": 0, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 56 }, { "id": 84, "key": 84, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 84", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 104, "status": 2, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 78 }, { "id": 83, "key": 83, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 83", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 244, "status": 3, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 64 }, { "id": 82, "key": 82, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 82", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 81, "status": 2, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 28 }, { "id": 81, "key": 81, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "name": "TradeCode 81", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 97, "status": 3, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 72 }, { "id": 80, "key": 80, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "name": "TradeCode 80", "owner": "曲丽丽", "desc": "这是一段描述", "callNo": 447, "status": 3, "updatedAt": "2020-10-26T06:34:17.289Z", "createdAt": "2020-10-26T06:34:17.289Z", "progress": 76 }]

  /**
   * 转化 moment 格式数据为特定类型，false 不做转化
   */
  dateFormatter="string"

  /**
   * 表头
   */
  headerTitle="高级表格"

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
  beforeSearchSubmit=(params)=>{
     console.log(params)
     return params
  }

  render() {
    const {
      createModalVisible,
      updateModalVisible,
      updateFormValues,
      selectedRowKeys,
      selectedRows,
    } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectRows,
    };

    return (
      <>
        <PageContainer>
          <ProTable
            columns={this.getColumn()}
            //不显示分页
            pagination={this.pagination}
            search={{
              labelWidth: 120,
            }}
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
