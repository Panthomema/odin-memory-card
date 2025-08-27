import background from '@/assets/sounds/background.mp3';
import ReactHowler from 'react-howler';
import { useEffect, useRef, useState } from 'react';

type BackgroundMusicProps = {
  playing: boolean;
  muted: boolean;
};

function BackgroundMusic({ playing, muted }: BackgroundMusicProps) {
  const playerRef = useRef<ReactHowler>(null);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const howl = playerRef.current?.howler;
    if (!howl) return;

    if (playing) {
      if (fadingOut) setFadingOut(false);
      howl.seek(0);
      howl.volume(0.3);
    } else {
      setFadingOut(true);
      howl.fade(howl.volume(), 0, 1000); // 1 segundo
      const timeout = setTimeout(() => setFadingOut(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [playing, fadingOut]);

  return (
    <ReactHowler
      ref={playerRef}
      src={background}
      playing={playing || fadingOut}
      loop
      mute={muted}
      volume={0.3}
    />
  );
}

export default BackgroundMusic;
