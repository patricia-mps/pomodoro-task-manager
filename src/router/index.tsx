import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/homepage';

const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  </HashRouter>
);

export default Router;
