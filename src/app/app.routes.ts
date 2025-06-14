import { Routes } from '@angular/router';
import {HomePageComponent} from './home-page/components/home-page/home-page.component';
import {InicioPageComponent} from './home-page/components/inicio-page/inicio-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'inicio',
        component: InicioPageComponent,
      },
      {
        path: '**',
        redirectTo: 'inicio',
      }
    ]
  }
];
