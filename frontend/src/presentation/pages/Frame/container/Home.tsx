import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import '../component/home.css';
import FrameHeaderUI from '@presentation/pages/Frame/component/HeaderUI';
import FrameFooterUI from '@presentation/pages/Frame/component/FooterUI';

const homeConfig = {
  footerText: 'Invoicing App 2025 by Jordy',
};

const FrameHome: React.FC = () => {
  return (
    <Layout>
      <FrameHeaderUI />
      <Layout>
        <Layout className="admin-main">
          <Layout.Content className="admin-content">
            <Outlet />
          </Layout.Content>
          <FrameFooterUI text={homeConfig.footerText} />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FrameHome;
