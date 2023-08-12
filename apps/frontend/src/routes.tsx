import { Role } from '@dialoq/types';
import HomePage from './pages/home';
import Lesson from './pages/lesson';
import Profile from './pages/profile';

interface PageRoute {
  path: `/${string}`;
  component: JSX.Element;
  label: string;
  restrictions?: Role[];
  isProtected?: boolean;
}

export const navigationRoutes: PageRoute[] = [
  {
    component: <HomePage />,
    label: 'Home',
    path: '/',
    isProtected: true,
  },
  {
    component: <Lesson />,
    label: 'Lesson',
    path: '/lesson/:id',
    isProtected: true,
  },
  {
    component: <Profile />,
    label: 'Profile',
    path: '/profile',
    isProtected: true,
  },
];

export const pageRoutes: PageRoute[] = [];

export const routes: PageRoute[] = [...navigationRoutes, ...pageRoutes];
