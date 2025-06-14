import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Table, TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import {InscripcionService} from '../../services/inscripcion.service';
import {take} from 'rxjs';
import {InscripcionResponseDTO} from '../../interfaces/inscripcion.interface';


interface Customer {
  nombre: string;
  curso: string;
  horario: string;
  telefono: string;
  modalidad: string;
  status: string;
}

@Component({
  selector: 'app-student-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    RouterModule,
    CheckboxModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  private _inscripcionService: InscripcionService = inject(InscripcionService);

  customers: Customer[] = [
    {
      nombre: 'Brook Simmons',
      curso: 'Sales Executive',
      horario: 'Miatronet',
      telefono: 'higbrooksmmms.co',
      modalidad: 'LinkedIn',
      status: 'Active'
    },
    {
      nombre: 'Dianne Russell',
      curso: 'CEO',
      horario: 'BriteMonk',
      telefono: 'higdionmetussell.com',
      modalidad: 'Website',
      status: 'Inactive'
    },
    {
      nombre: 'Amy Elsner',
      curso: 'Product Manager',
      horario: 'ZenTrollMs',
      telefono: 'higomyelsner.com',
      modalidad: 'Cold Call',
      status: 'Prospect'
    },
    {
      nombre: 'Jacob Jones',
      curso: 'Manager',
      horario: 'Streamlinz',
      telefono: 'jacobjones@gmail.com',
      modalidad: 'Partner',
      status: 'Prospect'
    },
    {
      nombre: 'CW Cameron Watson',
      curso: 'Product Manager',
      horario: 'BriteMonk',
      telefono: 'higcameronwilliamson',
      modalidad: 'Social Media',
      status: 'Active'
    },
    {
      nombre: 'WW Wade Warren',
      curso: 'Director',
      horario: 'Streamlinz',
      telefono: 'higonmetteblock.com',
      modalidad: 'Cold Call',
      status: 'Inactive'
    },
    {
      nombre: 'Guy Hawkins',
      curso: 'Director',
      horario: 'Wavelength',
      telefono: 'higdonrelsteward.com',
      modalidad: 'LinkedIn',
      status: 'Active'
    },
    {
      nombre: 'Annette Block',
      curso: 'Manager',
      horario: 'Wavelength',
      telefono: 'jeromebell@gmail.com',
      modalidad: 'Website',
      status: 'Inactive'
    },
    {
      nombre: 'Darrell Steward',
      curso: 'Product Manager',
      horario: 'ZenTrollMs',
      telefono: 'higonyamalimba.co',
      modalidad: 'Website',
      status: 'Active'
    },
    {
      nombre: 'Amy Elsner',
      curso: 'Product Manager',
      horario: 'ZenTrollMs',
      telefono: 'higomyelsner.com',
      modalidad: 'Cold Call',
      status: 'Prospect'
    },
    {
      nombre: 'Jacob Jones',
      curso: 'Manager',
      horario: 'Streamlinz',
      telefono: 'jacobjones@gmail.com',
      modalidad: 'Partner',
      status: 'Prospect'
    },
    {
      nombre: 'CW Cameron Watson',
      curso: 'Product Manager',
      horario: 'BriteMonk',
      telefono: 'higcameronwilliamson',
      modalidad: 'Social Media',
      status: 'Active'
    },
    {
      nombre: 'WW Wade Warren',
      curso: 'Director',
      horario: 'Streamlinz',
      telefono: 'higonmetteblock.com',
      modalidad: 'Cold Call',
      status: 'Inactive'
    },
    {
      nombre: 'Guy Hawkins',
      curso: 'Director',
      horario: 'Wavelength',
      telefono: 'higdonrelsteward.com',
      modalidad: 'LinkedIn',
      status: 'Active'
    },
    {
      nombre: 'Annette Block',
      curso: 'Manager',
      horario: 'Wavelength',
      telefono: 'jeromebell@gmail.com',
      modalidad: 'Website',
      status: 'Inactive'
    },
    {
      nombre: 'Darrell Steward',
      curso: 'Product Manager',
      horario: 'ZenTrollMs',
      telefono: 'higonyamalimba.co',
      modalidad: 'Website',
      status: 'Active'
    },
    {
      nombre: 'Amy Elsner',
      curso: 'Product Manager',
      horario: 'ZenTrollMs',
      telefono: 'higomyelsner.com',
      modalidad: 'Cold Call',
      status: 'Prospect'
    },
    {
      nombre: 'Jacob Jones',
      curso: 'Manager',
      horario: 'Streamlinz',
      telefono: 'jacobjones@gmail.com',
      modalidad: 'Partner',
      status: 'Prospect'
    },
    {
      nombre: 'CW Cameron Watson',
      curso: 'Product Manager',
      horario: 'BriteMonk',
      telefono: 'higcameronwilliamson',
      modalidad: 'Social Media',
      status: 'Active'
    },
    {
      nombre: 'WW Wade Warren',
      curso: 'Director',
      horario: 'Streamlinz',
      telefono: 'higonmetteblock.com',
      modalidad: 'Cold Call',
      status: 'Inactive'
    },
    {
      nombre: 'Guy Hawkins',
      curso: 'Director',
      horario: 'Wavelength',
      telefono: 'higdonrelsteward.com',
      modalidad: 'LinkedIn',
      status: 'Active'
    },
    {
      nombre: 'Annette Block',
      curso: 'Manager',
      horario: 'Wavelength',
      telefono: 'jeromebell@gmail.com',
      modalidad: 'Website',
      status: 'Inactive'
    },
    {
      nombre: 'Darrell Steward',
      curso: 'Product Manager',
      horario: 'ZenTrollMs',
      telefono: 'higonyamalimba.co',
      modalidad: 'Website',
      status: 'Active'
    }
  ];

  estudiantes: InscripcionResponseDTO[] = [];

  filteredCustomers: InscripcionResponseDTO[] = [];
  selectedStatus: string | null = null;
  selectedSource: string | null = null;
  searchText: string = '';

  statusOptions = [
    {label: 'All Status', value: null},
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
    {label: 'Prospect', value: 'Prospect'}
  ];

  sourceOptions = [
    {label: 'All Sources', value: null},
    {label: 'LinkedIn', value: 'LinkedIn'},
    {label: 'Website', value: 'Website'},
    {label: 'Cold Call', value: 'Cold Call'},
    {label: 'Partner', value: 'Partner'},
    {label: 'Social Media', value: 'Social Media'}
  ];

  constructor() {
  }

  ngOnInit() {
    this._inscripcionService.listaInscritos()
      .pipe(take(1))
      .subscribe((inscritos)=>{
        console.log(inscritos);
        this.estudiantes = inscritos;
        this.filteredCustomers =  inscritos;
      })
  }

  filterCustomers() {
    this.filteredCustomers = this.estudiantes.filter(customer => {
      const matchesSearch = !this.searchText ||
        customer.estudiante.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        customer.estudiante.apellidoPaterno.toLowerCase().includes(this.searchText.toLowerCase()) ||
        customer.estudiante.apellidoMaterno.toLowerCase().includes(this.searchText.toLowerCase()) ||
        customer.curso.nombre.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus = !this.selectedStatus || customer.estado === this.selectedStatus;

      const matchesSource = !this.selectedSource || customer.curso.modalidad === this.selectedSource;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }

  onSearchChange(event: any) {
    this.searchText = event.target.value;
    this.filterCustomers();
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.value;
    this.filterCustomers();
  }

  onSourceChange(event: any) {
    this.selectedSource = event.value;
    this.filterCustomers();
  }

  clearFilters(table: Table) {
    this.searchText = '';
    this.selectedStatus = null;
    this.selectedSource = null;
    this.filterCustomers();
    table.reset();
  }
}
