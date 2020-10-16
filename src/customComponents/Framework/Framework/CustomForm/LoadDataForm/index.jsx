import React from 'react';
import { BackTop, Button, Avatar, Dropdown, Popconfirm, Icon, Menu, Tooltip, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { getDerivedStateFromPropsForUrlParams, defaultFormState } from '@/utils/tools';
import LoadDataCore from '@/customComponents/Framework/CustomForm/LoadDataCore';

import styles from './index.less';

const ButtonGroup = Button.Group;

class Index extends LoadDataCore {
  enableActionBack = true;

  actionBackProps = {};

  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      ...{
        showReloadButton: true,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  pageHeaderLogo = () => <Avatar shape="square" icon="plus" />;

  pageHeaderActionExtraGroup = () => null;

  pageHeaderActionBack = () => {
    const { backPath } = this.state;

    if (!this.enableActionBack) {
      return null;
    }

    if ((backPath || '') === '') {
      return null;
    }

    const props = { ...{ icon: 'rollback', type: 'dashed' }, ...(this.actionBackProps || {}) };

    return (
      <Tooltip placement="top" title="返回列表页">
        <Button
          {...props}
          onClick={e => {
            this.backToList(e);
          }}
        >
          列表页
        </Button>
      </Tooltip>
    );
  };

  pageHeaderAction = () => {
    const { dataLoading, reloading, refreshing, showReloadButton } = this.state;

    const buttonGroupData = this.pageHeaderActionExtraGroup();

    return (
      <>
        <div className={styles.buttonBox}>
          {(buttonGroupData || null) != null ? (
            <ButtonGroup>
              {(buttonGroupData.buttons || []).map(item => {
                const { confirmMode, confirmProps } = item;

                const { disabled, onClick } = item.buttonProps || {
                  onClick: () => {
                    message.error('缺少配置');
                  },
                };

                if (!(confirmMode || false) || disabled) {
                  return (
                    <Button key={item.key} {...(item.buttonProps || {})}>
                      {item.text || ''}
                    </Button>
                  );
                }

                const defaultConfirmProps = {
                  title: '确定进行操作吗？',
                  onConfirm: () => {
                    message.error('缺少配置');
                  },
                  okText: '确定',
                  cancelText: '取消',
                };

                const cp = {
                  ...defaultConfirmProps,
                  ...{
                    onConfirm: onClick,
                  },
                  ...(confirmProps || {}),
                };

                const { buttonProps } = item;

                delete cp.onClick;
                delete buttonProps.onClick;

                return (
                  <Popconfirm {...(cp || {})} key={item.key}>
                    <Button {...(buttonProps || {})}>{item.text || ''}</Button>
                  </Popconfirm>
                );
              })}

              {(buttonGroupData.menu || null) != null ? (
                (buttonGroupData.menu.items || []).length > 0 ? (
                  <Dropdown
                    overlay={
                      <Menu {...(buttonGroupData.menu.props || {})}>
                        {buttonGroupData.menu.items.map(item => (
                          <Menu.Item {...(item.props || {})} key={item.key}>
                            {item.children}
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                    placement="bottomRight"
                  >
                    <Button>
                      <Icon type="ellipsis" />
                    </Button>
                  </Dropdown>
                ) : null
              ) : null}
            </ButtonGroup>
          ) : null}

          {this.pageHeaderActionBack()}

          {showReloadButton ? (
            <Tooltip placement="top" title="刷新">
              <Button
                disabled={dataLoading || reloading || refreshing}
                loading={reloading || refreshing}
                className={styles.reloadButton}
                icon="reload"
                type="dashed"
                onClick={() => {
                  this.reloadData();
                }}
              />
            </Tooltip>
          ) : null}
        </div>
      </>
    );
  };

  formContent = () => null;

  render() {
    const { pageName } = this.state;

    return (
      <PageHeaderWrapper title={pageName} logo={this.pageHeaderLogo()}>
        <div className={styles.containorBox}>
          {this.formContent()}
          {this.renderOther()}
        </div>
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default Index;
