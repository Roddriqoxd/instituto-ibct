import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/components/dashboard/dashboard.component';
import {StudentFormComponent} from './dashboard/components/student-form/student-form.component';
import {CoursesListComponent} from './dashboard/components/courses-list/courses-list.component';
import {StudentListComponent} from './dashboard/components/student-list/student-list.component';
import {CreateCourseComponent} from './dashboard/components/create-course/create-course.component';
import {PricesComponent} from './dashboard/components/prices/prices.component';
import {PaymentFormComponent} from './dashboard/components/payment-form/payment-form.component';
import {PagosListComponent} from './dashboard/components/pagos-list/pagos-list.component';
import {
  IncomeExpensesListComponent
} from './dashboard/components/income-expenses-list/income-expenses-list.component';
import {
  ExpensesIncomeFormComponent
} from './dashboard/components/expenses-income-form/expenses-income-form.component';
import {PaymentListComponent} from './dashboard/components/payment-list/payment-list.component';
import {ReportsListComponent} from './dashboard/components/reports-list/reports-list.component';

export const routes: Routes = [
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
    redirectTo: 'dashboard',
  }
];
