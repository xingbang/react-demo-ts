import React, { useState, useEffect, useRef } from 'react';
import ProgressCircle from '@src/commponents/ProgressCircle';
import Icon from '@src/commponents/Icon';
import './index.less';

interface tracks {
  title: string;
  name: string;
  artist?: string;
  audioSrc: string;
  image: string;
  duration: number;
}

const Player: React.FC<tracks> = (props) => {
  const { title, name, artist, audioSrc, image, duration } = props
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const audioRef = useRef<any>();
  const isReady = useRef(false); // 一个布尔值，用于确定何时准备好运行某些操作。
  const intervalRef = useRef<any>();
  console.log(duration);
  console.log(currentTime);

  useEffect(() => {
    if (isPlaying && audioSrc) {
      playAudio();
      startTimer();
    } else {
      pauseAudio();
      clearInterval(intervalRef.current);
    }

  }, [isPlaying, audioSrc])

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      pauseAudio();
      clearInterval(audioRef.current);
    }
  }, []);

  useEffect(() => {
    pauseAudio();
    if (isReady.current) {
      playAudio();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  // 获取播放时间
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);
  }

  const togglePlaying = () => {
    setIsPlaying(!isPlaying)
  }

  const playAudio = () => {
    // 播放
    audioRef.current.play();
  };

  const pauseAudio = () => {
    // 暂停
    audioRef.current.pause();
  };

  const toPrevTrack = () => {
    // if (trackIndex - 1 < 0) {
    //   setTrackIndex(tracks.length - 1);
    // } else {
    //   setTrackIndex(trackIndex - 1);
    // }
  }

  const toNextTrack = () => {
    // if (trackIndex < tracks.length - 1) {
    //   setTrackIndex(trackIndex + 1);
    // } else {
    //   setTrackIndex(0);
    // }
  }

  const onScrub = (value: string) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
  }

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
  }

  return (<>
    <div className="mini-player">
      <div className="icon">
        <img className="cdClass" width="40" height="40" src={image} />
      </div>
      <div className="text">
        <h2 className="name">{title}</h2>
        <p className="desc">{name}</p>
      </div>
      <div className="control">
        <ProgressCircle radius={32} percent={currentTime / duration}>
          <div className="x-play" onClick={togglePlaying}>
            {!isPlaying ? <Icon name="play-b" /> : <Icon name="pause" />}
          </div>
        </ProgressCircle>
      </div>
    </div >
    <audio src={audioSrc} ref={audioRef} preload={"auto"}></audio >
  </>)
}

export default Player;