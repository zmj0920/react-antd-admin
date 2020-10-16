import React, { Component, createRef } from 'react';
import { connect, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './Welcome.less';
import { Card, Alert, Typography, Form, Input, Icon, Button, message } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import AddFormBase from '../customComponents/Framework/AddFormBase'

@connect(({ user, global, loading }) => ({
  global,
  user,
  loading: loading.models.user,
}))
class Welcome extends AddFormBase {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        loadDataAfterMount: true,
        pageName: '添加信息',
        submitApiPath: 'user/testData',
      },
    };
  }


  getApiData = props => {
    const {
      user: { data },
    } = props;

    return data;
  };

  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
    console.log(listData)
  };


  checkSubmitRequestParams = o => {
    const { age } = o;
    if (age > 10) {
      message.warn('少年');
      return false
    }
    return true;
  };


  testData = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'user/testData',
      payload: {

      },
    }).then(() => {

      const data = this.getApiData(this.props);
      this.reloadData();
      console.log(data)

      //  history.push(`/`);
      //  history.push({
      //   pathname: '/test',
      //   query: {
      //     a: 'b',
      //   },
      // });
    });
  }


  // onTest = () => {

  //   // console.log(this.formRef.current)

  //   const {
  //     current: { getFieldsError },
  //   } = this.formRef
  //   const { dispatch } = this.props


  //   console.log(this.formRef)

  //   console.log(this.props)
  //   // dispatch

  //   this.formRef.current.validateFields().then(values => {
  //     // form.resetFields();
  //     console.log(values)
  //   })
  //     .catch(errors => {
  //       const { errorFields } = errors
  //       const m = [];
  //       errorFields.forEach(o => {
  //         console.log(o)
  //         m.push(o.errors);
  //       });

  //       message.warn(m.join(', '));
  //     });
  // }


  onTest = () => {
    this.formRef.current.validateFields().then(values => {
      console.log(values)
     
    })
  }

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



  //   render() {

  //     return (
  //       <PageContainer>
  //         <Card>
  //           <Form
  //             {...layout}
  //             name="basic"
  //             ref={this.formRef}
  //           //   initialValues={{ remember: true }}
  //           // onFinish={this.onFinish}
  //           // onFinishFailed={this.onFinishFailed}
  //           >

  //             {/* <Form.Item {...tailLayout}>
  //               <Button type="primary" htmlType="submit">
  //                 Submit
  //               </Button>
  //             </Form.Item> */}
  //           </Form>

  //           <Button onClick={this.onTest}>
  //             提交
  //           </Button>
  //           <Typography.Text strong>
  //             高级表格{' '}
  //             <a href="https://protable.ant.design/" rel="noopener noreferrer" target="__blank">
  //               欢迎使用
  //             </a>
  //           </Typography.Text>
  //           <CodePreview>yarn add @ant-design/pro-table</CodePreview>
  //           <Typography.Text
  //             strong
  //             style={{
  //               marginBottom: 12,
  //             }}
  //           >
  //             高级布局{' '}
  //             <a href="https://prolayout.ant.design/" rel="noopener noreferrer" target="__blank">
  //               欢迎使用
  //             </a>
  //           </Typography.Text>
  //           <CodePreview>yarn add @ant-design/pro-layout</CodePreview>

  //         </Card>
  //       </PageContainer>
  //     )
  //   }
}



export default Welcome