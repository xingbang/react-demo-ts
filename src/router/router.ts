// 路由懒加载
import { lazy } from 'react';

export interface MenuDataItem {
  name: string; // 菜单名称
  icon?: string;
  path: string;
  children?: MenuDataItem[];
  component: any; // 组件
  permission?: string; // 权限标识
  isHide?: boolean; // 是否隐藏
}

const Index = lazy(() => import('@src/pages/Index'));
const MusicList = lazy(() => import('@src/pages/MusicList'));

const menuData: MenuDataItem[] = [
  {
    name: '首页',
    path: '/index',
    component: Index
  },
  {
    name: '歌单详情',
    path: '/music-list',
    component: MusicList
  }
];

export default menuData;
