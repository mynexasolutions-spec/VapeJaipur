'use client';

import { useEffect, useState } from 'react';

const AUTOPLAY_MS = 4500;

export default function HeroImageSlider({ images }) {
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused, reduceMotion, index]);

  return (
    <div
      className="jp-hero-visual"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="jp-hero-slides">
        {images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className={`jp-hero-slide-img ${i === index ? 'is-active' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            aria-hidden={i !== index}
          />
        ))}
      </div>
      <div className="jp-hero-stand" aria-hidden="true"></div>

      {count > 1 && (
        <div className="jp-hero-dots">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={`jp-hero-dot ${i === index ? 'is-active' : ''}`}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
