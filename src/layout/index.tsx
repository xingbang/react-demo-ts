import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Context } from '@src/store/CustomProvider';
import menuData from '@src/router/router';
import Player from '@src/commponents/Player';
// import './index.less';

const LayoutDefault: React.FC = (props: any) => {
  const { _state } = useContext(Context);
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/index" />} />
        {menuData.map((item: any) => (
          <Route
            key={item.path}
            path={item.path}
            exact={true}
            render={(props) => {
              return <item.component {...props} />;
            }}
          />
        ))}
      </Switch>
      {_state.musicUrl ?
        <Player audioSrc={_state.musicUrl} title={_state.musicTit} name={_state.musicName} duration={_state.musicTime / 1000} image={_state.musicImg}></Player>
        : ''}
    </>
  );
};

export default LayoutDefault;
