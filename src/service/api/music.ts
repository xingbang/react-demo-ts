import request from '../http';

// banner
export function getBanner() {
  return request({
    url: process.env.REACT_APP_API_URL + '/banner?type=2',
    method: 'GET'
  });
}
