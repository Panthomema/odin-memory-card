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
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let increment: NavigationIncrement = 0;

      if (e.key === 'ArrowLeft') increment = -1;
      else if (e.key === 'ArrowRight') increment = 1;

      if (increment !== 0) {
        setSelectedIndex((prev) => {
          const next = prev + increment;
          if (next < 0 || next >= itemCount) return prev;
          return next as typeof prev;
        });
      }

      if (e.key === 'Enter') {
        onEnter(selectedIndex);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [itemCount, onEnter, selectedIndex]);

  return selectedIndex;
}
