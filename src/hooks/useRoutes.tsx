import React, { ReactNode } from 'react';
import Page from '../components/Page/Page';
import { messageRoutes } from '../constants/routes';

const useRoutes = (): ReactNode => {
  return <Page routes={messageRoutes} />;
};

export default useRoutes;
