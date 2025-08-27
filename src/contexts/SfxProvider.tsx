import actionSfx from '@/assets/sounds/action.mp3';
import errorSfx from '@/assets/sounds/error.mp3';
import SfxContext from '@/contexts/SfxContext';
import { Howl } from 'howler';
import { useMemo, useState, type ReactNode } from 'react';

type SfxProviderProps = {
  children: ReactNode;
};

function SfxProvider({ children }: SfxProviderProps) {
  const [sfxEnabled, setSfxEnabled] = useState(true);

  const sfxVolume = 1;

  const sounds = useMemo(
    () => ({
      action: new Howl({ src: [actionSfx], volume: sfxVolume }),
      error: new Howl({ src: [errorSfx], volume: sfxVolume }),
    }),
    [],
  );

  const toggleSfx = () => {
    sounds.action.play();
    setSfxEnabled((prev) => !prev);
  };

  const playActionSfx = () => {
    if (!sfxEnabled) return;
    sounds.action.play();
  };

  const playBattlecrySfx = (id: number) => {
    if (!sfxEnabled) return;
    const url = `/sounds/battlecries/${id}.ogg`;
    new Howl({ src: [url], volume: sfxVolume }).play();
  };

  const playErrorSfx = () => {
    if (!sfxEnabled) return;
    sounds.error.play();
  };

  return (
    <SfxContext.Provider
      value={{
        sfxEnabled,
        toggleSfx,
        playActionSfx,
        playBattlecrySfx,
        playErrorSfx,
      }}
    >
      {children}
    </SfxContext.Provider>
  );
}

export default SfxProvider;
