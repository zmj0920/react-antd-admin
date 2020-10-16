import request from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '../utils/tools';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}


// export async function testData(params) {
//   return request('/api/test', {
//     method: 'POST',
//     data: { ...params },
//   });
// }

export async function testData(params){
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }
  
  return request('/api/test', {
    method: 'POST',
    body: params,
  });
}
