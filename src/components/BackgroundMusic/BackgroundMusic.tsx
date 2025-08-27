import background from '@/assets/sounds/background.mp3';
import ReactHowler from 'react-howler';
import { useEffect, useRef } from 'react';

type BackgroundMusicProps = {
  playing: boolean;
  muted: boolean;
};

function BackgroundMusic({ playing, muted }: BackgroundMusicProps) {
  const playerRef = useRef<ReactHowler>(null);

  useEffect(() => {
    if (playing && playerRef.current) {
      playerRef.current.seek(0);
    }
  }, [playing]);

  return (
    <ReactHowler
      ref={playerRef}
      src={background}
      playing={playing}
      loop
      mute={muted}
      volume={0.3}
    />
  );
}

export default BackgroundMusic;
