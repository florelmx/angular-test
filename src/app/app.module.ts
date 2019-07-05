import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RequestService } from './services/request.service';
import { CaseUbigeoService } from './business/uses-case/case-ubigeo.service';
import { HttpClientModule } from '@angular/common/http';
import { TableUbigeoComponent } from './components/table-ubigeo/table-ubigeo.component';

@NgModule({
   declarations: [
      AppComponent,
      TableUbigeoComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule
   ],
   providers: [
      RequestService,
      CaseUbigeoService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
