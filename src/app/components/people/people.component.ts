import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { PersonDto } from 'src/app/models/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  persons: PersonDto[] = new Array;

  constructor(
    private router:Router,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.consultarPersonas();
  }

  registrarPersona() {
    this.router.navigate(['people/register']);
  }

  consultarPersonas() {
    this.personService.getPersons().subscribe(result => {
      console.log(result);
      this.persons = result.data.content;
      console.log(this.persons);
    },error => console.log(error));
  }
}
