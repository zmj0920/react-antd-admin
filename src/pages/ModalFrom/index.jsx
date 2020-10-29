import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect, PureComponent } from 'react';
import { Spin, Row, Col, Button } from 'antd';
import styles from './index.less';
import DrawerFormCustomTest from './DrawerFormCustomTest';
import ModalFormCustomTest from './ModalFormCustomTest';
import ModalStepsFormCustomTest from './ModalStepsFormCustomTest';
import LightFilterCustomTest from './LightFilterCustomTest';
import { PlusOutlined } from '@ant-design/icons';
class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  stepsFormVisible = () => {
    this.setState({
      visible: true,
    });
  };
  render() {
    const { visible } = this.state;
    return (
      <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
        <Row gutter={24}>
          <Col md={6}>
            <DrawerFormCustomTest />
          </Col>
          <Col md={6}>
            <ModalFormCustomTest />
          </Col>
          <Col md={6}>
            <ModalStepsFormCustomTest />
          </Col>
          <Col md={6}>
            <LightFilterCustomTest />
          </Col>
        </Row>
      </PageContainer>
    );
  }
}

export default index;
