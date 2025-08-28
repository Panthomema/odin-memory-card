import { createContext } from 'react';

type SfxContextType = {
  sfxEnabled: boolean;
  toggleSfx: () => void;
  playActionSfx: () => void;
  playBattlecrySfx: (id: number) => void;
  playErrorSfx: () => void;
  preloadBattlecries: (ids: number[]) => void;
};

const SfxContext = createContext<SfxContextType>({
  sfxEnabled: true,
  toggleSfx: () => {},
  playActionSfx: () => {},
  playBattlecrySfx: (id: number) => {
    void id;
  },
  playErrorSfx: () => {},
  preloadBattlecries: (ids: number[]) => {
    void ids;
  },
});

export default SfxContext;
