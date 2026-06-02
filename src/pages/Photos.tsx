import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Photos.css';

const modules = import.meta.glob('/src/assets/photos/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}', { eager: true });
const photos: string[] = Object.values(modules).map((mod: any) => mod.default);

const Photos = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const prev = useCallback(() => {
    setSelected((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  }, []);

  const next = useCallback(() => {
    setSelected((i) => (i !== null ? (i + 1) % photos.length : null));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <div className="photos">
      <div className="container">
        <motion.div
          className="photos-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">
            <span className="mono">&lt;</span>
            photography
            <span className="mono">/&gt;</span>
          </h1>
          <p className="photos-subtitle">shot on fujifilm x-t30 ii · 27mm f/2.8</p>
        </motion.div>

        {photos.length === 0 ? (
          <p className="photos-empty mono">// no photos yet</p>
        ) : (
          <motion.div
            className="photos-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {photos.map((src, i) => (
              <motion.div
                key={src}
                className="photo-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 9) * 0.05 }}
                onClick={() => setSelected(i)}
              >
                <img src={src} alt={`Photo ${i + 1}`} loading="lazy" />
                <div className="photo-overlay" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <button className="lightbox-close" onClick={close}>✕</button>

            <button
              className="lightbox-arrow lightbox-prev"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <span className="mono">&lt;</span>
            </button>

            <motion.img
              key={selected}
              src={photos[selected]}
              alt={`Photo ${selected + 1}`}
              className="lightbox-img"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="lightbox-arrow lightbox-next"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <span className="mono">&gt;</span>
            </button>

            <span className="lightbox-count mono">
              {selected + 1} / {photos.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photos;
