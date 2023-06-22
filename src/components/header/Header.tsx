import React from 'react';
import scss from './Header.module.scss'
import SelectContainer from '../select/SelectContainer';

const Header: React.FC = () => {
  return (
    <div className={scss.wrapper}>
      <div className='container'>
        <div className={scss.wrapper__navs}>
          <p>Лента сообщений</p>
          <SelectContainer />
        </div>
      </div>
    </div>
  )
};

export default Header;
