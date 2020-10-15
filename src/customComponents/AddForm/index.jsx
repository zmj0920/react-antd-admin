import React, { Component,createRef } from 'react';
import { BackTop, Avatar, message, Form } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {pretreatmentRequestParams} from '../../utils/addfrom'
import CustomForm from '../CustomForm'
import styles from './index.less';


class AddFormBase extends CustomForm {
    formRef = createRef();
    constructor(props) {
        super(props);
    }
    
 //重置
    handleFormReset = () => {
        this.formRef.current.resetFields();
    };

    supplementSubmitRequestParams = o => o;


    afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => { };


    checkSubmitRequestParams = o => true;

    validate = () => {
        const {
            current: { validateFields },
        } = this.formRef
        const { dispatch } = this.props
        const { submitApiPath } = this.state;
        validateFields().then(values => {
            let submitData = pretreatmentRequestParams(values);
            submitData = this.supplementSubmitRequestParams(submitData);
            const checkResult = this.checkSubmitRequestParams(submitData);
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
                        this.setState({ processing: false });
                    }
                });
            }
        })
            .catch(errors => {
                const { errorFields } = errors
                const m = [];
                errorFields.forEach(o => {
                    m.push(o.errors);
                });
                message.warn(m.join(', '));
            });
    };

    pageHeaderLogo = () => <Avatar shape="square" icon="plus" />;

    formContent = () => null;

    renderOther = () => null;

    render() {
        const { pageName } = this.state;
        return (
             <PageHeaderWrapper title={pageName} logo={this.pageHeaderLogo()}>
                <div className={styles.containorBox}>
                    <Form ref={this.formRef} >
                        {this.formContent()}
                    </Form>
                    {this.renderOther()}
                </div>
                <BackTop />
            </PageHeaderWrapper>
        );
    }
}

export default AddFormBase;
