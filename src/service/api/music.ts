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

// 歌单详情
export function getDetail() {
  return request({
    url: '/playlist/detail?id=7096659611',
    method: 'GET'
  });
}
