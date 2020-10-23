import React, { createRef } from 'react';
import { BackTop, message, Form, } from 'antd';
import { PageHeaderWrapper, } from '@ant-design/pro-layout';
import { pretreatmentRequestParams } from '@/utils/tools'
import CustomForm from '../CustomForm'
import styles from './index.less';

class AddFormBase extends CustomForm {
    formRef = createRef();
    /**
     * 重置表单
     */
    handleFormReset = () => {
        this.formRef.current.resetFields();
        this.reloadData();
    };

    /**
     * 扩展发送参数函数
     * @param {扩展发送参数} o 
     * 
     * supplementSubmitRequestParams = o => {
     * const d = o;
     * const { goodsType, businessId } = this.state;
     * d.goodsType = goodsType;
     * d.businessId = businessId;
     * return d;
     * };
     */
    supplementSubmitRequestParams = o => o;

    /**
     * 请求成功返回数据扩展
     * @param {*} singleData 
     * @param {*} listData 
     * @param {*} extra 
     * @param {*} responseOriginalData 
     * @param {*} submitData 
     */
    afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => { };

    /**
     * 自定义校验扩展函数
     * @param {自定义校验数据扩展} o 
     * checkSubmitRequestParams = o => {
     * const { age } = o;
     * if (age > 10) {
     * message.warn('少年');
     * return false
     * }
     * return true;
     * }
     */
    checkSubmitRequestParams = o => true;
    /**
     * 默认添加数据表单请求函数
     */
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
    /**
     * 自定义logo
     */
    pageHeaderLogo = () => null;

    /**
     * 表单内容
     */
    formContent = () => null;

    /**
     * 扩展组件
     */
    renderOther = () => null;

    render() {
        const { pageName } = this.state;
        return (
            <PageHeaderWrapper title={pageName} avatar={{ src: this.pageHeaderLogo() ? '' : 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}>
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
