import Error404 from '@presentation/pages/Error/Error404';
import FrameHome from '@presentation/pages/Frame';
import { IRouter } from '@app/routes/view';
import MainIndex from '@presentation/pages/Main';

const routers: IRouter[] = [
  {
    path: '/home',
    key: 'home',
    component: <FrameHome />,
  },
  {
    path: '/',
    key: 'index',
    component: <FrameHome />,
    children: [
      {
        index: true,
        key: 'main_index',
        component: <MainIndex />,
      },
      {
        path: '*',
        key: 'error_404',
        component: <Error404 />,
      },
    ],
  },
];

export default routers;
