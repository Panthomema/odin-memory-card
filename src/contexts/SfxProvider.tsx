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

  const sounds = useMemo(
    () => ({
      action: new Howl({ src: [actionSfx], volume: 1 }),
      error: new Howl({ src: [errorSfx], volume: 1 }),
    }),
    [],
  );

  const toggleSfx = () => {
    setSfxEnabled((prev) => !prev);
  };

  const playActionSfx = () => {
    sounds.action.play();
  };

  const playCardSfx = (id: number) => {
    if (!sfxEnabled) return;
    console.log(`Card sound played for Pokémon ${id}`);
    // Aquí usarías battlecries[id] o como tengas los .ogg
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
        playCardSfx,
        playErrorSfx,
      }}
    >
      {children}
    </SfxContext.Provider>
  );
}

export default SfxProvider;
