import { Component, ViewChild } from '@angular/core';
import { CaseUbigeoService } from './business/uses-case/case-ubigeo.service';
import { TableUbigeoComponent } from './components/table-ubigeo/table-ubigeo.component';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {

   @ViewChild('tableUbigeo') tableUbigeo: TableUbigeoComponent

   title = 'angular-test-technical';

   constructor() { }

}
