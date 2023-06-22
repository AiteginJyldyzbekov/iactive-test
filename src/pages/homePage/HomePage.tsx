import React, { lazy, useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const CardsBlock = lazy(async () => {
  // Искусственная задержка на 3 секунды
  await sleep(2000);
  return import('../../components/cardBlock/CardsBlock');
});

const HomePage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<CircularProgress sx={{
        position: 'absolute',
        top: '50%',
        left: '50%'
      }} />}>
        <Header />
        <CardsBlock />
      </Suspense>
    </>
  )
};

export default HomePage;
