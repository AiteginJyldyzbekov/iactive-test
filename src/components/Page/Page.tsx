import { Grid } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { RouteType } from '../../types/types';

interface PropsTypes {
  routes: RouteType[];
}
const Page: React.FC<PropsTypes> = ({ routes }) => {
  const renderComponent = ({ path, Component }: RouteType) => (
    <Route key={path} path={path} element={<Component />} />
  );
  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
        <Routes>
          {routes.map(renderComponent)}
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Page;
