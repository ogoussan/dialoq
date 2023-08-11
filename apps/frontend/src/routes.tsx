import { Role } from '@dialoq/types';
import HomePage from './pages/home';
import Lesson from './pages/lesson';
import Profile from './pages/profile';
import LandingPage from './pages/landing-page';

interface PageRoute {
  path: `/${string}`;
  component: JSX.Element;
  label: string;
  restrictions?: Role[];
}

export const navigationRoutes: PageRoute[] = [
  {
    component: <LandingPage />,
    label: 'Landing Page',
    path: '/',
  },
  {
    component: <HomePage />,
    label: 'Home',
    path: '/app',
  },
  {
    component: <Lesson />,
    label: 'Lesson',
    path: '/app/lesson/:id',
  },
  {
    component: <Profile />,
    label: 'Profile',
    path: '/app/profile',
  },
];

export const pageRoutes: PageRoute[] = [];

export const routes: PageRoute[] = [...navigationRoutes, ...pageRoutes];
