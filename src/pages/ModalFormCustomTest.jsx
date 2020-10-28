import React, { Component, createRef } from 'react';
import { connect } from 'umi';
import { Row, Col, Divider, Form, Input, Icon, Button, } from 'antd';
import ModalFormCustom from '@/customComponents/CustomForm/ModalFormCustom';
import moment from 'moment';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import style from './Welcome.less';
@connect(({ user, global, loading }) => ({
  global,
  user,
  loading: loading.models.user,
}))
class Welcome extends ModalFormCustom {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        pageName: '123',
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

  formContent = () => {
    return (
      <>
        <ProForm.Group title="基本信息">
          <ProFormText
            name="name"
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          <ProFormText name="company" label="我方公司名称" placeholder="请输入名称" />
          <ProFormText name="contract1" label="合同名称" placeholder="请输入名称" />
          <ProFormDateRangePicker
            name="contractTime"
            label="合同生效时间"
            initialValue={[moment('2020-10-28 08:55:54'), moment('2020-10-28 08:55:54')]}
          />
        </ProForm.Group>
        <ProForm.Group title="必填信息">
          <ProFormText name="contract1" label="合同名称" placeholder="请输入名称" />
          <ProFormDateRangePicker name="contractTime1" label="合同生效时间" />
        </ProForm.Group>
        <ProForm.Group title="选填信息">
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: '盖章后生效',
              },
            ]}
            width="xs"
            name="useMode"
            label="合同约定生效方式"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '履行完终止',
              },
            ]}
            name="unusedMode"
            label="合同约定失效效方式"
          />
        </ProForm.Group>
        <ProForm.Group title="项目信息">
          <ProFormText width="s" name="id" label="主合同编号" />
          <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
          <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
        </ProForm.Group>
      </>
    );
  };
}

export default Welcome;
