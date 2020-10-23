import React, { Component, createRef } from 'react';
import { connect, history } from 'umi';
import { Row, Col, Divider, Form, Input, Icon, Button, message } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import AddFormBase from '@/customComponents/Framework/AddFormBase'
import {
  isUndefined,
} from '@/utils/tools';
@connect(({ user, global, loading }) => ({
  global,
  user,
  loading: loading.models.user,
}))
class Welcome extends PagerList {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        paramsKey: '938bdc77-66b5-4afe-835b-9aa64a7ead5b',
        // loadDataAfterMount: true,
        pageName: '添加信息',
         loadApiPath: 'user/testData',
         submitApiPath: 'user/testData',
      },
    };
  }
  adjustLoadRequestParams = o => {
    const d = o || {};
    if (isUndefined(d.pageSize)) {
      d.pageSize = 10;
    }
    if(isUndefined(d.pageNo)){
      d.pageNo = 1;
    }
    return d;
  };

  getApiData = props => {
    const {
      user: { data },
    } = props;

    return data;
  };

  // renderSimpleFormRow = () => {
  //   const { dataLoading, processing } = this.state;

  //   return (
  //     <>
  //       <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
  //         <Col md={15} sm={24}>
  //           {this.renderFormInputFormItem("姓名", "name", "", true, null, <SettingOutlined />)}
  //         </Col>
  //         {this.renderSimpleFormButton()}
  //       </Row>
  //     </>
  //   );
  // };
  getColumn = () => [
    {
      title: "id",
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: '描述',
      width: 200,
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      width: 200,
      sorter: true,
      hideInForm: true,
      renderText: (val) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      hideInForm: true,
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
      width: 100,
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
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
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];

  formContent = () => {

    return (
      <>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        { this.renderFormInputFormItem("姓名", "name", "", true, null, <SettingOutlined />)}
        { this.renderFormInputNumberFormItem("年龄", "age", null, true, null, {}, {}, '', false, this.onNumber)}
        {
          this.renderFromRadioCore(
            "姓名", "sex", 0,
            [{ name: "男", flag: 0 },
            { name: "女", flag: 1 }
            ])
        }
         <Button onClick={this.validate}>
          提交
           </Button>
      </>
    )
  }

}



export default Welcome