import LandingPage from './pages/landing-page';
import Imprint from './pages/imprint';
import Policies from './pages/policies';

interface PageRoute {
  path: `/${string}`;
  component: JSX.Element;
  label: string;
}

export const navigationRoutes: PageRoute[] = [
  {
    component: <LandingPage />,
    label: 'Landing Page',
    path: '/',
  },
  {
    component: <Imprint />,
    label: 'Imprint',
    path: '/imprint',
  },
  {
    component: <Policies />,
    label: 'Policies',
    path: '/policies',
  },
];

export const pageRoutes: PageRoute[] = [];

export const routes: PageRoute[] = [...navigationRoutes, ...pageRoutes];
