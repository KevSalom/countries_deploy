import React, { useState } from "react";
import style from "./index.module.css";
import Button from "../Button";

export default function DropDown({ options, dropDownValue, setDropDownValue, defaultText }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    // Actualiza tanto el valor seleccionado en el componente como el valor customizado
    setDropDownValue(option);
    setShowOptions(false);
  };

  return (
    <div className={style.customSelect}>
      <Button
        text={dropDownValue || defaultText}
        onclick={handleButtonClick}
      />
      {showOptions && (
        <div className={style.optionsContainer}>
          {options.map((option, index) => (
            <div key={index} className={style.options} onClick={() => handleOptionClick(option)}>
               
        {option === dropDownValue && <span className={style.checkIcon}>✔️</span>}
        <p> {option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
