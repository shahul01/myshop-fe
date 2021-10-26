import React from 'react';
import { bool, func } from 'prop-types';
import SVG from '../SVG';
import styles from "../imageGallery.module.css";

const Fullscreen = React.memo(({
  isFullscreen,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`${styles['image-gallery-icon']} ${styles['image-gallery-fullscreen-button']}`}
      onClick={onClick}
      aria-label="Open Fullscreen"
    >
      <SVG strokeWidth={2} icon={isFullscreen ? 'minimize' : 'maximize'} />
    </button>
  );
});

Fullscreen.displayName = 'Fullscreen';

Fullscreen.propTypes = {
  isFullscreen: bool.isRequired,
  onClick: func.isRequired,
};


export default Fullscreen;
