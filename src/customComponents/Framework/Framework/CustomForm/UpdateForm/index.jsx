import React from 'react';
import { Icon, Popover, message } from 'antd';

import { pretreatmentRequestParams } from '@/utils/tools';
import LoadDataForm from '@/customComponents/Framework/CustomForm/LoadDataForm';

import styles from './index.less';

class UpdateForm extends LoadDataForm {
  goToUpdateWhenProcessed = false;

  handleFormReset = () => {
    const { form } = this.props;

    form.resetFields();

    this.reloadData();
  };

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;

    const { errorFieldName } = this.state;

    const errors = getFieldsError();

    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }

    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };

    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{errorFieldName}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  supplementSubmitRequestParams = o => o;

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {};

  // eslint-disable-next-line no-unused-vars
  checkSubmitRequestParams = o => true;

  afterCheckSubmitRequestParams = o => o;

  validate = () => {
    
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;

    const { submitApiPath } = this.state;
    if ((submitApiPath || '') === '') {
      message.error(`缺少 submitApiPath 配置！`);
      return;
    }

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        let submitData = pretreatmentRequestParams(values);


        submitData = this.supplementSubmitRequestParams(submitData);

        const checkResult = this.checkSubmitRequestParams(submitData);

        submitData = this.afterCheckSubmitRequestParams(submitData);

        if (checkResult) {
          this.setState({ processing: true });
          dispatch({
            type: submitApiPath,
            payload: submitData,
          }).then(() => {
            
            if (this.mounted) {
              const remoteData = this.getApiData(this.props);

              const { dataSuccess } = remoteData;
            
              if (dataSuccess) {
                const { list: metaListData, data: metaData, extra: metaExtra } = remoteData;
                
                this.afterSubmitSuccess(
                  metaData || null,
                  metaListData || [],
                  metaExtra || null,
                  remoteData,
                  submitData,
                );
              }

              // eslint-disable-next-line react/no-unused-state
              this.setState({ processing: false }, () => {
                if (this.goToUpdateWhenProcessed) {
                  this.reloadByUrl();
                }
              });
            }
          });
        }
      }
    });
  };
}

export default UpdateForm;
