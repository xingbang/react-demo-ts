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
    return () => destroy();
  }, [children]);

  const ScrollBarInit = () => {
    scroll = new BScroll('.scrollbar-wrapper', {
      scrollY: true,
      scrollbar: true,
      click: true,
    });
  };

  const destroy = () => {
    scroll.destroy();
  };

  return (
    <div className="scrollbar">
      <div className="scrollbar-wrapper" style={{ top: fixedTop }}>
        <div className="scrollbar-content">
          {children}
        </div>
      </div>
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
  );
};

export default IScrollBar;
