import React, { lazy } from 'react';
import { Suspense } from 'react';

const CircularProgress = lazy(async () => {
  return import('@mui/material/CircularProgress');
});

const Header = lazy(async () => {
  return import('../../components/header/Header');
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const CardsBlockContainer = lazy(async () => {
  // Искусственная задержка на 2 секунды
  await sleep(2000);
  return import('../../components/cardBlock/CardsBlockContainer');
});

const HomePage: React.FC = () => {
  return (
    <>
        <Header />
        <Suspense fallback={<CircularProgress sx={{
          position: 'absolute',
          top: '50%',
          left: '50%'
        }} />}>
          <CardsBlockContainer />
        </Suspense>
    </>
  )
};

export default HomePage;