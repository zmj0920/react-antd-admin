import { queryCurrent, query as queryUsers,testData } from '@/services/user';
import {
  handlePageListDataAssist,
  handleCommonDataAssist,
} from '../utils/tools';


const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *testData({ payload }, { call, put }) {
      const response = yield call(testData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },

  },
  reducers: {
    handlePageListData(state, action) {
      return handlePageListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
