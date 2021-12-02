import request from '../http';

// banner
export function getBanner() {
  return request({
    url: '/banner?type=2',
    method: 'GET'
  });
}

// 推荐歌单 30
export function getList() {
  return request({
    url: '/personalized?limit=30',
    method: 'GET'
  });
}
