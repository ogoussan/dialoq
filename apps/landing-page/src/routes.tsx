import LandingPage from './pages/landing-page';

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
];

export const pageRoutes: PageRoute[] = [];

export const routes: PageRoute[] = [...navigationRoutes, ...pageRoutes];
