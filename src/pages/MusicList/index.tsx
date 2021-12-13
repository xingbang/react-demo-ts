import React, { useEffect, useState, useRef, useContext } from 'react';
import { Context } from '@src/store/CustomProvider';
import { getDetail, getMusicDetail } from '@src/service/api/music';
import Icon from '@src/commponents/Icon';
import IScrollBar from '@src/commponents/ScrollBar';
import './index.less';

const MusicList: React.FC = () => {
  const { _state, _dispatch } = useContext(Context);
  const { songId } = _state;
  const [lists, setLists] = useState<any>('');
  const audioRef = useRef<any>();

  useEffect(() => {
    getDetail({ id: songId }).then((res: any) => {
      setLists(res?.playlist);
    });
  }, []);

  const musicDetai = (id: string, dt: number, tit: string, name: string, img: string) => {
    getMusicDetail({ id: id }).then((res: any) => {
      _dispatch({
        musicUrl: res.data[0].url,
        musicTime: dt,
        musicImg: img,
        musicTit: tit,
        musicName: name
      })
    });
  }

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <IScrollBar fixedTop="0px" >
        <div className="music-top" style={{ backgroundImage: `url(${lists?.coverImgUrl})` }}>
          <div className="filter"></div>
          <h5>歌单</h5>
          <div className="music-top-up">
            <div className="music-top-img">
              <img src={lists?.coverImgUrl} style={{ width: '100%' }} />
            </div>
            <div className="music-top-right">
              <div className="music-tit">{lists?.name}</div>
              <div className="music-con">{lists?.creator?.nickname}</div>
            </div>
          </div>
        </div>
        <ul className="music-ul">
          {lists?.tracks &&
            lists?.tracks.map((item: any, index: number) => {
              return (
                <li className="music-li" key={index} onClick={() => musicDetai(item.id, item.dt, item.al.name, item.ar[0].name, item.al.picUrl)}>
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
    </div >
  );
};

export default MusicList;
