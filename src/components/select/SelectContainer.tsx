import React, { useState } from 'react';
import SelectUi from './SelectUI';
import { useSelectorMessages } from '../../store/selectors';
import useMessages from '../../helpers/hooks/useMessage';
import { useAppDispatch } from '../../helpers/hooks/hook';
import { setAscending } from '../../store/slices/messageSlice';

const SelectContainer: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState('DESC');
  const { messages } = useSelectorMessages();
  const { sortMessages } = useMessages(messages);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option: string) => {
    if (option === 'ASC') {
      dispatch(setAscending('ASC'));
    } else {
      dispatch(setAscending('DESC'));
    }
    setSelectedOption(option);
    sortMessages(option);
    setShowOptions(false);
  };

  return (
    <SelectUi
      showOptions={showOptions}
      selectedOption={selectedOption}
      handleButtonClick={handleButtonClick}
      handleOptionClick={handleOptionClick}
    />
  );
};

export default SelectContainer;