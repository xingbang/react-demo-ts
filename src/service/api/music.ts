import request from '../http';

// banner
export function getBanner() {
  return request({
    url: process.env.REACT_APP_API_URL + '/banner?type=2',
    method: 'GET'
  });
}

// 推荐歌单 30
export function getList() {
  return request({
    url: process.env.REACT_APP_API_URL + '/personalized?limit=30',
    method: 'GET'
  });
}
