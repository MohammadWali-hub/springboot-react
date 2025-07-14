import { Layout } from 'antd';
import Icon from '@ant-design/icons';

import Icons from '../Icon';
import './index.less';

const { Header } = Layout;

const HeaderNav = () => (
  <>
    <Header className="dbr-header">
      <div className="dbr-title">
        <span> React Spring Interview Demo</span>
      </div>
      <div className="user-info">
        <Icon component={Icons.account} />
      </div>
    </Header>
  </>
);

export default HeaderNav;
