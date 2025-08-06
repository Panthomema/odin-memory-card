import type { NavigationIncrement } from '@/types/ui';
import { useEffect, useState } from 'react';

type UseKeyboardNavigationOptions = {
  itemCount: number;
  onEnter: (index: number) => void;
};

export function useKeyboardNavigation({
  itemCount,
  onEnter,
}: UseKeyboardNavigationOptions) {
  const [keyboardIndex, setKeyboardIndex] = useState(0);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const selectedIndex = hoveredIndex ?? keyboardIndex;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let increment: NavigationIncrement = 0;

      if (e.key === 'ArrowLeft') increment = -1;
      else if (e.key === 'ArrowRight') increment = 1;

      if (increment !== 0) {
        setKeyboardIndex((prev) => {
          const next = prev + increment;
          if (next < 0 || next >= itemCount) return prev;
          return next as typeof prev;
        });
      }

      if (e.key === 'Enter') {
        onEnter(keyboardIndex);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [itemCount, onEnter, keyboardIndex]);

  return {
    keyboardIndex,
    hoveredIndex,
    selectedIndex,
    setKeyboardIndex,
    setHoveredIndex,
  };
}
