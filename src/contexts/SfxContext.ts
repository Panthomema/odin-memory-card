import { createContext } from 'react';

type SfxContextType = {
  sfxEnabled: boolean;
  toggleSfx: () => void;
  playActionSfx: () => void;
  playCardSfx: (id: number) => void;
  playErrorSfx: () => void;
};

const SfxContext = createContext<SfxContextType>({
  sfxEnabled: true,
  toggleSfx: () => {},
  playActionSfx: () => {},
  playCardSfx: (id: number) => {
    console.log(id);
  },
  playErrorSfx: () => {},
});

export default SfxContext;
