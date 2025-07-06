import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/components/home-page/home-page.component';
import {InicioPageComponent} from './home-page/components/inicio-page/inicio-page.component';
import {BartenderComponent} from './home-page/components/bartender/bartender.component';
import {ComputacionComponent} from './home-page/components/computacion/computacion.component';
import {EnsambladoComponent} from './home-page/components/ensamblado/ensamblado.component';
import {DGraficoComponent} from './home-page/components/d-grafico/d-grafico.component';
import {CelularesComponent} from './home-page/components/celulares/celulares.component';
import {ProfesoresComponent} from './home-page/components/profesores/profesores.component';

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
    path: '**',
    redirectTo: '',
  }
];
