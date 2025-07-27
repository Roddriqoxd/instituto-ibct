import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/components/home-page/home-page.component';
import {InicioPageComponent} from './home-page/components/inicio-page/inicio-page.component';
import {DashboardComponent} from './dashboard/dashboard/components/dashboard/dashboard.component';
import {StudentFormComponent} from './dashboard/dashboard/components/student-form/student-form.component';
import {CoursesListComponent} from './dashboard/dashboard/components/courses-list/courses-list.component';
import {StudentListComponent} from './dashboard/dashboard/components/student-list/student-list.component';
import {CreateCourseComponent} from './dashboard/dashboard/components/create-course/create-course.component';
import {PricesComponent} from './dashboard/dashboard/components/prices/prices.component';
import {PaymentFormComponent} from './dashboard/dashboard/components/payment-form/payment-form.component';
import {BartenderComponent} from './home-page/components/bartender/bartender.component';
import {ComputacionComponent} from './home-page/components/computacion/computacion.component';
import {EnsambladoComponent} from './home-page/components/ensamblado/ensamblado.component';
import {DGraficoComponent} from './home-page/components/d-grafico/d-grafico.component';
import {CelularesComponent} from './home-page/components/celulares/celulares.component';
import {PagosListComponent} from './dashboard/dashboard/components/pagos-list/pagos-list.component';
import {ProfesoresComponent} from './home-page/components/profesores/profesores.component';
import {
  IncomeExpensesListComponent
} from './dashboard/dashboard/components/income-expenses-list/income-expenses-list.component';
import {
  ExpensesIncomeFormComponent
} from './dashboard/dashboard/components/expenses-income-form/expenses-income-form.component';
import {PaymentListComponent} from './dashboard/dashboard/components/payment-list/payment-list.component';
import {ReportsListComponent} from './dashboard/dashboard/components/reports-list/reports-list.component';

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
        path: 'bartender',
        component: BartenderComponent,
      },
      {
        path: 'computacion',
        component: ComputacionComponent,
      },
      {
        path: 'ensamblado-computadoras',
        component: EnsambladoComponent,
      },
      {
        path: 'diseño-grafico',
        component: DGraficoComponent,
      },
      {
        path: 'reparacion-celulares',
        component: CelularesComponent,
      },
      {
        path: 'docentes',
        component: ProfesoresComponent,
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
        path: 'registrar-estudiantes',
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
        path: 'crear-pago',
        component: PaymentFormComponent,
      },
      {
        path: 'pagos-dia',
        component: PagosListComponent,
      },
      {
        path: 'lista-pagos',
        component: PaymentListComponent,
      },
      {
        path: 'ingresos-egresos',
        component: IncomeExpensesListComponent,
      },
      {
        path: 'registrar-ingreso-egreso',
        component: ExpensesIncomeFormComponent,
      },
      {
        path: 'lista-reportes',
        component: ReportsListComponent,
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
