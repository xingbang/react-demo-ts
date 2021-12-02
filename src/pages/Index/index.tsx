import React, { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import { getBanner, getList } from '@src/service/api/music';
import { useMount, useUnmount } from 'ahooks';
import { numberInt } from '@src/utils/index';
import Icon from '@src/commponents/Icon';
import Slider from '@src/commponents/Slider';
import IScrollBar from '@src/commponents/ScrollBar';
import './index.less';

const Index: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [lists, setLists] = useState<any[]>([]);

  let scroll: any;

  BScroll.use(ScrollBar);

  useEffect(() => {
    getBanner().then((res: any) => {
      setBanners(res.banners);
    });
    getList().then((res: any) => {
      setLists(res.result);
      initBscroll();
    });

  }, []);

  const initBscroll = () => {
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

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
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
      <IScrollBar fixedTop="300px" >
        <div className="song-list">
          {
            lists && lists.map(item => {
              return (
                <div className="song-li" key={item.id}>
                  <div className="song-list-img">
                    <img src={item.picUrl} />
                    <div className="song-list-icon">
                      <Icon name="play-b" />
                      <div>&nbsp;{numberInt(item.playCount, 0)}</div>
                    </div>
                  </div>
                  <div className="song-list-tit">{item.name}</div>
                </div>
              )
            })
          }
        </div>
      </IScrollBar>
    </div>
  );
};

export default Index;
