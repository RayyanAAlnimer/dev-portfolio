import { useEffect, useRef, useState } from 'react';
import confirmSound from '../assets/audio/ui-confirm.wav';

export default function useInterfaceSound() {
  const [enabled, setEnabled] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const audioRef = useRef(null);

  function playSound() {
    if (!audioRef.current) {
      audioRef.current = new Audio(confirmSound);
      audioRef.current.volume = 0.35;
    }

    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play().catch(error => {
      // Rapid clicks or muting can interrupt a pending play request.
      if (error.name === 'AbortError') return;
      setEnabled(false);
      setUnavailable(true);
    });
  }

  function toggleSound() {
    setUnavailable(false);
    if (enabled) {
      audioRef.current?.pause();
      setEnabled(false);
    } else {
      setEnabled(true);
      playSound();
    }
  }

  useEffect(() => {
    if (!enabled) return;

    function handleClick(event) {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest('a[href], button, [role="button"]');
      if (!control || control.closest('[data-sound-toggle]')) return;
      if (control.matches(':disabled, [aria-disabled="true"]')) return;
      playSound();
    }

    // Native click events cover pointer activation and keyboard activation.
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [enabled]);

  useEffect(() => {
    return () => audioRef.current?.pause();
  }, []);

  return { enabled, unavailable, toggleSound };
}
