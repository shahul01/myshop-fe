import React from 'react';
import { bool, func } from 'prop-types';
import SVG from '../SVG';
import styles from "../imageGallery.module.css";

const LeftNav = React.memo(({
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`${styles['image-gallery-icon']} ${styles['image-gallery-left-nav']}`}
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <SVG icon="left" viewBox="6 0 12 24" />
    </button>
  );
});

LeftNav.displayName = 'LeftNav';

LeftNav.propTypes = {
  disabled: bool.isRequired,
  onClick: func.isRequired,
};


export default LeftNav;
