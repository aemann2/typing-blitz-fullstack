import { useEffect } from 'react';

export default function useKeypress(callback) {
  useEffect(() => {
    window.addEventListener('keydown', callback);
    return () => window.removeEventListener('keydown', callback);
  });
}
