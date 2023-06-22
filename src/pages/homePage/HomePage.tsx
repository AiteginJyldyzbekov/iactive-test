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
  // Искусственная задержка на 3 секунды
  await sleep(2000);
  return import('../../components/cardBlock/CardsBlockContainer');
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
        <CardsBlockContainer />
      </Suspense>
    </>
  )
};

export default HomePage;
