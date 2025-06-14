import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/components/home-page/home-page.component';
import {InicioPageComponent} from './home-page/components/inicio-page/inicio-page.component';
import {DashboardComponent} from './dashboard/dashboard/components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'inicio',
        component: InicioPageComponent,
      },
      {
        path: '**',
        redirectTo: 'inicio',
      },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
