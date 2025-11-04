import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/routes/course.routes').then((m) => m.courses_routes),
  },
];
