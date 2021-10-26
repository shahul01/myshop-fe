import React from 'react';
import { bool, func } from 'prop-types';
import SVG from '../SVG';
import styles from "../imageGallery.module.css";

const PlayPause = React.memo(({
  isPlaying,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`${styles['image-gallery-icon']} ${styles['image-gallery-play-button']}`}
      onClick={onClick}
      aria-label="Play or Pause Slideshow"
    >
      <SVG strokeWidth={2} icon={isPlaying ? 'pause' : 'play'} />
    </button>
  );
});

PlayPause.displayName = 'PlayPause';

PlayPause.propTypes = {
  isPlaying: bool.isRequired,
  onClick: func.isRequired,
};


export default PlayPause;
