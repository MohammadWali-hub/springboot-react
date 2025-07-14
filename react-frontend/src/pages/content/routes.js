import { Route, Routes } from 'react-router-dom';

import TruckList from '../../common/components/FoodTruckList';

const ContentRoutes = () => (
  <Routes>
    <Route path="/list" element={<TruckList />} />
  </Routes>
);
export default ContentRoutes;

export const ContentPages = [TruckList];
