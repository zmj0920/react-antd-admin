import React, { Component, createRef } from 'react';
import { connect, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './Welcome.less';
import { Card, Alert, Typography, Form, Input, Icon, Button, message } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
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
        loadDataAfterMount: true,
        pageName: '添加信息',
        loadApiPath: 'user/testData',
        // submitApiPath: 'user/testData',
      },
    };
  }


  getApiData = props => {
    const {
      user: { data },
    } = props;

    return data;
  };

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
        <Button onClick={this.testData}>
          提交
           </Button>
      </>
    )
  }

  getColumn = () => [
    {
      title: "id",
      dataIndex: 'id',
      width: 100,
      align: 'center',
    }
  ];

  
}



export default Welcome