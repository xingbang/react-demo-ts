import React, { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import { getBanner, getList } from '@src/service/api/music';
import { useMount, useUnmount } from 'ahooks';
import Icon from '@src/commponents/Icon';
import Slider from '@src/commponents/Slider';
import './index.less';

const Index: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);

  let scroll: any;
  let scrollAny: any;

  BScroll.use(ScrollBar);

  useEffect(() => {
    getBanner().then((res: any) => {
      setBanners(res.banners);
    });
    getList().then((res: any) => {
      setList(res.result);
      initBscroll();
    });
    ScrollBarInit();
  }, []);

  const ScrollBarInit = () => {
    scroll = new BScroll('.scroll-wrapper', {
      scrollX: true,
      scrollY: false,
      click: true,
      probeType: 1,
      scrollbar: true
    });
    scroll.on('scrollEnd', () => {
      console.log('scrollEnd');
    });
    scroll.on('scrollStart', () => {
      console.log('scrollStart');
    });
    scroll.on('scroll', () => {
      console.log('scroll');
    });
  };

  const initBscroll = () => {
    scrollAny = new BScroll('.scrollbar-wrapper', {
      scrollY: true,
      scrollbar: true
    });
  };

  return (
    <>
      <Slider banners={banners}></Slider>

      <div className="horizontal-scrollbar-container">
        <div className="scroll-wrapper">
          <div className="scroll-content">
            <div className="scroll-item">
              <Icon name="mrtj" />
              <div>每日推荐</div>
            </div>
            <div className="scroll-item">
              <Icon name="date" />
              <div>歌单</div>
            </div>
            <div className="scroll-item">
              <Icon name="phb" />
              <div>排行榜</div>
            </div>
            <div className="scroll-item">
              <Icon name="mv" />
              <div>MV</div>
            </div>
            <div className="scroll-item">
              <Icon name="sz" />
              <div>设置</div>
            </div>
          </div>
        </div>
      </div>

      <h5>推荐歌单</h5>
      <div className="scrollbar">
        <div className="scrollbar-wrapper">
          <ul className="scrollbar-content">
            {list &&
              list.map((item, index) => {
                return (
                  <li className="scrollbar-content-item" key={index}>
                    <img src={item.picUrl} />
                    <div className="scrollbar-list">
                      <div className="scrollbar-name">{item.name}</div>
                      <div className="scrollbar-span">
                        播放量：{item.playCount}，点击亮：{item.trackCount}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Index;
