import clsx from 'clsx';
import styles from '@/components/Loading/Loading.module.css';
import { useEffect, useState } from 'react';

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 20));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <progress
      className={clsx('nes-progress', styles.bar)}
      value={progress}
      max="100"
    ></progress>
  );
}

export default Loading;
