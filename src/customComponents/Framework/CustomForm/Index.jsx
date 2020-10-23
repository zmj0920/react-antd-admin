import React,{PureComponent} from 'react';
import {
    Form,
    Input,
    InputNumber,
    Radio
} from 'antd';
import {
    buildFieldDescription,
    isFunction,
    formatDatetime,
    buildFieldHelper
} from '@/utils/tools'
const FormItem = Form.Item

class Index extends PureComponent {

    constructor(props) {
        super(props)
    }
    /** 输入框
        * 
        * @param {标题} label 
        * @param {key} name 
        * @param {默认值} value 
        * @param {必填} required 
        * @param {描述说明详情} helper 
        * @param {显示Icon} addonBefore 
        * @param {扩展属性} inputProps 
        * @param {样式控制} formItemLayout 
        * @param {提示语} reminderPrefix 
        * @param {正则匹配扩展 { pattern:new RegExp('^[0-9a-zA-Z_]{1,}$','g'),message:'只允许包含数字、字母、下划线'}} pattern 
        * @param {禁用} disabled 
        * @param {回调函数} onChangeCallback 
        */
    renderFormInputFormItem = (
        label,
        name,
        value = '',
        required = false,
        helper = null,
        addonBefore = null,
        inputProps = {},
        formItemLayout = {},
        reminderPrefix = '输入',
        pattern = {},
        disabled = false,
        onChangeCallback
    ) => {
        const title = label;
        const otherInputProps = {
            ...{
                addonBefore: addonBefore,
                placeholder: buildFieldDescription(title, reminderPrefix),
                disabled,
                onChange: (v, option) => {
                    if (isFunction(onChangeCallback)) {
                        onChangeCallback(v, option);
                    }
                }
            },
            ...(inputProps || {}),
        };
        return (
            <FormItem
                {...formItemLayout}
                label={title}
                extra={helper}
                name={name}
                rules={[
                    { required, message: buildFieldDescription(title, reminderPrefix) },
                    pattern
                ]}
            >
                <Input value={value} {...otherInputProps} />
            </FormItem>
        );
    }

    renderFormInputNumberFormItem = (
        label,
        name,
        value = 0,
        required = false,
        helper = null,
        inputNumberProps = {},
        formItemLayout = {},
        reminderPrefix = '输入',
        disabled = false,
        onChangeCallback
    ) => {

        const title = label;
        const otherInputNumberProps = {
            ...{
                style: { width: '100%' },
                min: 0,
                placeholder: buildFieldDescription(title, reminderPrefix),
                disabled,
                onChange: (v, option) => {
                    if (isFunction(onChangeCallback)) {
                        onChangeCallback(v, option);
                    }
                }
            },
            ...(inputNumberProps || {}),
        };

        return (

            <FormItem
                {...formItemLayout}
                label={title}
                extra={helper}
                name={name}
                rules={[
                    { required, message: buildFieldDescription(title, reminderPrefix) },
                ]}
            >
                <InputNumber {...otherInputNumberProps} value={value} />
            </FormItem>
        );
    }
    renderFromRadioCore = (
        label,
        name,
        value,
        listDataSource,
        onChangeCallback,
        radioProps = {},
        formItemLayout = {},
        helper = null
    ) => {
        const listData = listDataSource || [];
        const title = label;
        const otherRadioProps = {
            ...(radioProps || {}),
        };



        onchange = e => {
            if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
            }
        }

        return (
            <Form.Item name={name} {...(formItemLayout || {})} label={title} extra={helper}>
                <Radio.Group {...otherRadioProps} defaultValue={value}>
                    {
                        listData.length > 0 ? listData.map(value => {
                            return <Radio key={value.flag} value={value.flag}>{value.name}</Radio>
                        }) : null
                    }
                </Radio.Group>
            </Form.Item>
            // <FormItem name={name} {...(formItemLayout || {})} label={title} extra={helper}>
            //     <Radio.Group {...otherRadioProps} onChange={this.onChange} defaultValue={value}>
            //         {
            //             listData.length > 0 ? listData.map(value => {
            //                 return <Radio key={value.flag} value={value.flag}>{value.name}</Radio>
            //             }) : null
            //         }

            //     </Radio.Group>
            // </FormItem>
        )
    };




}

export default Index
