import { Route, Routes } from 'react-router-dom';
import ProtectedLayout from '@/common/components/InnerLayout';
import ContentMng from '@/pages/content';
import './index.less';

const Pages = () => (
  <Routes>
    <Route path="/*" element={<ProtectedLayout />}>
      <Route path="food-trucks/*" element={<ContentMng />} />
    </Route>
  </Routes>
);

export default Pages;
