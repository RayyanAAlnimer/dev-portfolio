import { useEffect, useRef } from 'react';
import { startChipAnimation } from '../lib/chipAnimation.js';

export default function HeroChip({ direction = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    return startChipAnimation(canvasRef.current, direction);
  }, [direction]);

  return (
    <div className="hero-chip" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-chip-art" width="480" height="480" />
    </div>
  );
}
