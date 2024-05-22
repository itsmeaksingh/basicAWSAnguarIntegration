import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user-list' },
  {
    path: 'user-list',
    component: UsersComponent,
  },
  {
    path: '**',
    redirectTo: 'user-list',
  },
];
