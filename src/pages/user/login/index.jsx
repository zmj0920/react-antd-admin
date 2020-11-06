import React, { useState } from 'react';
import { Link, connect } from 'umi';
import { message, Tabs, Checkbox } from 'antd';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import LoginMessage from '@/customComponents/LoginMessage';
import {
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  UserOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
const { TabPane } = Tabs;
import styles from './index.less';

const Login = (props) => {
  const [type, setType] = useState('account');
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const handleSubmit = (values, type) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        onFinish={(values) => {
          handleSubmit(values, type);
        }}
        submitter={{
          searchConfig: {
            submitText: '登录',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
      >
        <Tabs
          destroyInactiveTabPane
          animated={false}
          activeKey={type}
          onChange={(activeKey) => {
            setType(activeKey);
          }}
        >
          <TabPane tab="账户密码登录" key="account">
            {status === 'error' && loginType === 'account' && !submitting && (
              <LoginMessage content="账户或密码错误（admin/ant.design）" />
            )}
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: '#1890ff',
                    }}
                  />
                ),
              }}
              name="userName"
              placeholder="用户名: admin or user"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockTwoTone />,
              }}
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <div style={{ marginBottom: '20px' }}>
              <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
                自动登录
              </Checkbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
          </TabPane>
          <TabPane tab="手机号登录" key="mobile">
            {status === 'error' && loginType === 'mobile' && !submitting && (
              <LoginMessage content="验证码错误" />
            )}
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileTwoTone />,
              }}
              name="id"
              placeholder="请输入手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号!',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '不合法的手机号格式!',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailTwoTone />,
              }}
              captchaProps={{
                size: 'large',
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              placeholder="请输入验证码"
              onGetCaptcha={() => {
                message.success('验证码发送成功!');
              }}
            />
            <div style={{ marginBottom: '20px' }}>
              <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
                自动登录
              </Checkbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
          </TabPane>
        </Tabs>
      </ProForm>
      <div className={styles.other}>
        其他登录方式
        <AlipayCircleOutlined className={styles.icon} />
        <TaobaoCircleOutlined className={styles.icon} />
        <WeiboCircleOutlined className={styles.icon} />
        <Link className={styles.register} to="/user/register">
          注册账户
        </Link>
      </div>
    </div>
  );
};
export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
