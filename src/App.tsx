import useRoutes from './helpers/hooks/useRoutes';
import './styles/App.scss';
import React from 'react';

const App: React.FC = () => {
  const routes = useRoutes();
  return <div>{routes}</div>;
};

export default App;
