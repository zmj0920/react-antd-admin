import React from 'react';
import { Drawer, Icon } from 'antd';

import PagerList from '@/customComponents/Framework/CustomList/PagerList';

import styles from './index.less';

class PagerDrawer extends PagerList {
  constructor(props) {
    super(props);

    this.useParamsKey = false;

    const s = this.state;
    s.dataLoading = false;

    this.state = {
      ...s,
      ...{ visible: false, loadDataAfterMount: false },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;

    return { visible: visible || false, externalData: externalData || null };
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visiblePre === false && visible === true) {
      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

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

  hideDrawer = () => {
    this.onClose();
  };

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

export default PagerDrawer;
