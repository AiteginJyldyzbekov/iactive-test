import React from 'react';
import scss from './Header.module.scss'
import Select from '../select/Select';

const Header: React.FC = () => {
  return (
    <div className={scss.wrapper}>
      <div className='container'>
        <div className={scss.wrapper__navs}>
          <p>Лента сообщений</p>
          <Select />
        </div>
      </div>
    </div>
  )
};

export default Header;
