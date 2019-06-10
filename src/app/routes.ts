import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';

export const allAppRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: CallbackComponent },
  { path: 'dashboard', component: DashboardComponent }
];
