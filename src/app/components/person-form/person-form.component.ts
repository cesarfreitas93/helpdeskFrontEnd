import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PersonReqDto } from 'src/app/models/personReq';
import { PersonService } from 'src/app/services/person.service';
import { NotificationsService } from 'angular2-notifications';
import {COMMA, ENTER} from '@angular/cdk/keycodes';  
import {FormControl} from '@angular/forms';  
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';  
import {MatChipInputEvent} from '@angular/material/chips';  
import {Observable} from 'rxjs';  
import {map, startWith} from 'rxjs/operators';  
export interface Fruit {  
  name: string;  
}  
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['tecnico'];
  allFruits: string[] = ["master", "administrador", "supervisor", "tecnico"];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  matAutocomplete!: MatAutocomplete;  
  persona : PersonReqDto = new PersonReqDto();
  hide = true;
  constructor(
    private personService: PersonService,
    private router:Router,
    private snack:MatSnackBar,
    private notificationService: NotificationsService
  ) { 
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }




  ngOnInit(): void {
  }

  formSubmit() {
    if (this.persona.username == ''|| this.persona.username == null) {
      this.showSnack('Ingrese su nombre de usuario');
      return;
    }
    if (this.persona.password == ''|| this.persona.password == null) {
      this.showSnack('Ingrese su contraseña');
      return;
    }
    if (this.persona.name == ''|| this.persona.name == null) {
      this.showSnack('Ingrese el nombre completo');
      return;
    }
    if (this.persona.docnumber == ''|| this.persona.docnumber == null) {
      this.showSnack('Ingrese el documento de identidad');
      return;
    } else if (!this.validarDni(this.persona.docnumber)) {
      this.showSnack('Ingrese un número de documento válido');
      return;
    }

    this.persona.roles = this.fruits;
    console.log(this.persona);

    this.personService.saveProject(this.persona).subscribe( result => {
        console.log(result);
        this.notificacionSuccess("Success", "Persona Registrada");

    },(error => {
      console.log(error);
      this.notificacionError(error.status, error.error.msg);
    }));
  }

  volverListado() {
    this.router.navigate(['people']);
  }

  validarDni(dni:string):boolean {
    let regex = /^\d{8}(?:[-\s]\d{4})?$/;
    return regex.test(dni);
  }

  showSnack(msg:string) {
    this.snack.open(msg, 'Ok', {
      duration: 3000
    })
  }

  notificacionError( titulo: string, mensaje: string) {
    this.notificationService.error( titulo, mensaje, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }
  
  notificacionSuccess( titulo: string, mensaje: string) {
    this.notificationService.success( titulo, mensaje, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  
}
