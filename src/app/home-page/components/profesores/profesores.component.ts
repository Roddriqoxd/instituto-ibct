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
      imagen: '/assets/images/WIL.png',
      nombre: 'Wily  Candia',
      subtitulo: 'Licenciado en ingeniería en sistemas',
      biografia: `Lucía Andrade es Licenciada en Literatura Hispánica por la Universidad Nacional de Córdoba.
      Con más de 15 años de experiencia en el ámbito educativo, ha dedicado su carrera a fomentar el pensamiento
      crítico y el amor por la lectura en estudiantes de secundaria y nivel superior. Ha participado en numerosos
      congresos de literatura latinoamericana y talleres de escritura creativa. Actualmente coordina un programa
      de fomento a la lectura en zonas rurales y colabora como editora en una revista literaria independiente.`,
      frase: 'La educación es el arma más poderosa que puedes usar para cambiar el mundo. Nelson Mandela',
    },
    {
      imagen: '/assets/images/FER.png',
      nombre: 'Fernando Ríos Morales',
      subtitulo: 'Doctor en Física Aplicada',
      biografia: `Javier Ríos es Doctor en Física Aplicada por la Universidad Técnica Federico Santa María. Es investigador
      en temas de superconductividad y estructuras cuánticas, y ha publicado artículos en revistas científicas internacionales.
      Como docente, es conocido por su enfoque práctico y cercano con los estudiantes, motivándolos a involucrarse en proyectos
      científicos desde etapas tempranas. También colabora en ferias científicas regionales como jurado y mentor.`,
      frase: 'El propósito de la educación es reemplazar una mente vacía por una abierta. Malcolm Forbes',
    },
    {
      imagen: '/assets/images/JUAN.png',
      nombre: 'Juan Solis',
      subtitulo: 'Magíster en Educación y Tecnología',
      biografia: `Carmen Soliz es Magíster en Educación y Tecnología por la Universidad de Chile. Tiene más de 20 años de experiencia
      capacitando a docentes en metodologías activas y uso de plataformas digitales. Lidera un programa nacional de transformación
      digital educativa e imparte talleres sobre el uso pedagógico de herramientas TIC en entornos escolares y universitarios.`,
      frase: 'La educación no es llenar un balde, sino encender un fuego. William Butler Yeats',
    },
    {
      imagen: '/assets/images/CARLOS.png',
      nombre: 'Alberto Cuéllar Torres',
      subtitulo: 'Ingeniero en Sistemas',
      biografia: `Alberto Cuéllar es Ingeniero en Sistemas por la Universidad Mayor de San Andrés. Con más de 10 años en la enseñanza
      de desarrollo de software, ha liderado hackatones y mentorías para estudiantes de programación. Se especializa en bases de datos
      y arquitectura de software, y promueve el aprendizaje basado en proyectos reales para preparar a los alumnos para el mundo laboral.`,
      frase: 'En tiempos de cambio, quienes estén abiertos al aprendizaje se adueñarán del futuro. Eric Hoffer',
    },
    {
      imagen: '/assets/images/docente1.jpg',
      nombre: 'Daniela Ortega Flores',
      subtitulo: 'Licenciada en Psicología Educativa',
      biografia: `Daniela Ortega es Licenciada en Psicología con mención en Psicología Educativa por la Universidad Católica Boliviana.
      Ha trabajado más de una década acompañando a estudiantes en su desarrollo emocional y académico. Desarrolla talleres sobre técnicas
      de estudio, organización del tiempo y manejo del estrés, y colabora con instituciones educativas en la mejora del bienestar estudiantil.`,
      frase: 'La educación no cambia el mundo: cambia a las personas que van a cambiar el mundo. Paulo Freire',
    }
  ];

  constructor(private viewportScroller: ViewportScroller, private _tipoRutaService: RutasService) {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this._tipoRutaService.setTipoRuta('docentes')
  }
}
