import {Component, OnInit} from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import {ViewportScroller} from '@angular/common';
import {RutasService} from '../../services/rutas.service';

@Component({
  selector: 'app-profesores',
  imports: [
    CarouselModule
  ],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent implements OnInit {
  docentes = [
    {
      imagen: '/assets/images/WIL.webp',
      nombre: 'WILDER MÁLAGA MAMANI',
      subtitulo: 'Ingeniero Informático',
      biografia: `Soy docente en el Centro de Capacitación Técnica Privada I.B.C.T., donde contribuyo activamente a la 
      formación de estudiantes en el área de informática. Mi labor se enfoca en brindar una enseñanza orientada a la práctica, 
      con el objetivo de preparar técnicos capaces de desenvolverse con eficiencia en el ámbito tecnológico actual.
Considero que la educación va más allá de transmitir contenidos: se trata de formar personas con criterio, iniciativa y compromiso.
 Por eso, en cada clase busco promover el pensamiento lógico, la creatividad y la resolución de problemas, siempre con una base ética y profesional.
Utilizo estrategias didácticas que favorecen la participación activa y el trabajo colaborativo, integrando herramientas digitales y situaciones
 reales que acerquen al estudiante al entorno laboral.`,
      frase: 'La educación es el arma más poderosa que puedes usar para cambiar el mundo.',
    },
    {
      imagen: '/assets/images/FER.webp',
      nombre: 'FERNANDO CHOQUETANGA LEDEZMA',
      subtitulo: 'Ingeniero Electronico',
      biografia: `Como docente en el área de electrónica en el Centro de Capacitación Técnica Privada I.B.C.T., mi compromiso es brindar una
       formación técnica sólida, cercana y orientada a las necesidades del estudiante. Me esfuerzo por lograr que el conocimiento no solo sea 
       comprendido, sino también aplicado con responsabilidad y criterio.
En mis clases combino teoría, práctica y reflexión, promoviendo el aprendizaje activo, el pensamiento lógico y la autonomía. Considero que educar
 es mucho más que impartir contenidos: es acompañar, motivar y despertar el interés por seguir aprendiendo.`,
      frase: 'El propósito de la educación es reemplazar una mente vacía por una abierta.',
    },
    {
      imagen: '/assets/images/JUAN.webp',
      nombre: 'JUAN ABEL CRUZ MACHILLA',
      subtitulo: 'Ingeniero en Sistemas', 
      biografia: `Me desempeño como docente en el Centro de Capacitación Técnica Privada I.B.C.T., 
      donde tengo la responsabilidad de formar a estudiantes en el área técnica, con un enfoque práctico, dinámico y orientado a la realidad del mercado laboral.
Mi objetivo principal es brindar una formación sólida que no solo transmita conocimientos, sino que también 
despierte en los estudiantes la curiosidad, el pensamiento crítico y la capacidad de resolver problemas. 
Busco que cada clase sea una experiencia significativa, donde se aprenda haciendo, se cuestione con lógica y se trabaje con responsabilidad.
Aplico metodologías activas de enseñanza, fomentando la participación, el trabajo colaborativo y el uso de herramientas tecnológicas actuales. 
Considero que educar no es simplemente impartir contenidos, sino acompañar procesos de crecimiento personal y profesional.`,
      frase: 'La educación es la herramienta más poderosa para cambiar el mundo, y la tecnología',
    },
    {
      imagen: '/assets/images/CARLOS.webp',
      nombre: 'CARLOS ANDREE ORTEGA ESCOBAR',
      subtitulo: 'Chef Profesional en Gastronomía',
      biografia: `Me apasiona la enseñanza de la cocina y tengo la fortuna de desempeñarme como docente en el Centro de Capacitación Técnica Privada I.B.C.T., 
      donde guío a estudiantes en su formación profesional en gastronomía.
Mi enfoque pedagógico combina técnica, creatividad y reflexión. Cada clase es una oportunidad para desarrollar no solo habilidades culinarias, sino también 
actitudes que preparen a los estudiantes para un entorno laboral exigente y en constante evolución.
Creo que el aprendizaje continuo es esencial en nuestra área, y por eso impulso en mis alumnos una mentalidad abierta, resiliente y orientada a la mejora constante.`,
      frase: 'Enseñar gastronomía es enseñar cultura, disciplina y amor por los detalles.',
    }
  ];

  constructor(private viewportScroller: ViewportScroller, private _tipoRutaService: RutasService) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this._tipoRutaService.setTipoRuta('docentes')
  }
}
