import { Dropdown, Layout, Space, MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface FrameHeaderUIProps {}

const FrameHeaderUI = (props: FrameHeaderUIProps) => {
  const menuItems: MenuProps['items'] = [];
  return (
    <Layout.Header className="admin-header">
      <div className="admin-header-nav">
        <div className="admin-header-left">
          <div className="admin-header-logo">
            <a href="/">
              <span>Invoicing App</span>
            </a>
          </div>
        </div>
        <div className="admin-header-right">
          <Dropdown menu={{ items: menuItems }}>
            <span className="admin-header-action">
              <Space>
                <UserOutlined />
              </Space>
            </span>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default FrameHeaderUI;
