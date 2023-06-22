import React, { useState } from 'react';
import scss from "./Select.module.scss";
import { useSelectorMessages } from '../../store/selectors';
import useMessages from '../../helpers/hooks/useMessage';
import { useAppDispatch } from '../../helpers/hooks/hook';
import { setAscending } from '../../store/slices/messageSlice';

const Select: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState('DESC');
  const { messages } = useSelectorMessages();
  const { sortMessages } = useMessages(messages)

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option: string) => {
    if(option === "ASC"){
      dispatch(setAscending("ASC"))
    }else {
      dispatch(setAscending("DESC"))
    }
    setSelectedOption(option);
    sortMessages(option)
    setShowOptions(false);
  };
  return (
    <>
      <div className={scss.app}>
        <button className={scss.button} onClick={handleButtonClick}>
          Сортировка
        </button>
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
      </div >
    </>
  )
};

export default Select;
