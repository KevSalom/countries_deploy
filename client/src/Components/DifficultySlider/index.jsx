import React, { useState } from 'react';
import styles from './index.module.css'

const DifficultySlider = ({ onChange, setSliderValue, sliderValue }) => {


  const handleChange = (e) => {
    setSliderValue(parseInt(e.target.value));
    onChange(e);
    
  };

  return (
    <div className={styles['difficulty-slider']}>

      <input
        type="range"
        min={1}
        max={5}
        name='difficulty'
        id='difficulty'
        value={sliderValue}
        onChange={handleChange}
      />

      <div className={styles['slider-marks']}>
        <span className={styles['mark']}>1</span>
        <span className={styles['mark']}>2</span>
        <span className={styles['mark']}>3</span>
        <span className={styles['mark']}>4</span>
        <span className={styles['mark']}>5</span>
      </div>
      <span>Nivel de dificultad: {sliderValue}</span>
    </div>
  );
};

export default DifficultySlider;
