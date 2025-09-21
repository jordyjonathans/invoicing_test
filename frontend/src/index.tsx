import './assets/styles/style.css';
import en_US from 'antd/es/locale/en_US';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import routers from '@app/routes/routes';
import RouterView from '@app/routes/view';
import { store } from '@app/redux/store';

const container = document.getElementById('root');
if (container != null) {
  const root = createRoot(container);

  const App = () => {
    return (
      <Provider store={store}>
        {/* <FcmListener /> */}
        <ConfigProvider locale={en_US}>
          <RouterView routers={routers} />
        </ConfigProvider>
      </Provider>
    );
  };

  root.render(<App />);
}
