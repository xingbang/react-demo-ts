import React, { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import './index.less';

interface ScrollProps {
  fixedTop: string;
}

const IScrollBar: React.FC<ScrollProps> = (props) => {
  const { fixedTop, children } = props;
  let scroll: any;
  BScroll.use(ScrollBar);

  useEffect(() => {
    ScrollBarInit()
  }, [children]);

  const ScrollBarInit = () => {
    scroll = new BScroll('.scrollbar-wrapper', {
      scrollY: true,
      scrollbar: true
    });
  };

  return (
    <div className="scrollbar">
      <div className="scrollbar-wrapper" style={{ top: fixedTop }}>
        {children}
        {/* <ul className="scrollbar-content">
          {lists &&
            lists.map((item: any, index: number) => {
              return (
                <li className="scrollbar-content-item" key={index}>
                  <img src={item.picUrl} />
                  <div className="scrollbar-list">
                    <div className="scrollbar-name">{item.name}</div>
                    <div className="scrollbar-span">
                      播放量：{numberInt(item.playCount, 0)}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul> */}
      </div>
    </div>
  );
};

export default IScrollBar;
