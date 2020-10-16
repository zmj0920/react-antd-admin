import React from 'react';
import { Drawer, Icon } from 'antd';

import SingleList from '@/customComponents/Framework/CustomList/SingleList';

import styles from './index.less';

class ListDrawer extends SingleList {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      visible: false,
      dataLoading: false,
      loadDataAfterMount: false,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;

    return { visible, externalData };
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visible && !visiblePre) {
      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {};

  onClose = () => {
    const { afterClose } = this.props;
    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  buildTableOtherConfig = () => ({
    styleSet: {
      height: 'calc(100% - 57px)',
    },
  });

  renderTitleIcon = () => <Icon type="read" className={styles.titleIcon} />;

  render() {
    const { width: widthDrawer } = this.props;
    const { visible } = this.state;

    return (
      <Drawer
        title={
          <span>
            {this.renderTitleIcon()}
            {this.getPageName()}
          </span>
        }
        destroyOnClose={false}
        className={styles.containorBox}
        width={widthDrawer}
        placement="right"
        visible={visible || false}
        maskClosable={false}
        onClose={this.onClose}
        // style={{
        //   height: 'calc(100% - 55px)',
        // }}
      >
        <div
          style={{
            height: 'calc(100vh - 103px)',
          }}
        >
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderTable()}
          </div>
        </div>
      </Drawer>
    );
  }
}

export default ListDrawer;
