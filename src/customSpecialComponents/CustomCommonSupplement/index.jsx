import React from 'react';
import { Form, Select, DatePicker, Radio } from 'antd';

import {
  getDerivedStateFromPropsForUrlParams,
  refitCommonData,
  isInvalid,
  searchFromList,
  buildFieldDescription,
  refitFieldDecoratorOption,
  isFunction,
  buildFieldHelper,
} from '../../utils/tools';
import CustomCommonCore from '../../customComponents/Framework/CustomCommonCore';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;

const unlimitedWithNumberFlag = {
  key: -10000,
  name: '不限',
  flag: -10000,
};

const unlimitedWithStringFlag = {
  key: '-10000',
  name: '不限',
  flag: '-10000',
};

const unlimitedWithNumberSelect = {
  key: -10000,
  name: '选择',
  flag: -10000,
};
/**
 * 该类作为特有项目的补充，视具体项目进行增部方法
 *
 * @class Index
 * @extends {CustomCommonCore}
 */
class Index extends CustomCommonCore {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  renderSearchBatchDateFormItem = (label = '出库批次') => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '出库批次';

    return (
      <FormItem label={title}>
        {getFieldDecorator('batchDate', {
          rules: [
            {
              required: false,
              message: buildFieldDescription(title, '选择'),
            },
          ],
        })(
          <DatePicker
            placeholder={buildFieldDescription(title, '选择')}
            format="YYYY-MM-DD"
            onChange={this.onBatchDateChange}
            style={{ width: '100%' }}
          />,
        )}
      </FormItem>
    );
  };

  rankList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = (global.rankList || []).map(o => {
      const d = o;
      d.flag = d.rankId;

      return d;
    });

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getRankName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('rankId', v, this.rankList(false));
    return item == null ? '未知' : item.name;
  };

  renderRankOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.rankList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchRankFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '商品品类',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品品类';

    return (
      <FormItem label={title}>
        {getFieldDecorator('rankId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRankOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormRankSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '商品类别',
    formItemLayout = null,
    required = false,
    name = 'rankId',
    otherProps = null,
  ) => {
    const title = label || '商品类别';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderRankOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  brandList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = (global.brandList || []).map(o => {
      const d = o;
      d.flag = d.brandId;

      return d;
    });

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getBrandName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('brandId', v, this.brandList(false));
    return item == null ? '未知' : item.name;
  };

  renderBrandOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.brandList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchBrandFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '商品品牌',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品品牌';

    return (
      <FormItem label={title}>
        {getFieldDecorator('brandId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderBrandOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  simpleTicketRankList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = (global.simpleTicketRankList || []).map(o => {
      const d = o;
      d.flag = d.simpleTicketRankId;

      return d;
    });

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getSimpleTicketRankName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('simpleTicketRankId', v, this.simpleTicketRankList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketRankOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketRankList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDetailNameOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketRankList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  }

  renderSearchSimpleTicketRankFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '票务品类',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '票务品类';

    return (
      <FormItem label={title}>
        {getFieldDecorator('simpleTicketRankId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketRankOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketRankFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '所属品类',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '所属品类';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'simpleTicketRankId',
          refitFieldDecoratorOption(
            value === null ? undefined : value.simpleTicketRankId || undefined,
            value === null ? undefined : value.simpleTicketRankId || undefined,
            undefined,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            },
          ),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderSimpleTicketRankOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  productSaleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const productSaleTypeList = global.productSaleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(productSaleTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(productSaleTypeList);
  };

  getProductSaleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productSaleTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductSaleTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productSaleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductSaleTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '销售类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '销售类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('saleType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductSaleTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormProductSaleTypeSelectFormItem = (
    value,
    helper = buildFieldHelper('商品的销售模式'),
    onChangeCallback,
    label = '销售类型',
    formItemLayout = null,
    required = false,
    name = 'saleType',
    otherProps = null,
  ) => {
    const title = label || '销售类型';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderProductSaleTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productDistributionModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const DistributionMode = global.DistributionMode || [];
    if (withUnlimited) {
      return refitCommonData(DistributionMode, unlimitedWithNumberFlag);
    }

    return refitCommonData(DistributionMode);
  };

  getDistributionModeTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productDistributionModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductDistributionModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productDistributionModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  }

  renderFormProductDistributionModeSelectFormItem = (
    value,
    helper = buildFieldHelper('商品的配送模式'),
    onChangeCallback,
    label = '配送模式',
    formItemLayout = null,
    required = false,
    name = 'distributionMode',
    otherProps = null,
  ) => {
    const title = label || '配送模式';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderProductDistributionModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  }

  spuRankList = (withUnlimited = true) => {
    const { global } = this.props;

    const spuRankList = global.spuRankList.map(item => ({ ...item, flag: item.rankId })) || [];

    if (withUnlimited) {
      return refitCommonData(spuRankList, unlimitedWithNumberFlag);
    }
    return refitCommonData(spuRankList);
  };

  spuRankListName = (v, defaultValue = '') => {

    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.spuRankList(false));
    return item == null ? '未知' : item.name;
  };

  renderSpuRankListOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.spuRankList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSpuRankListStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '商品品类',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品品类';

    return (
      <FormItem label={title}>
        {getFieldDecorator('rankId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSpuRankListOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  productSPUStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const productSpuStateList = global.productSpuStateList || [];
    if (withUnlimited) {
      return refitCommonData(productSpuStateList, unlimitedWithNumberFlag);
    }
    return refitCommonData(productSpuStateList);
  };

  getProductSPUStateName = (v, defaultValue = '') => {

    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productSPUStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductSPUStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productSPUStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductSPUStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '商品状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductSPUStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  productList = (withUnlimited = true) => {
    const { global } = this.props;

    let storeList = global.storeList || [];
    storeList = storeList.map((item, index) => {
      const { storeId, storeName } = item;
      return {
        flag: storeId,
        name: storeName,
        key: index
      }
    })
    if (withUnlimited) {
      return refitCommonData(storeList, unlimitedWithNumberFlag);
    }
    return refitCommonData(storeList);
  };

  getStoreListTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productStoreList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductListOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  }

  renderFormProductListSelectFormItem = (
    value,
    helper = buildFieldHelper('商家列表'),
    onChangeCallback,
    label = '商家列表',
    formItemLayout = null,
    required = false,
    name = 'storeId',
    otherProps = null,
  ) => {
    const title = label || '商家列表';
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderProductListOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  }
  productStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const productStateList = global.productStateList || [];

    if (withUnlimited) {
      return refitCommonData(productStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(productStateList);
  };

  getProductStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '产品状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '产品状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };




  noOneselfAreaAgentCityList = (withUnlimited = true) => {
    const { global } = this.props;

    const noOneselfAreaAgentCityList = global.noOneselfAreaAgentCityList || [];

    if (withUnlimited) {
      return refitCommonData(noOneselfAreaAgentCityList, unlimitedWithNumberFlag);
    }

    return refitCommonData(noOneselfAreaAgentCityList);
  };

  getNoOneselfAreaAgentCityListStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.noOneselfAreaAgentCityList(false));
    return item == null ? '未知' : item.name;
  };

  renderNoOneselfAreaAgentCityListOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.noOneselfAreaAgentCityList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchNoOneselfAreaAgentCityFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '城市',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const title = label || '城市';
    // const { global } = this.props;

    // const noOneselfAreaAgentCityList = global.noOneselfAreaAgentCityList || [];
    // if(noOneselfAreaAgentCityList[0]!=undefined){
    //       initialValue=noOneselfAreaAgentCityList[0].flag
    //       console.log(initialValue)
    // }
    return (
      <FormItem label={title}>
        {getFieldDecorator('city', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderNoOneselfAreaAgentCityListOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };





  renderFormProductStateFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '商品状态',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品状态';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'state',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderProductStateOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  productBuyTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const productBuyTypeList = global.productBuyTypeList || [];

    if (withUnlimited) {
      return refitCommonData(productBuyTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(productBuyTypeList);
  };

  getProductBuyTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productBuyTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductBuyTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productBuyTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductBuyTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '售卖方式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '售卖方式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('buyType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductBuyTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  productSaleTimeModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const productSaleTimeModeList = global.productSaleTimeModeList || [];

    if (withUnlimited) {
      return refitCommonData(productSaleTimeModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(productSaleTimeModeList);
  };

  getProductSaleTimeModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productSaleTimeModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductSaleTimeModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productSaleTimeModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductSaleTimeModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '定时上下架模式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '定时上下架模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('saleTimeMode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductSaleTimeModeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormProductSaleTimeModeFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '定时上下架模式',
    formItemLayout = null,
    required = false,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '定时上下架模式';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'saleTimeMode',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderProductSaleTimeModeOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  planSaleStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const planSaleStateList = global.planSaleStateList || [];

    if (withUnlimited) {
      return refitCommonData(planSaleStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(planSaleStateList);
  };

  getPlanSaleStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.planSaleStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderPlanSaleStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.planSaleStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPlanSaleStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '预售状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '预售状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPlanSaleStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  statisticModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const statisticModeList = global.statisticModeList || [];

    if (withUnlimited) {
      return refitCommonData(statisticModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(statisticModeList);
  };

  getStatisticModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.statisticModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderStatisticModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.statisticModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchStatisticModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '统计模式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '统计模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('mode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderStatisticModeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  merchantSaleStatisticShowModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantSaleStatisticShowModeList = global.merchantSaleStatisticShowModeList || [];

    if (withUnlimited) {
      return refitCommonData(merchantSaleStatisticShowModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantSaleStatisticShowModeList);
  };

  getMerchantSaleStatisticShowModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantSaleStatisticShowModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantSaleStatisticShowModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.merchantSaleStatisticShowModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantSaleStatisticShowModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '显示模式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '显示模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('showMode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantSaleStatisticShowModeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  discountActivitiesGoodsTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const discountActivitiesGoodsTypeList = global.discountActivitiesGoodsTypeList || [];

    if (withUnlimited) {
      return refitCommonData(discountActivitiesGoodsTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(discountActivitiesGoodsTypeList);
  };

  getDiscountActivitiesGoodsTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.discountActivitiesGoodsTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderDiscountActivitiesGoodsTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.discountActivitiesGoodsTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchDiscountActivitiesGoodsTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '商品类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('goodsType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDiscountActivitiesGoodsTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormDiscountActivitiesGoodsTypeFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '商品类型',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品类型';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'goodsType',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderDiscountActivitiesGoodsTypeOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  discountActivitiesStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const discountActivitiesStateList = global.discountActivitiesStateList || [];

    if (withUnlimited) {
      return refitCommonData(discountActivitiesStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(discountActivitiesStateList);
  };

  getDiscountActivitiesStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.discountActivitiesStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderDiscountActivitiesStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.discountActivitiesStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchDiscountActivitiesStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '活动状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '活动状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDiscountActivitiesStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormDiscountActivitiesStateFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'state',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderDiscountActivitiesStateOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  userOrderStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const userOrderStateList = global.userOrderStateList || [];

    if (withUnlimited) {
      return refitCommonData(userOrderStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userOrderStateList);
  };

  getUserOrderStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userOrderStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserOrderStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.userOrderStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchUserOrderStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '订单状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '订单状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserOrderStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  payTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const payTypeList = global.payTypeList || [];

    if (withUnlimited) {
      return refitCommonData(payTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(payTypeList);
  };

  getPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.payTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderPayTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.payTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPayTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '付款方式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '付款方式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('payType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPayTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  userOrderOutboundHistoryTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const userOrderOutboundHistoryTypeList = global.userOrderOutboundHistoryTypeList || [];

    if (withUnlimited) {
      return refitCommonData(userOrderOutboundHistoryTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userOrderOutboundHistoryTypeList);
  };

  getUserOrderOutboundHistoryTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userOrderOutboundHistoryTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserOrderOutboundHistoryTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.userOrderOutboundHistoryTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchUserOrderOutboundHistoryTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '出库类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '出库类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserOrderOutboundHistoryTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  userTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const userTypeList = global.userTypeList || [];

    if (withUnlimited) {
      return refitCommonData(userTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userTypeList);
  };

  getUserTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.userTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchUserTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '用户类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '用户类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormUserTypeFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '用户类型',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '用户类型';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'type',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderUserTypeOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  clientTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const clientTypeList = global.clientTypeList || [];

    if (withUnlimited) {
      return refitCommonData(clientTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(clientTypeList);
  };

  getClientTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.clientTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderClientTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.clientTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchClientTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '终端类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '终端类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('clientType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderClientTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  areaAgentRoleStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaAgentRoleStateList = global.areaAgentRoleStateList || [];

    if (withUnlimited) {
      return refitCommonData(areaAgentRoleStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaAgentRoleStateList);
  };

  getRoleStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAgentRoleStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderRoleStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaAgentRoleStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchRoleStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '角色状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '角色状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRoleStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  replenishmentReasonTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const replenishmentReasonTypeList = global.replenishmentReasonTypeList || [];

    if (withUnlimited) {
      return refitCommonData(replenishmentReasonTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(replenishmentReasonTypeList);
  };

  getReplenishmentReasonTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentReasonTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentReasonTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentReasonTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentReasonTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '原因类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '原因类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('reasonType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderReplenishmentReasonTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  userOrderTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const userOrderTypeList = global.userOrderTypeList || [];

    if (withUnlimited) {
      return refitCommonData(userOrderTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userOrderTypeList);
  };

  getUserOrderTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userOrderTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserOrderTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.userOrderTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchUserOrderTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '订单类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '订单类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserOrderTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  replenishmentTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const replenishmentTypeList = global.replenishmentTypeList || [];

    if (withUnlimited) {
      return refitCommonData(replenishmentTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(replenishmentTypeList);
  };

  getReplenishmentTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '售后类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '售后类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderReplenishmentTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  replenishmentStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const replenishmentStateList = global.replenishmentStateList || [];

    if (withUnlimited) {
      return refitCommonData(replenishmentStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(replenishmentStateList);
  };

  getReplenishmentStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '售后状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '售后状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderReplenishmentStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  genderList = (withUnlimited = true) => {
    const { global } = this.props;

    const genderList = global.genderList || [];

    if (withUnlimited) {
      return refitCommonData(genderList, unlimitedWithNumberFlag);
    }

    return refitCommonData(genderList);
  };

  getGenderName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.genderList(false));
    return item == null ? '未知' : item.name;
  };

  renderGenderOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.genderList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchGenderFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '用户性别',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '用户性别';

    return (
      <FormItem label={title}>
        {getFieldDecorator('sex', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGenderOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  productUnitList = (withUnlimited = true) => {
    const { global } = this.props;

    const productUnitList = global.productUnitList || [];

    if (withUnlimited) {
      return refitCommonData(productUnitList, unlimitedWithStringFlag);
    }

    return refitCommonData(productUnitList);
  };

  getProductUnitName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productUnitList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductUnitOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productUnitList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductUnitFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '计量单位',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '计量单位';

    return (
      <FormItem label={title}>
        {getFieldDecorator('unit', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductUnitOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormProductUnitFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '计量单位',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '计量单位';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'unit',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderProductUnitOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  simpleTicketUnitList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketUnitList = global.simpleTicketUnitList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketUnitList, unlimitedWithStringFlag);
    }

    return refitCommonData(simpleTicketUnitList);
  };

  getSimpleTicketUnitName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketUnitList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketUnitOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketUnitList(withUnlimited);

    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketUnitFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '计量单位',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '计量单位';

    return (
      <FormItem label={title}>
        {getFieldDecorator('unit', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketUnitOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketUnitFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '计量单位',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '计量单位';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'unit',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderSimpleTicketUnitOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  refundOrderHandleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const refundOrderHandleTypeList = global.refundOrderHandleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(refundOrderHandleTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(refundOrderHandleTypeList);
  };

  getRefundOrderHandleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderHandleTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderRefundOrderHandleTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderHandleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRefundOrderHandleTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderHandleTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchRefundOrderHandleTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '处理类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '处理类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('handleType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRefundOrderHandleTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  refundOrderStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const refundOrderStateList = global.refundOrderStateList || [];

    if (withUnlimited) {
      return refitCommonData(refundOrderStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(refundOrderStateList);
  };

  getRefundOrderStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderRefundOrderStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchRefundOrderStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '退款状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '退款状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRefundOrderStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  merchantPayList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantPayList = global.merchantPayList || [];

    if (withUnlimited) {
      return refitCommonData(merchantPayList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantPayList);
  };

  getMerchantPayName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantPayList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantPayOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantPayList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantPayFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否缴费',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否缴费';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isPay', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantPayOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormMerchantPaySelectFormItem = (
    value,
    helper = buildFieldHelper('站长是否缴纳费用'),
    onChangeCallback,
    label = '是否缴费',
    formItemLayout = null,
    required = false,
    name = 'isPay',
    otherProps = null,
  ) => {
    const title = label || '是否缴费';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderMerchantPayOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  webChannelList = (withUnlimited = true) => {
    const { global } = this.props;

    const webChannelList = global.webChannelList || [];

    if (withUnlimited) {
      return refitCommonData(webChannelList, unlimitedWithNumberFlag);
    }

    return refitCommonData(webChannelList);
  };

  getWebChannelName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.webChannelList(false));
    return item == null ? '未知' : item.name;
  };

  renderWebChannelOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.webChannelList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchWebChannelFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '系统名',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '系统名';

    return (
      <FormItem label={title}>
        {getFieldDecorator('channel', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderWebChannelOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  areaDistributionPayTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaDistributionPayTypeList = global.areaDistributionPayTypeList || [];

    if (withUnlimited) {
      return refitCommonData(areaDistributionPayTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaDistributionPayTypeList);
  };

  getAreaDistributionPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaDistributionPayTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaDistributionPayTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaDistributionPayTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaDistributionPayTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '转款类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '转款类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('payType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaDistributionPayTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  areaDistributionStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaDistributionStateList = global.areaDistributionStateList || [];

    if (withUnlimited) {
      return refitCommonData(areaDistributionStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaDistributionStateList);
  };

  getAreaDistributionStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaDistributionStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaDistributionStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaDistributionStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaDistributionStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '审核状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '审核状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaDistributionStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  areaAccountRecordTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaAccountRecordTypeList = global.areaAccountRecordTypeList || [];

    if (withUnlimited) {
      return refitCommonData(areaAccountRecordTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaAccountRecordTypeList);
  };

  getAreaAccountRecordTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAccountRecordTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaAccountRecordTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaAccountRecordTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaAccountRecordTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变动原因',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变动原因';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaAccountRecordTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  areaManageStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaManageStateList = global.areaManageStateList || [];

    if (withUnlimited) {
      return refitCommonData(areaManageStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaManageStateList);
  };

  getAreaManageStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaManageStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaManageStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaManageStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaManageStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '账户状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '账户状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaManageStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  distributionStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const distributionStateList = global.distributionStateList || [];

    if (withUnlimited) {
      return refitCommonData(distributionStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(distributionStateList);
  };

  getDistributionStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.distributionStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderDistributionStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.distributionStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchDistributionStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDistributionStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  // 商家
  storeDistributionStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const storeDistributionStateList = global.storeDistributionStateList || [];

    if (withUnlimited) {
      return refitCommonData(storeDistributionStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(storeDistributionStateList);
  };

  getDistributionStateNames = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.storeDistributionStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderDistributionStateOptions = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.storeDistributionStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchDistributionStateFormItems = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDistributionStateOptions(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  orderMessageList = (withUnlimited = true) => {
    const { global } = this.props;

    const orderMessageList = global.orderMessageList || [];

    if (withUnlimited) {
      return refitCommonData(orderMessageList, unlimitedWithNumberFlag);
    }

    return refitCommonData(orderMessageList);
  };

  getOrderMessageName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderMessageList(false));
    return item == null ? '未知' : item.name;
  };

  renderOrderMessageOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.orderMessageList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchOrderMessageFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '订单消息',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '订单消息';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isReceiveOTMsg', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderOrderMessageOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  administrationAuthorityList = (withUnlimited = true) => {
    const { global } = this.props;

    const administrationAuthorityList = global.administrationAuthorityList || [];

    if (withUnlimited) {
      return refitCommonData(administrationAuthorityList, unlimitedWithNumberFlag);
    }

    return refitCommonData(administrationAuthorityList);
  };

  getAdministrationAuthorityName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.administrationAuthorityList(false));
    return item == null ? '未知' : item.name;
  };

  renderAdministrationAuthorityOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.administrationAuthorityList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAdministrationAuthorityFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '管理权限',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '管理权限';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isManage', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAdministrationAuthorityOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  refundOrderReturnStoreList = (withUnlimited = true) => {
    const { global } = this.props;

    const refundOrderReturnStoreList = global.refundOrderReturnStoreList || [];

    if (withUnlimited) {
      return refitCommonData(refundOrderReturnStoreList, unlimitedWithNumberFlag);
    }

    return refitCommonData(refundOrderReturnStoreList);
  };

  getRefundOrderReturnStoreName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderReturnStoreList(false));
    return item == null ? '未知' : item.name;
  };

  renderRefundOrderReturnStoreOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderReturnStoreList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRefundOrderReturnStoreRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderReturnStoreList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchRefundOrderReturnStoreFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '返还库存',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '返还库存';

    return (
      <FormItem label={title}>
        {getFieldDecorator('returnStore', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRefundOrderReturnStoreOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageTypeList =
      global.goodsLogisticsProcessRequestMessageTypeList || [];

    if (withUnlimited) {
      return refitCommonData(goodsLogisticsProcessRequestMessageTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(goodsLogisticsProcessRequestMessageTypeList);
  };

  getGoodsLogisticsProcessRequestMessageTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.goodsLogisticsProcessRequestMessageTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.goodsLogisticsProcessRequestMessageTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchGoodsLogisticsProcessRequestMessageTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '请求类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '请求类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageModeList =
      global.goodsLogisticsProcessRequestMessageModeList || [];

    if (withUnlimited) {
      return refitCommonData(goodsLogisticsProcessRequestMessageModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(goodsLogisticsProcessRequestMessageModeList);
  };

  getGoodsLogisticsProcessRequestMessageModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.goodsLogisticsProcessRequestMessageModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.goodsLogisticsProcessRequestMessageModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchGoodsLogisticsProcessRequestMessageModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '请求模式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '请求模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('mode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageModeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageStateList =
      global.goodsLogisticsProcessRequestMessageStateList || [];

    if (withUnlimited) {
      return refitCommonData(goodsLogisticsProcessRequestMessageStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(goodsLogisticsProcessRequestMessageStateList);
  };

  getGoodsLogisticsProcessRequestMessageStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      v,
      this.goodsLogisticsProcessRequestMessageStateList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.goodsLogisticsProcessRequestMessageStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchGoodsLogisticsProcessRequestMessageStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '处理状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '处理状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList = (
    withUnlimited = true,
  ) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList =
      global.goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList || [];

    if (withUnlimited) {
      return refitCommonData(
        goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList,
        {
          key: -10000,
          name: '不限',
          flag: -10000,
        },
      );
    }

    return refitCommonData(
      goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList,
    );
  };

  getGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultName = (
    v,
    defaultValue = '',
  ) => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      v,
      this.goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption = (
    withUnlimited = true,
  ) => {
    const goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultData = this.goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList(
      withUnlimited,
    );
    const goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption = [];

    if (goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultData.length > 0) {
      goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultData.forEach(item => {
        const { name, flag } = item;
        goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption.push(
          <Option key={flag} value={flag}>
            {name}
          </Option>,
        );
      });

      return goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption;
    }

    return null;
  };

  renderSearchGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '缺失操作',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '缺失操作';

    return (
      <FormItem label={title}>
        {getFieldDecorator('operationLossCheckResult', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption(
              withUnlimited,
            )}
          </Select>,
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageDayInspectStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageDayInspectStateList =
      global.goodsLogisticsProcessRequestMessageDayInspectStateList || [];

    if (withUnlimited) {
      return refitCommonData(
        goodsLogisticsProcessRequestMessageDayInspectStateList,
        unlimitedWithNumberFlag,
      );
    }

    return refitCommonData(goodsLogisticsProcessRequestMessageDayInspectStateList);
  };

  getGoodsLogisticsProcessRequestMessageDayInspectStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      v,
      this.goodsLogisticsProcessRequestMessageDayInspectStateList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageDayInspectStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.goodsLogisticsProcessRequestMessageDayInspectStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchGoodsLogisticsProcessRequestMessageDayInspectStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageDayInspectStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  merchantStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantStateList = global.merchantStateList || [];

    if (withUnlimited) {
      return refitCommonData(merchantStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantStateList);
  };

  getMerchantStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '审核状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '审核状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  advertClassList = (withUnlimited = true) => {
    const { global } = this.props;

    const advertClassList = global.advertClassList || [];

    if (withUnlimited) {
      return refitCommonData(advertClassList, unlimitedWithNumberFlag);
    }

    return refitCommonData(advertClassList);
  };

  getAdvertClassName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.advertClassList(false));
    return item == null ? '未知' : item.name;
  };

  renderAdvertClassOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.advertClassList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAdvertClassFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '所属类别',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '所属类别';

    return (
      <FormItem label={title}>
        {getFieldDecorator('classId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAdvertClassOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormAdvertClassFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '所属类型',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '所属类型';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'classId',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderAdvertClassOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  advertStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const advertStateList = global.advertStateList || [];

    if (withUnlimited) {
      return refitCommonData(advertStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(advertStateList);
  };

  getAdvertStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.advertStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderAdvertStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.advertStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAdvertStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '当前状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '当前状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAdvertStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  advertTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const advertTypeList = global.advertTypeList || [];

    if (withUnlimited) {
      return refitCommonData(advertTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(advertTypeList);
  };

  getAdvertTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.advertTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAdvertTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.advertTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAdvertTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '广告类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '广告类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAdvertTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormAdvertTypeSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '广告类型',
    formItemLayout = null,
    required = false,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || '广告类型';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderAdvertTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  accessWayTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const accessWayTypeList = global.accessWayTypeList || [];

    if (withUnlimited) {
      return refitCommonData(accessWayTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(accessWayTypeList);
  };

  getAccessWayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.accessWayTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAccessWayTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.accessWayTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAccessWayTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '类别',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '类别';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAccessWayTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  areaRankSaleStatisticTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaRankSaleStatisticTypeList = global.areaRankSaleStatisticTypeList || [];

    if (withUnlimited) {
      return refitCommonData(areaRankSaleStatisticTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaRankSaleStatisticTypeList);
  };

  getAreaRankSaleStatisticTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaRankSaleStatisticTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaRankSaleStatisticTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaRankSaleStatisticTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaRankSaleStatisticTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '类别',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '类别';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaRankSaleStatisticTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  replenishmentStateModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const replenishmentStateModeList = global.replenishmentStateModeList || [];

    if (withUnlimited) {
      return refitCommonData(replenishmentStateModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(replenishmentStateModeList);
  };

  getReplenishmentStateModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentStateModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentStateModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentStateModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderReplenishmentStateModeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentStateModeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentStateModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '模式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('mode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderReplenishmentStateModeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  merchantDisplayList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantDisplayList = global.merchantDisplayList || [];

    if (withUnlimited) {
      return refitCommonData(merchantDisplayList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantDisplayList);
  };

  getMerchantDisplayName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantDisplayList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantDisplayOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantDisplayList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantDisplayFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否显示',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否显示';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isDisplay', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantDisplayOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormMerchantDisplaySelectFormItem = (
    value,
    helper = buildFieldHelper('选择站长是否显示'),
    onChangeCallback,
    label = '是否显示',
    formItemLayout = null,
    required = true,
    name = 'isDisplay',
    otherProps = null,
  ) => {
    const title = label || '是否显示';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderMerchantDisplayOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  lineList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = (global.lineList || []).map(o => {
      const d = o;
      d.flag = d.lineId;

      return d;
    });

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getLineName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('lineId', v, this.lineList(false));
    return item == null ? '未知' : item.name;
  };

  renderLineOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.lineList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchLineFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '线路标识',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '线路标识';

    return (
      <FormItem label={title}>
        {getFieldDecorator('lineId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderLineOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormLineSelectFormItem = (
    value,
    helper = buildFieldHelper('选择站长的配送线路'),
    onChangeCallback,
    label = '线路标识',
    formItemLayout = null,
    required = true,
    name = 'lineId',
    otherProps = null,
  ) => {
    const title = label || '线路标识';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderLineOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  merchantSwitchList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantSwitchList = global.merchantSwitchList || [];

    if (withUnlimited) {
      return refitCommonData(merchantSwitchList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantSwitchList);
  };

  getMerchantSwitchName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantSwitchList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantSwitchOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantSwitchList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantSwitchFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否闭店',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否闭店';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isCloseShop', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantSwitchOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormMerchantSwitchSelectFormItem = (
    value,
    helper = buildFieldHelper('站长是否已经闭店'),
    onChangeCallback,
    label = '是否闭店',
    formItemLayout = null,
    required = true,
    name = 'isCloseShop',
    otherProps = null,
  ) => {
    const title = label || '是否闭店';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderMerchantSwitchOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  areaAccountRecordIsHandleList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaAccountRecordIsHandleList = global.areaAccountRecordIsHandleList || [];

    if (withUnlimited) {
      return refitCommonData(areaAccountRecordIsHandleList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaAccountRecordIsHandleList);
  };

  getAreaAccountRecordIsHandleName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAccountRecordIsHandleList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaAccountRecordIsHandleOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaAccountRecordIsHandleList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaAccountRecordIsHandleFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '处理状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '处理状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isHandle', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaAccountRecordIsHandleOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  merchantPurchaseList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantPurchaseList = global.merchantPurchaseList || [];

    if (withUnlimited) {
      return refitCommonData(merchantPurchaseList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantPurchaseList);
  };

  getMerchantPurchaseName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantPurchaseList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantPurchaseOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantPurchaseList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantPurchaseFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '允许采购',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '允许采购';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isClose', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantPurchaseOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormMerchantPurchaseSelectFormItem = (
    value,
    helper = buildFieldHelper('是否允许站长采购'),
    onChangeCallback,
    label = '允许采购',
    formItemLayout = null,
    required = true,
    name = 'isClose',
    otherProps = null,
  ) => {
    const title = label || '允许采购';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderMerchantPurchaseOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  isUpStoreList = (withUnlimited = true) => {
    const { global } = this.props;

    const isUpStoreList = global.isUpStoreList || [];

    if (withUnlimited) {
      return refitCommonData(isUpStoreList, unlimitedWithNumberFlag);
    }

    return refitCommonData(isUpStoreList);
  };

  getIsUpStoreName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.isUpStoreList(false));
    return item == null ? '未知' : item.name;
  };

  renderIsUpStoreOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.isUpStoreList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchIsUpStoreFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '采购端可见',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '采购端可见';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isUpStore', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderIsUpStoreOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormIsUpStoreFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '采购端可见',
    formItemLayout = null,
    required = false,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '采购端可见';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isUpStore',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderIsUpStoreOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  isUpAppList = (withUnlimited = true) => {
    const { global } = this.props;

    const isUpAppList = global.isUpAppList || [];

    if (withUnlimited) {
      return refitCommonData(isUpAppList, unlimitedWithNumberFlag);
    }

    return refitCommonData(isUpAppList);
  };

  getIsUpAppName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.isUpAppList(false));
    return item == null ? '未知' : item.name;
  };

  renderIsUpAppOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.isUpAppList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchIsUpAppFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = 'App端可见',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || 'App端可见';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isUpApp', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderIsUpAppOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormIsUpAppFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = 'App端可见',
    formItemLayout = null,
    required = false,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || 'App端可见';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isUpApp',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderIsUpAppOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  isUpWxList = (withUnlimited = true) => {
    const { global } = this.props;

    const isUpWxList = global.isUpWxList || [];

    if (withUnlimited) {
      return refitCommonData(isUpWxList, unlimitedWithNumberFlag);
    }

    return refitCommonData(isUpWxList);
  };

  getIsUpWxName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.isUpWxList(false));
    return item == null ? '未知' : item.name;
  };

  renderIsUpWxOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.isUpWxList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchIsUpWxFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '微信端可见',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '微信端可见';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isUpWx', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderIsUpWxOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormIsUpWxFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '微信端可见',
    formItemLayout = null,
    required = false,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '微信端可见';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isUpWx',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderIsUpWxOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  stockChangeTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const stockChangeTypeList = global.stockChangeTypeList || [];

    if (withUnlimited) {
      return refitCommonData(stockChangeTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(stockChangeTypeList);
  };

  getStockChangeTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.stockChangeTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderStockChangeTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.stockChangeTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderStockChangeTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.stockChangeTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchStockChangeTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变更类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变更类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('changeType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderStockChangeTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormStockChangeTypeSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '变更库存',
    formItemLayout = null,
    required = true,
    name = 'changeType',
    otherProps = null,
  ) => {
    const title = label || '变更库存';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderStockChangeTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormStockChangeTypeFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '变更库存',
    formItemLayout = null,
    required = true,
    name = 'changeType',
    otherProps = null,
  ) => {
    const title = label || '变更库存';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderStockChangeTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  // 票务更改库存
  renderFormStockChangeTypeFormItemRadio1 = (
    value,
    helper = null,
    onChangeCallback,
    label = '变更库存',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变更库存';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'changeType',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: true,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <RadioGroup
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderStockChangeTypeRadio(false)}
          </RadioGroup>,
        )}
      </FormItem>
    );
  };

  peopleAccountLogTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const peopleAccountLogTypeList = global.peopleAccountLogTypeList || [];

    if (withUnlimited) {
      return refitCommonData(peopleAccountLogTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(peopleAccountLogTypeList);
  };

  getPeopleAccountLogTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.peopleAccountLogTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderPeopleAccountLogTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.peopleAccountLogTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPeopleAccountLogTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变动类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变动类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPeopleAccountLogTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  peopleAccountLogIsOutInList = (withUnlimited = true) => {
    const { global } = this.props;

    const peopleAccountLogIsOutInList = global.peopleAccountLogIsOutInList || [];

    if (withUnlimited) {
      return refitCommonData(peopleAccountLogIsOutInList, unlimitedWithNumberFlag);
    }

    return refitCommonData(peopleAccountLogIsOutInList);
  };

  getPeopleAccountLogIsOutInName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.peopleAccountLogIsOutInList(false));
    return item == null ? '未知' : item.name;
  };

  renderPeopleAccountLogIsOutInOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.peopleAccountLogIsOutInList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPeopleAccountLogIsOutInFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '收支类行',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '收支类行';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isOutIn', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPeopleAccountLogIsOutInOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  peopleAccountLogInTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const peopleAccountLogInTypeList = global.peopleAccountLogInTypeList || [];

    if (withUnlimited) {
      return refitCommonData(peopleAccountLogInTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(peopleAccountLogInTypeList);
  };

  getPeopleAccountLogInTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.peopleAccountLogInTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderPeopleAccountLogInTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.peopleAccountLogInTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPeopleAccountLogInTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '收入来源',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '收入来源';

    return (
      <FormItem label={title}>
        {getFieldDecorator('inType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPeopleAccountLogInTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  areaAccountRecordRevenueExpensesList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaAccountRecordRevenueExpensesList = global.areaAccountRecordRevenueExpensesList || [];

    if (withUnlimited) {
      return refitCommonData(areaAccountRecordRevenueExpensesList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaAccountRecordRevenueExpensesList);
  };

  getAreaAccountRecordRevenueExpensesName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAccountRecordRevenueExpensesList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaAccountRecordRevenueExpensesOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.areaAccountRecordRevenueExpensesList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaAccountRecordRevenueExpensesFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '收支类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '收支类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('revenueExpenses', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaAccountRecordRevenueExpensesOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  simpleTicketStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketStateList = global.simpleTicketStateList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketStateList);
  };

  getSimpleTicketStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '票务状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '票务状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketStateFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '票务状态',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '票务状态';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'state',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderSimpleTicketStateOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  simpleTicketIsCanRefundList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketIsCanRefundList = global.simpleTicketIsCanRefundList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketIsCanRefundList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketIsCanRefundList);
  };

  getSimpleTicketIsCanRefundName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketIsCanRefundList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketIsCanRefundOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketIsCanRefundList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketIsCanRefundFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否可退',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否可退';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isCanRefund', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketIsCanRefundOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketIsCanRefundFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '是否可退',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否可退';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isCanRefund',
          refitFieldDecoratorOption(
            value === null ? 0 : value.isCanRefund || '',
            value === null ? 0 : value.isCanRefund || '',
            0,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            },
          ),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderSimpleTicketIsCanRefundOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  // 是否需要身份证号
  simpleTicketIsIDCardList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketIsIDCardList = global.simpleTicketIsIDCardList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketIsIDCardList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketIsIDCardList);
  };

  getSimpleTicketIsIDCardName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketIsIDCardList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketIsIDCardOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketIsIDCardList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketIsIDCardFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否需要身份证号',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否需要身份证号';

    return (
      <FormItem label={title}>
        {getFieldDecorator('requiredIDCard', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketIsIDCardOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketIsIDCardFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '是否需要身份证号',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否需要身份证号';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'requiredIDCard',
          refitFieldDecoratorOption(
            value === null ? 0 : value.requiredIDCard || '',
            value === null ? 0 : value.requiredIDCard || '',
            0,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            },
          ),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderSimpleTicketIsIDCardOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  // 是否需要手机号
  simpleTicketIsPhoneList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketIsPhoneList = global.simpleTicketIsPhoneList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketIsPhoneList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketIsPhoneList);
  };

  getSimpleTicketIsPhonedName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketIsPhoneList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketIsPhoneOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketIsPhoneList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketIsPhoneFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否需要手机号',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否需要手机号';

    return (
      <FormItem label={title}>
        {getFieldDecorator('requiredPhone', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketIsPhoneOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketIsPhoneFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '是否需要手机号',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否需要手机号';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'requiredPhone',
          refitFieldDecoratorOption(
            value === null ? 0 : value.requiredPhone || '',
            value === null ? 0 : value.requiredPhone || '',
            0,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            },
          ),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderSimpleTicketIsPhoneOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  // 是否需要姓名
  simpleTicketIsNameList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketIsNameList = global.simpleTicketIsNameList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketIsNameList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketIsNameList);
  };

  getSimpleTicketIsNameName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketIsNameList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketIsNameOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketIsNameList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketIsNameFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否需要姓名',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否需要姓名';

    return (
      <FormItem label={title}>
        {getFieldDecorator('requiredName', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketIsNameOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketIsNameFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '是否需要姓名',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否需要姓名';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'requiredName',
          refitFieldDecoratorOption(
            value === null ? 0 : value.requiredName || '',
            value === null ? 0 : value.requiredName || '',
            0,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            },
          ),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderSimpleTicketIsNameOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  simpleTicketIsNeedAppointmentList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketIsNeedAppointmentList = global.simpleTicketIsNeedAppointmentList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketIsNeedAppointmentList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketIsNeedAppointmentList);
  };

  getSimpleTicketIsNeedAppointmentName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketIsNeedAppointmentList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketIsNeedAppointmentOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.simpleTicketIsNeedAppointmentList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketIsNeedAppointmentFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '需要预约',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '需要预约';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isNeedAppointment', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketIsNeedAppointmentOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketIsNeedAppointmentFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '需要预约',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '需要预约';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isNeedAppointment',
          refitFieldDecoratorOption(
            value === null ? 0 : value.isNeedAppointment || '',
            value === null ? 0 : value.isNeedAppointment || '',
            0,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            },
          ),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderSimpleTicketIsNeedAppointmentOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  simpleTicketOnlyNewCustomerList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketOnlyNewCustomerList = global.simpleTicketOnlyNewCustomerList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketOnlyNewCustomerList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketOnlyNewCustomerList);
  };

  getSimpleTicketOnlyNewCustomerName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketOnlyNewCustomerList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketOnlyNewCustomerOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.simpleTicketOnlyNewCustomerList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketOnlyNewCustomerFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '新用户专享',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '新用户专享';

    return (
      <FormItem label={title}>
        {getFieldDecorator('onlyNewCustomer', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketOnlyNewCustomerOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketOnlyNewCustomerFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '新用户专享',
    formItemLayout = null,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '新用户专享';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'onlyNewCustomer',
          refitFieldDecoratorOption(
            value === null ? 0 : value.onlyNewCustomer || '',
            value === null ? 0 : value.onlyNewCustomer || '',
            0,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            },
          ),
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={(v, option) => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(v, option);
              }
            }}
          >
            {this.renderSimpleTicketOnlyNewCustomerOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  };

  simpleTicketDetailStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketDetailStateList = global.simpleTicketDetailStateList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketDetailStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketDetailStateList);
  };

  getSimpleTicketDetailStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketDetailStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketDetailStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketDetailStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketDetailStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '套餐状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '套餐状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketDetailStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketDetailStateSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '套餐状态',
    formItemLayout = null,
    required = false,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || '套餐状态';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderSimpleTicketDetailStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  userOrderSaleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const userOrderSaleTypeList = global.userOrderSaleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(userOrderSaleTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userOrderSaleTypeList);
  };

  getUserOrderSaleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userOrderSaleTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserOrderSaleTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.userOrderSaleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchUserOrderSaleTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '售卖方式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '售卖方式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('saleType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserOrderSaleTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  simpleTicketOrderStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketOrderStateList = global.simpleTicketOrderStateList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketOrderStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketOrderStateList);
  };

  getSimpleTicketOrderStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketOrderStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketOrderStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketOrderStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketOrderStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '订单状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '订单状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketOrderStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  // 票务退款状态
  simpleTicketRefundOrderStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketRefundOrderStateList = global.simpleTicketRefundOrderStateList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketRefundOrderStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketRefundOrderStateList);
  };

  getSimpleTicketRefundOrderStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketRefundOrderStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketRefundOrderStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.simpleTicketRefundOrderStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketRefundOrderStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '订单状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '订单状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketRefundOrderStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  // 票务退款处理状态
  simpleTicketRefundOrderHandleStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketRefundOrderHandleStateList =
      global.simpleTicketRefundOrderHandleStateList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketRefundOrderHandleStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketRefundOrderHandleStateList);
  };

  getSimpleTicketRefundOrderHandleStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketRefundOrderHandleStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketRefundOrderHandleStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.simpleTicketRefundOrderHandleStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketRefundOrderHandleStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '处理状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '处理状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('handleState', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketRefundOrderHandleStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  cityDriverStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const cityDriverStateList = global.cityDriverStateList || [];

    if (withUnlimited) {
      return refitCommonData(cityDriverStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(cityDriverStateList);
  };

  getCityDriverStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.cityDriverStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderCityDriverStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.cityDriverStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCityDriverStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '当前状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '当前状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCityDriverStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  cityDriverBindLocationList = (withUnlimited = true) => {
    const { global } = this.props;

    const cityDriverBindLocationList = global.cityDriverBindLocationList || [];

    if (withUnlimited) {
      return refitCommonData(cityDriverBindLocationList, unlimitedWithNumberFlag);
    }

    return refitCommonData(cityDriverBindLocationList);
  };

  getCityDriverBindLocationName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.cityDriverBindLocationList(false));
    return item == null ? '未知' : item.name;
  };

  renderCityDriverBindLocationOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.cityDriverBindLocationList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCityDriverBindLocationFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '绑定定位',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '绑定定位';

    return (
      <FormItem label={title}>
        {getFieldDecorator('bindLocation', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCityDriverBindLocationOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  areaAgentRoleCreateModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaAgentRoleCreateModeList = global.areaAgentRoleCreateModeList || [];

    if (withUnlimited) {
      return refitCommonData(areaAgentRoleCreateModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaAgentRoleCreateModeList);
  };

  getAreaAgentRoleCreateModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAgentRoleCreateModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaAgentRoleCreateModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaAgentRoleCreateModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAreaAgentRoleCreateModeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaAgentRoleCreateModeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAreaAgentRoleCreateModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '创建模式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '创建模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('createMode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaAgentRoleCreateModeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  areaAgentRoleStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaAgentRoleStateList = global.areaAgentRoleStateList || [];

    if (withUnlimited) {
      return refitCommonData(areaAgentRoleStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaAgentRoleStateList);
  };

  getAreaAgentRoleStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAgentRoleStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaAgentRoleStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaAgentRoleStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaAgentRoleStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '角色状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '角色状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaAgentRoleStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  departmentStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const departmentStatusList = global.departmentStatusList || [];

    if (withUnlimited) {
      return refitCommonData(departmentStatusList, unlimitedWithNumberFlag);
    }

    return refitCommonData(departmentStatusList);
  };

  getDepartmentStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.departmentStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderDepartmentStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.departmentStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDepartmentStatusRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.departmentStatusList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDepartmentStatusFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('status', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDepartmentStatusOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormDepartmentStatusSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || '状态';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderDepartmentStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormDepartmentStatusFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || '状态';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderDepartmentStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  employeeStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const employeeStatusList = global.employeeStatusList || [];

    if (withUnlimited) {
      return refitCommonData(employeeStatusList, unlimitedWithNumberFlag);
    }

    return refitCommonData(employeeStatusList);
  };

  getEmployeeStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.employeeStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderEmployeeStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.employeeStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderEmployeeStatusRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.employeeStatusList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchEmployeeStatusFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('status', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderEmployeeStatusOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormEmployeeStatusSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || '状态';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderEmployeeStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormEmployeeStatusFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || '状态';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderEmployeeStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productPurchaseStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const productPurchaseStatusList = global.productPurchaseStatusList || [];

    if (withUnlimited) {
      return refitCommonData(productPurchaseStatusList, unlimitedWithNumberFlag);
    }

    return refitCommonData(productPurchaseStatusList);
  };

  getProductPurchaseStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productPurchaseStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductPurchaseStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productPurchaseStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductPurchaseStatusRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productPurchaseStatusList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductPurchaseStatusFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('status', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductPurchaseStatusOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormProductPurchaseStatusSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || '状态';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderProductPurchaseStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductPurchaseStatusFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || '状态';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderProductPurchaseStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponScopeList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponScopeList = global.couponScopeList || [];

    if (withUnlimited) {
      return refitCommonData(couponScopeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponScopeList);
  };

  getCouponScopeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponScopeList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponScopeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponScopeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCouponScopeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '适用范围',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '适用范围';

    return (
      <FormItem label={title}>
        {getFieldDecorator('scope', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponScopeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponScopeSelectFormItem = (
    value,
    helper = buildFieldHelper('选择优惠券适用范围'),
    onChangeCallback,
    label = '适用范围',
    formItemLayout = null,
    required = false,
    name = 'scope',
    otherProps = null,
  ) => {
    const title = label || '适用范围';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponScopeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponApplicableObjectList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponApplicableObjectList = global.couponApplicableObjectList || [];

    if (withUnlimited) {
      return refitCommonData(couponApplicableObjectList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponApplicableObjectList);
  };

  getCouponApplicableObjectName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponApplicableObjectList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponApplicableObjectOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponApplicableObjectList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCouponApplicableObjectFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '适用对象',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '适用对象';

    return (
      <FormItem label={title}>
        {getFieldDecorator('applicableObject', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponApplicableObjectOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponApplicableObjectSelectFormItem = (
    value,
    helper = buildFieldHelper('选择优惠券适用对象'),
    onChangeCallback,
    label = '适用对象',
    formItemLayout = null,
    required = false,
    name = 'applicableObject',
    otherProps = null,
  ) => {
    const title = label || '适用对象';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponApplicableObjectOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponExpireModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponExpireModeList = global.couponExpireModeList || [];

    if (withUnlimited) {
      return refitCommonData(couponExpireModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponExpireModeList);
  };

  getCouponExpireModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponExpireModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponExpireModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponExpireModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCouponExpireModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '过期模式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '过期模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('expireMode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponExpireModeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponExpireModeSelectFormItem = (
    value,
    helper = buildFieldHelper('选择优惠券过期模式'),
    onChangeCallback,
    label = '过期模式',
    formItemLayout = null,
    required = false,
    name = 'expireMode',
    otherProps = null,
  ) => {
    const title = label || '过期模式';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponExpireModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponDisplayRangeList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponDisplayRangeList = global.couponDisplayRangeList || [];

    if (withUnlimited) {
      return refitCommonData(couponDisplayRangeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponDisplayRangeList);
  };

  getCouponDisplayRangeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponDisplayRangeList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponDisplayRangeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponDisplayRangeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCouponDisplayRangeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '显示区域',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '显示区域';

    return (
      <FormItem label={title}>
        {getFieldDecorator('displayRange', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponDisplayRangeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponDisplayRangeSelectFormItem = (
    value,
    helper = buildFieldHelper('选择优惠券显示区域'),
    onChangeCallback,
    label = '显示区域',
    formItemLayout = null,
    required = false,
    name = 'displayRange',
    otherProps = null,
  ) => {
    const title = label || '显示区域';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponDisplayRangeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponStatusList = global.couponStatusList || [];

    if (withUnlimited) {
      return refitCommonData(couponStatusList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponStatusList);
  };

  getCouponStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStatusFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('status', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponStatusOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponStatusSelectFormItem = (
    value,
    helper = buildFieldHelper('选择优惠券状态'),
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = false,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || '状态';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponDisplayList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponDisplayList = global.couponDisplayList || [];

    if (withUnlimited) {
      return refitCommonData(couponDisplayList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponDisplayList);
  };

  getCouponDisplayName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponDisplayList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponDisplayOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponDisplayList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCouponDisplayFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '显示/隐藏',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '显示/隐藏';

    return (
      <FormItem label={title}>
        {getFieldDecorator('display', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponDisplayOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponDisplaySelectFormItem = (
    value,
    helper = buildFieldHelper('选择优惠券显示/隐藏'),
    onChangeCallback,
    label = '显示/隐藏',
    formItemLayout = null,
    required = true,
    name = 'display',
    otherProps = null,
  ) => {
    const title = label || '显示/隐藏';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponDisplayOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponSceneList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponSceneList = global.couponSceneList || [];

    if (withUnlimited) {
      return refitCommonData(couponSceneList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponSceneList);
  };

  getCouponSceneName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponSceneList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponSceneOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponSceneList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCouponSceneFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '发放场景',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '发放场景';

    return (
      <FormItem label={title}>
        {getFieldDecorator('scene', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponSceneOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponSceneSelectFormItem = (
    value,
    helper = buildFieldHelper('选择优惠券发放场景'),
    onChangeCallback,
    label = '发放场景',
    formItemLayout = null,
    required = true,
    name = 'scene',
    otherProps = null,
  ) => {
    const title = label || '发放场景';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponSceneOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponTypeList = global.couponTypeList || [];

    if (withUnlimited) {
      return refitCommonData(couponTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponTypeList);
  };

  getCouponTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCouponTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '优惠券状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '优惠券状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('saleType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  couponGoodsTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponGoodsTypeList = global.couponGoodsTypeList || [];

    if (withUnlimited) {
      return refitCommonData(couponGoodsTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponGoodsTypeList);
  };

  getCouponGoodsTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponGoodsTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponGoodsTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponGoodsTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCouponGoodsTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '商品类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponGoodsTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponGoodsTypeSelectFormItem = (
    value,
    helper = buildFieldHelper('选择优惠券商品类型'),
    onChangeCallback,
    label = '商品类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || '商品类型';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponGoodsTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expiredList = (withUnlimited = true) => {
    const { global } = this.props;

    const expiredList = global.expiredList || [];

    if (withUnlimited) {
      return refitCommonData(expiredList, unlimitedWithNumberFlag);
    }

    return refitCommonData(expiredList);
  };

  getExpiredTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.expiredList(false));
    return item == null ? '未知' : item.name;
  };

  renderExpiredTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.expiredList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchExpiredTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否过期',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否过期';

    return (
      <FormItem label={title}>
        {getFieldDecorator('saleType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderExpiredTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  couponStockChangeTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponStockChangeTypeList = global.couponStockChangeTypeList || [];

    if (withUnlimited) {
      return refitCommonData(couponStockChangeTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponStockChangeTypeList);
  };

  getCouponStockChangeTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponStockChangeTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponStockChangeTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponStockChangeTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockChangeTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponStockChangeTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockChangeTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变更库存',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变更库存';

    return (
      <FormItem label={title}>
        {getFieldDecorator('changeType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponStockChangeTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponStockChangeTypeSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '变更库存',
    formItemLayout = null,
    required = true,
    name = 'changeType',
    otherProps = null,
  ) => {
    const title = label || '变更库存';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockChangeTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockChangeTypeFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '变更库存',
    formItemLayout = null,
    required = true,
    name = 'changeType',
    otherProps = null,
  ) => {
    const title = label || '变更库存';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockChangeTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStockCacheChangedList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponStockCacheChangedList = global.couponStockCacheChangedList || [];

    if (withUnlimited) {
      return refitCommonData(couponStockCacheChangedList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponStockCacheChangedList);
  };

  getCouponStockCacheChangedName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponStockCacheChangedList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponStockCacheChangedOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponStockCacheChangedList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockCacheChangedRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponStockCacheChangedList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockCacheChangedFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变动类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变动类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('cacheChanged', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponStockCacheChangedOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponStockCacheChangedSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '变动类型',
    formItemLayout = null,
    required = true,
    name = 'cacheChanged',
    otherProps = null,
  ) => {
    const title = label || '变动类型';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockCacheChangedOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockCacheChangedFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '变动类型',
    formItemLayout = null,
    required = true,
    name = 'cacheChanged',
    otherProps = null,
  ) => {
    const title = label || '变动类型';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockCacheChangedOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStockCacheChangedTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponStockCacheChangedTypeList = global.couponStockCacheChangedTypeList || [];

    if (withUnlimited) {
      return refitCommonData(couponStockCacheChangedTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponStockCacheChangedTypeList);
  };

  getCouponStockCacheChangedTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponStockCacheChangedTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponStockCacheChangedTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockCacheChangedTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockCacheChangedTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockCacheChangedTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockCacheChangedTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '缓存变动位置',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '缓存变动位置';

    return (
      <FormItem label={title}>
        {getFieldDecorator('cacheChangeType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponStockCacheChangedTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponStockCacheChangedTypeSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '缓存变动位置',
    formItemLayout = null,
    required = true,
    name = 'cacheChangeType',
    otherProps = null,
  ) => {
    const title = label || '缓存变动位置';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockCacheChangedTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockCacheChangedTypeFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '缓存变动位置',
    formItemLayout = null,
    required = true,
    name = 'cacheChangeType',
    otherProps = null,
  ) => {
    const title = label || '缓存变动位置';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockCacheChangedTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStockModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponStockModeList = global.couponStockModeList || [];

    if (withUnlimited) {
      return refitCommonData(couponStockModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponStockModeList);
  };

  getCouponStockModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponStockModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponStockModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponStockModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockModeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponStockModeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变动来源',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变动来源';

    return (
      <FormItem label={title}>
        {getFieldDecorator('mode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponStockModeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponStockModeSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '变动来源',
    formItemLayout = null,
    required = true,
    name = 'mode',
    otherProps = null,
  ) => {
    const title = label || '变动来源';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockModeFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '变动来源',
    formItemLayout = null,
    required = true,
    name = 'mode',
    otherProps = null,
  ) => {
    const title = label || '变动来源';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStockStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const couponStockStateList = global.couponStockStateList || [];

    if (withUnlimited) {
      return refitCommonData(couponStockStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(couponStockStateList);
  };

  getCouponStockStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.couponStockStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderCouponStockStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponStockStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockStateRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.couponStockStateList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '处理状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '处理状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderCouponStockStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormCouponStockStateSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '处理状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || '处理状态';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockStateFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '处理状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || '处理状态';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderCouponStockStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  userCouponStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const userCouponStateList = global.userCouponStateList || [];

    if (withUnlimited) {
      return refitCommonData(userCouponStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userCouponStateList);
  };

  getUserCouponStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userCouponStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserCouponStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.userCouponStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderUserCouponStateRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.userCouponStateList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchUserCouponStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '使用状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '使用状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserCouponStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormUserCouponStateSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '使用状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || '使用状态';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderUserCouponStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormUserCouponStateFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '使用状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || '使用状态';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderUserCouponStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  userCouponChangeExpirationTimeModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const userCouponChangeExpirationTimeModeList =
      global.userCouponChangeExpirationTimeModeList || [];

    if (withUnlimited) {
      return refitCommonData(userCouponChangeExpirationTimeModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userCouponChangeExpirationTimeModeList);
  };

  getUserCouponChangeExpirationTimeModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userCouponChangeExpirationTimeModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserCouponChangeExpirationTimeModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.userCouponChangeExpirationTimeModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderUserCouponChangeExpirationTimeModeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.userCouponChangeExpirationTimeModeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchUserCouponChangeExpirationTimeModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变更模式',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变更模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('mode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserCouponChangeExpirationTimeModeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormUserCouponChangeExpirationTimeModeSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '变更模式',
    formItemLayout = null,
    required = true,
    name = 'mode',
    otherProps = null,
  ) => {
    const title = label || '变更模式';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderUserCouponChangeExpirationTimeModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormUserCouponChangeExpirationTimeModeFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '变更模式',
    formItemLayout = null,
    required = true,
    name = 'mode',
    otherProps = null,
  ) => {
    const title = label || '变更模式';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderUserCouponChangeExpirationTimeModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  weChatMessageRecordSendStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const weChatMessageRecordSendStateList = global.weChatMessageRecordSendStateList || [];

    if (withUnlimited) {
      return refitCommonData(weChatMessageRecordSendStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(weChatMessageRecordSendStateList);
  };

  getWeChatMessageRecordSendStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.weChatMessageRecordSendStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderWeChatMessageRecordSendStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.weChatMessageRecordSendStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderWeChatMessageRecordSendStateRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.weChatMessageRecordSendStateList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchWeChatMessageRecordSendStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '发送状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '发送状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderWeChatMessageRecordSendStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormWeChatMessageRecordSendStateSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '发送状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || '发送状态';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderWeChatMessageRecordSendStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormWeChatMessageRecordSendStateFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '发送状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || '发送状态';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderWeChatMessageRecordSendStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  areaConfigWhetherCustomOutboundNoticeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.areaConfigWhetherCustomOutboundNoticeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithNumberFlag);
    }

    return refitCommonData(list);
  };

  getAreaConfigWhetherCustomOutboundNoticeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaConfigWhetherCustomOutboundNoticeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaConfigWhetherCustomOutboundNoticeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.areaConfigWhetherCustomOutboundNoticeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderFormAreaConfigWhetherCustomOutboundNoticeFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '自定义配送消息',
    formItemLayout = null,
    required = true,
    name = 'whetherCustom',
    otherProps = null,
  ) => {
    const title = label || '自定义配送消息';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderAreaConfigWhetherCustomOutboundNoticeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  tagDisplayRangeList = (withUnlimited = true) => {
    const { global } = this.props;

    const tagDisplayRangeList = global.tagDisplayRangeList || [];

    if (withUnlimited) {
      return refitCommonData(tagDisplayRangeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(tagDisplayRangeList);
  };

  getTagDisplayRangeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.tagDisplayRangeList(false));
    return item == null ? '未知' : item.name;
  };

  renderTagDisplayRangeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.tagDisplayRangeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchTagDisplayRangeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '显示范围',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '显示范围';

    return (
      <FormItem label={title}>
        {getFieldDecorator('displayRange', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderTagDisplayRangeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormTagDisplayRangeSelectFormItem = (
    value,
    helper = buildFieldHelper('选择标签显示范围'),
    onChangeCallback,
    label = '显示范围',
    formItemLayout = null,
    required = true,
    name = 'displayRange',
    otherProps = null,
  ) => {
    const title = label || '显示范围';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderTagDisplayRangeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  tagGoodsTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const tagGoodsTypeList = global.tagGoodsTypeList || [];

    if (withUnlimited) {
      return refitCommonData(tagGoodsTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(tagGoodsTypeList);
  };

  getTagGoodsTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.tagGoodsTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderTagGoodsTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.tagGoodsTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchTagGoodsTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '标签类型',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '标签类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderTagGoodsTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormTagGoodsTypeSelectFormItem = (
    value,
    helper = buildFieldHelper('选择标签类型'),
    onChangeCallback,
    label = '标签类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || '标签类型';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderTagGoodsTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  recommendList = (withUnlimited = true) => {
    const { global } = this.props;

    const recommendList = global.recommendList || [];

    if (withUnlimited) {
      return refitCommonData(recommendList, unlimitedWithNumberFlag);
    }

    return refitCommonData(recommendList);
  };

  getRecommend = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.recommendList(false));
    return item == null ? '未知' : item.name;
  };

  renderRecommendOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.recommendList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRecommendFormItem = (withUnlimited = true, initialValue = -10000, label = '是否推荐') => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否推荐';

    return (
      <FormItem label={title}>
        {getFieldDecorator('recommend', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRecommendOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormRecommendFormItem = (
    value,
    helper = buildFieldHelper('是否推荐'),
    onChangeCallback,
    label = '是否推荐',
    formItemLayout = null,
    required = true,
    name = 'recommend',
    otherProps = null,
  ) => {
    const title = label || '是否推荐';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderRecommendOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  statusList = (withUnlimited = true) => {
    const { global } = this.props;

    const statusList = global.statusList || [];

    if (withUnlimited) {
      return refitCommonData(statusList, unlimitedWithNumberFlag);
    }

    return refitCommonData(statusList);
  };

  getStatus = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.statusList(false));
    return item == null ? '未知' : item.name;
  };

  renderStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.statusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderStatusFormItem = (withUnlimited = true, initialValue = -10000, label = '是否启用') => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否启用';

    return (
      <FormItem label={title}>
        {getFieldDecorator('status', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderStatusOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormStatusFormItem = (
    value,
    helper = buildFieldHelper('是否启用'),
    onChangeCallback,
    label = '是否启用',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || '是否启用';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  merchantStarList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantStarList = global.merchantCreditScore || [];

    if (withUnlimited) {
      return refitCommonData(merchantStarList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantStarList);
  };

  getMerchantStarName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantStarList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantStarOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantStarList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantStarFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '站长星级',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '站长星级';

    return (
      <FormItem label={title}>
        {getFieldDecorator('creditScore', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantStarOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormMerchantStarSelectFormItem = (
    value,
    helper = buildFieldHelper('选择站长星级'),
    onChangeCallback,
    label = '站长星级',
    formItemLayout = null,
    required = true,
    name = 'creditScore',
    otherProps = null,
  ) => {
    const title = label || '站长星级';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderMerchantStarOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  areaCallCenterStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaCallCenterStateList = global.areaCallCenterStateList || [];

    if (withUnlimited) {
      return refitCommonData(areaCallCenterStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaCallCenterStateList);
  };

  getAreaCallCenterStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaCallCenterStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaCallCenterStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaCallCenterStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAreaCallCenterStateRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaCallCenterStateList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAreaCallCenterStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '当前状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '当前状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaCallCenterStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormAreaCallCenterStateSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '当前状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || '当前状态';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderAreaCallCenterStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormAreaCallCenterStateFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '当前状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || '当前状态';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderAreaCallCenterStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  areaCallCenterCategoryList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaCallCenterCategoryList = global.areaCallCenterCategoryList || [];

    if (withUnlimited) {
      return refitCommonData(areaCallCenterCategoryList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaCallCenterCategoryList);
  };

  getAreaCallCenterCategoryName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaCallCenterCategoryList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaCallCenterCategoryOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaCallCenterCategoryList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAreaCallCenterCategoryRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaCallCenterCategoryList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAreaCallCenterCategoryFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '所属类别',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '所属类别';

    return (
      <FormItem label={title}>
        {getFieldDecorator('category', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaCallCenterCategoryOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormAreaCallCenterCategorySelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '所属类别',
    formItemLayout = null,
    required = true,
    name = 'category',
    otherProps = null,
  ) => {
    const title = label || '所属类别';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderAreaCallCenterCategoryOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormAreaCallCenterCategoryFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '所属类别',
    formItemLayout = null,
    required = true,
    name = 'category',
    otherProps = null,
  ) => {
    const title = label || '所属类别';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderAreaCallCenterCategoryOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  merchantStarList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantStarList = global.merchantCreditScore || [];

    if (withUnlimited) {
      return refitCommonData(merchantStarList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantStarList);
  };

  getMerchantStarName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantStarList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantStarOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantStarList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantStarFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '站长星级',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '站长星级';

    return (
      <FormItem label={title}>
        {getFieldDecorator('creditScore', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantStarOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormMerchantStarSelectFormItem = (
    value,
    helper = buildFieldHelper('选择站长星级'),
    onChangeCallback,
    label = '站长星级',
    formItemLayout = null,
    required = true,
    name = 'creditScore',
    otherProps = null,
  ) => {
    const title = label || '站长星级';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderMerchantStarOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  merchantStainScore = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantStainScore = global.merchantStainScore || [];

    if (withUnlimited) {
      return refitCommonData(merchantStainScore, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantStainScore);
  };

  getMerchantStainName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantStainScore(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantStainOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantStainScore(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantStainFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '污点值',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '污点值';

    return (
      <FormItem label={title}>
        {getFieldDecorator('stainScore', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantStainOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormMerchantStainSelectFormItem = (
    value,
    helper = buildFieldHelper('选择站长污点值'),
    onChangeCallback,
    label = '污点值',
    formItemLayout = null,
    required = true,
    name = 'stainScore',
    otherProps = null,
  ) => {
    const title = label || '污点值';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderMerchantStainOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  merchantShopStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantShopStateList = global.merchantShopStateList || [];

    if (withUnlimited) {
      return refitCommonData(merchantShopStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantShopStateList);
  };

  getMerchantShopStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantShopStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantShopStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantShopStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantShopStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '店铺状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '店铺状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isCloseShop', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantShopStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  // 票务
  storeStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const storeStateList = global.storeStateList || [];

    if (withUnlimited) {
      return refitCommonData(storeStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(storeStateList);
  };

  getStoreStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.storeStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderStoreStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.storeStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchStoreStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '商家状态',
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商家状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderStoreStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };

  detailNameList = (withUnlimited = true) => {
    const { global } = this.props;

    const detailNameList = global.detailNameList || [];
    console.log(detailNameList);
    if (withUnlimited) {
      return refitCommonData(detailNameList, unlimitedWithNumberFlag);
    }

    return refitCommonData(detailNameList);
  };

  getDetailName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.detailNameList(false));
    return item == null ? '未知' : item.name;
  };

  renderDetailNameOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.detailNameList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDetailChangeNameFormItem = (
    selectName = null,
    label = '规格名称'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '规格名称';
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <FormItem label={title} labelAlign='left' {...formItemLayout} >
        {getFieldDecorator('simpleTicketDetailId', {
          rules: [{ required: true, message: buildFieldDescription(title, '选择') }], initialValue: selectName ? selectName[0].flag : null
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDetailNameOption(false)}
          </Select>,
        )}
      </FormItem>
    );
  }



  openCloseStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const openCloseStateList = global.openCloseStateList || [];

    if (withUnlimited) {
      return refitCommonData(openCloseStateList,unlimitedWithNumberSelect);
    }

    return refitCommonData(openCloseStateList);
  };

  getOpenCloseStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.openCloseStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderOpenCloseStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.openCloseStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderOpenCloseSwitchFormItem = (
    label,
    name,
    required = false,
    helper = null,
    withUnlimited = true,
    initialValue = -10000,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label

    return (
      <FormItem label={title} extra={helper}>
        {getFieldDecorator(name, {
          rules: [{ required, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderOpenCloseStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };


  liveTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const liveTypeList = global.liveTypeList || [];

    if (withUnlimited) {
      return refitCommonData(liveTypeList, unlimitedWithNumberSelect);
    }

    return refitCommonData(liveTypeList);
  };

  getLiveTypeListStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.liveTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderliveTypeStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.liveTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderliveTypeFormItem = (
    label,
    name,
    required = false,
    helper = null,
    withUnlimited = true,
    initialValue = -10000,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label

    return (
      <FormItem label={title} extra={helper}>
        {getFieldDecorator(name, {
          rules: [{ required, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderliveTypeStateOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };







  screenTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const screenTypeList = global.screenTypeList || [];

    if (withUnlimited) {
      return refitCommonData(screenTypeList, unlimitedWithNumberSelect);
    }

    return refitCommonData(screenTypeList);
  };

  getScreenTypeListStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.screenTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderScreenTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.screenTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderScreenTypeFormItem = (
    label,
    name,
    required = false,
    helper = null,
    withUnlimited = true,
    initialValue = -10000,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label

    return (
      <FormItem label={title} extra={helper}>
        {getFieldDecorator(name, {
          rules: [{ required, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderScreenTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };
  

  



  isFeedsPublicList = (withUnlimited = true) => {
    const { global } = this.props;

    const isFeedsPublicList = global.isFeedsPublicList || [];

    if (withUnlimited) {
      return refitCommonData(isFeedsPublicList, unlimitedWithNumberSelect);
    }

    return refitCommonData(isFeedsPublicList);
  };

  getisFeedsPublicStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.isFeedsPublicList(false));
    return item == null ? '未知' : item.name;
  };

  renderIsFeedsPublicOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.isFeedsPublicList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderIsFeedsPublicFormItem = (
    label,
    name,
    required = false,
    helper = null,
    withUnlimited = true,
    initialValue = -10000,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label

    return (
      <FormItem label={title} extra={helper}>
        {getFieldDecorator(name, {
          rules: [{ required, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select  style={{ width: '100%' }}>
            {this.renderIsFeedsPublicOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };




  priceTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const priceTypeList = global.priceTypeList || [];

    if (withUnlimited) {
      return refitCommonData(priceTypeList, unlimitedWithNumberSelect);
    }

    return refitCommonData(priceTypeList);
  };

  getPriceTypeListStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.priceTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderPriceTypeListOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.priceTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderPriceTypeListFormItem = (
    label,
    name,
    required = false,
    helper = null,
    withUnlimited = true,
    initialValue = -10000,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label

    return (
      <FormItem label={title} extra={helper}>
        {getFieldDecorator(name, {
          rules: [{ required, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select  style={{ width: '100%' }}>
            {this.renderPriceTypeListOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };




  productStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const productStatusList = global.productStatusList || [];

    if (withUnlimited) {
      return refitCommonData(productStatusList, unlimitedWithNumberFlag);
    }

    return refitCommonData(productStatusList);
  };

  getproductStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductStatusListOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductStatusListFormItem = (
    label,
    name,
    required = false,
    helper = null,
    withUnlimited = true,
    initialValue = -10000,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label

    return (
      <FormItem label={title} extra={helper}>
        {getFieldDecorator(name, {
          rules: [{ required, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select  style={{ width: '100%' }}>
            {this.renderProductStatusListOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };



  cityOrderPayTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const cityOrderPayTypeList = global.cityOrderPayTypeList || [];

    if (withUnlimited) {
      return refitCommonData(cityOrderPayTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(cityOrderPayTypeList);
  };

  getCityOrderPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.cityOrderPayTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderCityOrderPayTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.cityOrderPayTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCityOrderPayTypeFormItem = (
    label,
    name,
    required = false,
    helper = null,
    withUnlimited = true,
    initialValue = -10000,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label

    return (
      <FormItem label={title} extra={helper}>
        {getFieldDecorator(name, {
          rules: [{ required, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select  style={{ width: '100%' }}>
            {this.renderCityOrderPayTypeOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };




  cityOrderStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const cityOrderStatusList = global.cityOrderStatusList || [];

    if (withUnlimited) {
      return refitCommonData(cityOrderStatusList, unlimitedWithNumberFlag);
    }

    return refitCommonData(cityOrderStatusList);
  };

  getCityOrderStatusListName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.cityOrderStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderCityOrderStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.cityOrderStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchCityOrderStatusFormItem = (
    label,
    name,
    required = false,
    helper = null,
    withUnlimited = true,
    initialValue = -10000,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label

    return (
      <FormItem label={title} extra={helper}>
        {getFieldDecorator(name, {
          rules: [{ required, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select  style={{ width: '100%' }}>
            {this.renderCityOrderStatusOption(withUnlimited)}
          </Select>,
        )}
      </FormItem>
    );
  };




}

export default Index;
