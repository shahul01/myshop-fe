import React from 'react';
import { bool, func } from 'prop-types';
import SVG from '../SVG';
import styles from "../imageGallery.module.css";

const RightNav = React.memo(({
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`${styles['image-gallery-icon']} ${styles['image-gallery-right-nav']}`}
      disabled={disabled}
      onClick={onClick}
      aria-label="Next Slide"
    >
      <SVG icon="right" viewBox="6 0 12 24" />
    </button>
  );
});

RightNav.displayName = 'RightNav';

RightNav.propTypes = {
  disabled: bool.isRequired,
  onClick: func.isRequired,
};


export default RightNav;
