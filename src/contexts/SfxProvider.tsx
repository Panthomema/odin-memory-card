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

  const battlecries: Record<number, Howl> = {};

  const effects = useMemo(
    () => ({
      action: new Howl({ src: [actionSfx], volume: sfxVolume }),
      error: new Howl({ src: [errorSfx], volume: sfxVolume }),
    }),
    [],
  );

  const toggleSfx = () => {
    effects.action.play();
    setSfxEnabled((prev) => !prev);
  };

  const playActionSfx = () => {
    if (!sfxEnabled) return;
    effects.action.play();
  };

  const playBattlecrySfx = (id: number) => {
    if (!sfxEnabled) return;
    const howl = battlecries[id];
    if (howl) {
      howl.play();
    } else {
      const url = `/sounds/battlecries/${id}.ogg`;
      new Howl({ src: [url], volume: sfxVolume }).play();
    }
  };

  const playErrorSfx = () => {
    if (!sfxEnabled) return;
    effects.error.play();
  };

  const preloadBattlecries = (ids: number[]) => {
    ids.forEach((id) => {
      if (!battlecries[id]) {
        const url = `/sounds/battlecries/${id}.ogg`;
        battlecries[id] = new Howl({
          src: [url],
          volume: sfxVolume,
          preload: true,
        });
      }
    });
  };

  return (
    <SfxContext.Provider
      value={{
        sfxEnabled,
        toggleSfx,
        playActionSfx,
        playBattlecrySfx,
        playErrorSfx,
        preloadBattlecries,
      }}
    >
      {children}
    </SfxContext.Provider>
  );
}

export default SfxProvider;
