import React, { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import { getBanner } from '@src/service/api/music';
import { useMount, useUnmount } from 'ahooks';
import './index.less';

const Index: React.FC = () => {

  const [banners, setBanners] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  let slide: any;

  BScroll.use(Slide)

  useEffect(() => {
    getBanner().then((res: any) => {
      setBanners(res.banners)
      init();
    })
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
  </>)
}

export default Index;