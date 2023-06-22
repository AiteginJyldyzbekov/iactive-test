import React from 'react';
import scss from "./Select.module.scss";
import { SelectUiProps } from '../../types/types';

const SelectUi: React.FC<SelectUiProps> = ({
  showOptions,
  selectedOption,
  handleButtonClick,
  handleOptionClick,
}) => {
  return (
    <>
      <div className={scss.select__wrapper}>
        <p className={scss.select__button} onClick={handleButtonClick}>
          Сортировка <span>^</span>
        </p>
        {showOptions && (
          <div className={scss.options}>
            <div
              className={selectedOption === 'ASC' ? scss.selected : scss.option}
              onClick={() => handleOptionClick('ASC')}
            >
              Новые в верху
            </div>
            <div
              className={selectedOption === 'DESC' ? scss.selected : scss.option}
              onClick={() => handleOptionClick('DESC')}
            >
              Новые с низу
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectUi;