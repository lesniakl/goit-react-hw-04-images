import React, { useEffect } from 'react';
import css from './Modal.module.css';
import { useFinder } from 'hooks/useFinder';

export default function Modal() {
  const { toggleModal, selected } = useFinder();

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      toggleModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={css.Overlay} onClick={toggleModal}>
      <div className={css.Modal}>
        <img src={selected.url} alt={selected.alt} />
      </div>
    </div>
  );
}
