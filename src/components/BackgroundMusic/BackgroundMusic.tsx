import { useEffect, useRef, useState } from 'react';
import ReactHowler from 'react-howler';

type BackgroundMusicProps = {
  src: string;
  volume: number;
  playing: boolean;
  muted: boolean;
};

function BackgroundMusic({
  src,
  volume,
  playing,
  muted,
}: BackgroundMusicProps) {
  const playerRef = useRef<ReactHowler>(null);
  const [shouldPlay, setShouldPlay] = useState<boolean>(playing);
  const transitionTime = 1000;

  useEffect(() => {
    const howl = playerRef.current?.howler;
    if (!howl) return;

    let transitionTimeout;

    if (playing) {
      transitionTimeout = setTimeout(() => {
        setShouldPlay(true);
        howl.seek(0);
        howl.volume(0);
        howl.fade(0, volume, transitionTime);
      }, transitionTime);
    } else {
      howl.fade(howl.volume(), 0, transitionTime);
      transitionTimeout = setTimeout(
        () => setShouldPlay(false),
        transitionTime,
      );
    }

    return () => clearTimeout(transitionTimeout);
  }, [playing, volume, transitionTime]);

  return (
    <ReactHowler
      ref={playerRef}
      src={src}
      playing={shouldPlay}
      mute={muted}
      volume={volume}
    />
  );
}

export default BackgroundMusic;
