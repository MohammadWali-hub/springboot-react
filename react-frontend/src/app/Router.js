import { MultiProvider } from '@/common/hooks/MultiProvider';
import { RoutesProvider } from '@/common/hooks/RoutesProvider';
import { App as AntApp } from 'antd';
import App from '@/app';
import { HistoryRouter, history } from './HistoryRouter';

import './index.less';

const Router = () => (
  <HistoryRouter history={history}>
    <MultiProvider providers={[<RoutesProvider key="routes" />]}>
      <AntApp>
        <App />
      </AntApp>
    </MultiProvider>
  </HistoryRouter>
);
export default Router;
