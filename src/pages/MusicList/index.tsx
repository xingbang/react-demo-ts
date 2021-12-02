import React, { useEffect, useState } from 'react';
import { getDetail } from '@src/service/api/music';
import Icon from '@src/commponents/Icon';
import IScrollBar from '@src/commponents/ScrollBar';
import './index.less';

const MusicList: React.FC = () => {
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    getDetail().then((res: any) => {
      setLists(res?.playlist.tracks);
    });
  }, []);

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <h5>推荐歌单</h5>
      <IScrollBar fixedTop="60px" >
        <ul className="scrollbar-content">
          {lists &&
            lists.map((item: any, index: number) => {
              return (
                <li className="scrollbar-content-item" key={index}>
                  <img src={item.al.picUrl} />
                  <div className="scrollbar-list">
                    <div className="scrollbar-name">{item.name}{item.alia[0] ? `（${item.alia[0]}）` : ''}</div>
                    <div className="scrollbar-span">
                      {`${item.ar[0]?.name}-${item.al?.name}`}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </IScrollBar>
    </div>
  );
};

export default MusicList;
