import React, { PureComponent, createRef } from 'react';
import { message, BackTop, Button } from 'antd';
import {
  PageHeaderWrapper,
  BasicLayout,
  FooterToolbar,
  PageContainer,
} from '@ant-design/pro-layout';
import ProForm, { StepsForm } from '@ant-design/pro-form';
import styles from './index.less';
import moment from 'moment';
import ProCard from '@ant-design/pro-card';
const waitTime = (time = 100) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
class StepsFormCustom extends PureComponent {
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
    render: (props) => {
      return (
        <>
          <Button id="next" key="next">
            下一步
      </Button>
          <Button type="primary" id="rest" onClick={() => props?.onReset?.()}>
            rest
        </Button>
        </>
      );
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
   * 当前执行步骤数
   */
  // current = 0

  /**
   * 执行步骤数触发事件
   */
  // onCurrentChange = (current) => {
  //   console.log(current)
  //   this.current = current
  // }

  stepsProps = {
    // direction: 'vertical', //指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向
    // className:'',//步骤条类名
    // initial:0, //起始条数
    // size:'small' //指定大小，
    // status:'error', //指定当前步骤的状态，可选 wait process finish error
  }

  render() {
    const { pageName } = this.state;
    return (
      <PageHeaderWrapper
        title={pageName}
        avatar={{
          src: this.pageHeaderLogo()
            ? ''
            : 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
        }}
      >
        <ProCard>
          <StepsForm
            formRef={this.formRef}
            current={this.current}
            // onCurrentChange={this.onCurrentChange}
            stepsProps={this.stepsProps}
            // submitter={this.submitter}
            onFinish={this.onFinish}
            dateFormatter={this.dateFormatter}
          >
            {this.formContent()}
          </StepsForm>
        </ProCard>
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default StepsFormCustom;
