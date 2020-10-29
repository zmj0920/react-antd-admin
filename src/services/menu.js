import request from '@/utils/request';
export async function getMenuData(params) {
  return request('/api/account/get_menu', {
    method: 'POST',
    data: params,
  });
}

