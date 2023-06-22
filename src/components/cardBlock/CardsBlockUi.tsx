import React, { lazy } from 'react';
import scss from './CardsBlock.module.scss';
import { LoadingStatus } from '../../types/types';

const CircularProgress = lazy(async () => {
  return import('@mui/material/CircularProgress');
});

interface CardsBlockPresentationProps {
  loading: LoadingStatus | null;
  delayLoad: boolean;
  renderMessages: React.ReactNode;
}

const CardsBlockUi: React.FC<CardsBlockPresentationProps> = React.memo(({
  renderMessages,
  loading,
  delayLoad,
}) => {

  const renderLoader = () => {
    if (loading === LoadingStatus.pending || delayLoad) {
      return <CircularProgress />;
    }
  };

  return (
    <div className='container'>
      <div className={scss.messages__wrapper}>
        <div className={scss.loader__container}>{renderLoader()}</div>
        {renderMessages}
        <div className={scss.loader__container}>{renderLoader()}</div>
      </div>
    </div>
  );
});

export default CardsBlockUi;