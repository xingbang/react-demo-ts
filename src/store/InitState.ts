import MusicInitState from './state/music';

export class GlobalState {
  onLoding = false; // loading
  onRefresh = 0; // 手动刷新
}

const State = {
  ...new GlobalState(), // 全局state
  ...new MusicInitState() // 音乐state
};

export default State;
