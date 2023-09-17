import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick }) => (
  <div className={styles.buttonContainer}>
    <button className={styles.Button} onClick={onClick}>
      Load more
    </button>
  </div>
);

export default Button;
