import React, { PureComponent, createRef } from 'react';
import { message, Button } from 'antd';
import {
  FooterToolbar,
  PageContainer,
} from '@ant-design/pro-layout';
import ProForm, { ModalForm } from '@ant-design/pro-form';
import styles from './index.less';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
const waitTime = (time = 100) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
class ModalFormCustom extends PureComponent {
  formRef = createRef();
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 自定义logo
   */
  pageHeaderLogo = () => null;

  /**
   * 表单内容
   */
  formContent = () => null;

  /**
   * 固定页脚提交
   */
  // submitter={
  //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
  // }
  
  /**
   * 配置，重置提交按钮
   */
  submitter = {
    render: (dom) => {
      const { form } = dom;
      return [
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          提交1
        </Button>,
        <Button
          key="rest"
          type="primary"
          onClick={() => {
            form.resetFields();
          }}
        >
          重置
        </Button>,
        <Button id="submit" key="submit" type="primary" onClick={(e) => { }}>
          重置测试
        </Button>,
      ];
    },
  };

  /**
   * 表单提交事件
   * @param {提交参数} values
   */
  onFinish = async (values) => {
    await waitTime(2000);
    console.log(values);
    message.success('提交成功！');
  };

  /**
   * 转化 moment 格式数据为特定类型，false 不做转化
   */
  dateFormatter = 'string';

  /**
   * 弹窗按钮自定义
   */
  trigger = () => {
    return (
      <Button type="primary">
        <PlusOutlined />
      新建表单
      </Button>
    )
  }

  render() {
    return (
      <ModalForm
        trigger={this.trigger()}
        formRef={this.formRef}
        initialValues={{
          name: '签约客户名称',
          company: '我方公司名称',
        }}
        submitter={this.submitter}
        onFinish={this.onFinish}
        dateFormatter={this.dateFormatter}
      >
        {this.formContent()}
      </ModalForm>
    );
  }
}

export default ModalFormCustom;
