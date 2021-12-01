import React, { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import ScrollBar from '@better-scroll/scroll-bar';
import { getBanner, getList } from '@src/service/api/music';
import { useMount, useUnmount } from 'ahooks';
import Icon from '@src/commponents/Icon';
import './index.less';
import { isTemplateExpression } from 'typescript';

const Index: React.FC = () => {

  const [banners, setBanners] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  let slide: any;
  let scroll: any;
  let scrollAny: any;

  BScroll.use(Slide)
  BScroll.use(ScrollBar)

  useEffect(() => {
    getBanner().then((res: any) => {
      setBanners(res.banners)
      init();
    })
    getList().then((res: any) => {
      setList(res.result);
      initBscroll();
    })
    ScrollBarInit();
    return () => destroy();
  }, [])

  // useMount(() => init());

  // useUnmount(() => destroy());

  const init = () => {
    slide = new BScroll('.slide-banner-wrapper', {
      scrollX: true,
      scrollY: false,
      slide: true,
      momentum: false,
      bounce: false,
      probeType: 3
    })

    slide.on('scrollEnd', _onScrollEnd)

    slide.on('slideWillChange', (page: any) => {
      console.log('CurrentPage changed to => ', page)
      setCurrentPageIndex(page.pageX)
    })

    // v2.1.0
    slide.on('slidePageChanged', (page: any) => {
      // console.log('CurrentPage changed to => ', page)
    })
  }

  const ScrollBarInit = () => {
    scroll = new BScroll('.scroll-wrapper', {
      scrollX: true,
      scrollY: false,
      click: true,
      probeType: 1,
      scrollbar: true
    })
    scroll.on('scrollEnd', () => {
      console.log('scrollEnd')
    })
    scroll.on('scrollStart', () => {
      console.log('scrollStart')
    })
    scroll.on('scroll', () => {
      console.log('scroll')
    })
  }

  const initBscroll = () => {
    scrollAny = new BScroll('.scrollbar-wrapper', {
      scrollY: true,
      scrollbar: true
    })
  }

  const _onScrollEnd = () => {
    // console.log('CurrentPage => ', slide.getCurrentPage())
  }
  const destroy = () => {
    slide.destroy()
  }
  const nextPage = () => {
    slide.next()
  }
  const prePage = () => {
    slide.prev()
  }

  return (<>
    <div className="slide-banner">
      <div className="banner-wrapper">
        <div className="slide-banner-wrapper">
          <div className="slide-banner-content">
            {
              banners && banners.map((item, index) => {
                return <div className={`slide-page page${index}`} key={index} style={{ backgroundImage: `url(${item.pic})` }}><a href={item.url}></a></div>
              })
            }
          </div>
        </div>
        <div className="dots-wrapper">
          {
            banners && banners.map((item, index) => {
              return <span className={`dot ${currentPageIndex === (index) ? 'active' : ''}`} key={index} ></span>
            })
          }
        </div>
      </div>
    </div >

    <div className="horizontal-scrollbar-container">
      <div className="scroll-wrapper">
        <div className="scroll-content">
          <div className='scroll-item'>
            <Icon name='mrtj' />
            <div>每日推荐</div>
          </div>
          <div className='scroll-item'>
            <Icon name='date' />
            <div>歌单</div>
          </div>
          <div className='scroll-item'>
            <Icon name='phb' />
            <div>排行榜</div>
          </div>
          <div className='scroll-item'>
            <Icon name='mv' />
            <div>MV</div>
          </div>
          <div className='scroll-item'>
            <Icon name='sz' />
            <div>设置</div>
          </div>
        </div>
      </div>
    </div>

    <h5>推荐歌单</h5>
    <div className="scrollbar">
      <div className="scrollbar-wrapper">
        <ul className="scrollbar-content">
          {list && list.map((item, index) => {
            return <li className="scrollbar-content-item" key={index}>
              <img src={item.picUrl} />
              <div className="scrollbar-list">
                <div className="scrollbar-name">{item.name}</div>
                <div className="scrollbar-span">播放量：{item.playCount}，点击亮：{item.trackCount}</div>
              </div>
            </li>
          })
          }
        </ul>
      </div>
    </div>
  </>)
}

export default Index;