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
export function getDetail(params: { id: string }) {
  return request({
    url: '/playlist/detail',
    method: 'GET',
    params
  });
}

// 歌曲详情
export function getMusicDetail(params: { id: string }) {
  return request({
    url: '/song/url',
    method: 'GET',
    params
  });
}
