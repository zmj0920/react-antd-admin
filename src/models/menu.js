import { getMenuData } from '@/services/menu';

const MenuModel = {
    namespace: 'menu',
  
    state: {
      menuRouter: [],
    },
  
    effects: {
      *fetchMenu(_, { call, put }) {
        const response = yield call(getMenuData);
        yield put({
          type: 'saveMenuData',
          payload: response.data,
        });
      },
    },
  
    reducers: {
      saveMenuData(state, { payload }) {
       
        return {
          ...state,
          menuRouter: payload,
        };
      },
    },
  };
  
  export default MenuModel;