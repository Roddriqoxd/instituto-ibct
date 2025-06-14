import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/components/home-page/home-page.component';
import {InicioPageComponent} from './home-page/components/inicio-page/inicio-page.component';
import {DashboardComponent} from './dashboard/dashboard/components/dashboard/dashboard.component';
import {StudentFormComponent} from './dashboard/dashboard/components/student-form/student-form.component';
import { CoursesListComponent } from './dashboard/dashboard/components/courses-list/courses-list.component';
import {StudentListComponent} from './dashboard/dashboard/components/student-list/student-list.component';
import {CreateCourseComponent} from './dashboard/dashboard/components/create-course/create-course.component';
import {PricesComponent} from './dashboard/dashboard/components/prices/prices.component';

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
    children: [
      {
        path: 'registar-estudiantes',
        component: StudentFormComponent,
      },
      {
        path: 'lista-cursos',
        component: CoursesListComponent,
      },
      {
        path: 'lista-estudiantes',
        component: StudentListComponent,
      },
      {
        path: 'crear-curso',
        component: CreateCourseComponent,
      },
      {
        path: 'precios',
        component: PricesComponent,
      },
      {
        path: '**',
        redirectTo: 'lista-estudiantes',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
