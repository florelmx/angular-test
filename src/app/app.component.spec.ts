import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TableUbigeoComponent } from './components/table-ubigeo/table-ubigeo.component';
import { CaseUbigeoService } from './business/uses-case/case-ubigeo.service';
import { RequestService } from './services/request.service';
import { HttpClientModule } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [
            HttpClientModule
         ],
         declarations: [
            AppComponent,
            TableUbigeoComponent
         ],
         providers: [
            CaseUbigeoService,
            RequestService
         ]
      }).compileComponents();
   }));

   it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
   });

   it(`should have as title 'angular-test-technical'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('angular-test-technical');
   });

   it('should show  table-ubigeo', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges()
      const tableUbigeoEL = fixture.debugElement.query(By.css('app-table-ubigeo'))
      expect(tableUbigeoEL).toBeTruthy();
      const tableUbigeoComp = tableUbigeoEL.componentInstance as TableUbigeoComponent
      expect(tableUbigeoComp).toBeTruthy();
   })


   it('should no undefined conditionTable input in table-ubigeo', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges()
      const tableUbigeoEL = fixture.debugElement.query(By.css('app-table-ubigeo'))
      const tableUbigeoComp = tableUbigeoEL.componentInstance as TableUbigeoComponent
      tableUbigeoComp.title = 'title test';
      expect(tableUbigeoComp.title).not.toBeUndefined()
   })

   describe('When loadData is called in table-ubigeo', () => {
  
      it('should handle error', () => {
         const fixture = TestBed.createComponent(AppComponent);
         fixture.detectChanges()
         const tableUbigeoEL = fixture.debugElement.query(By.css('app-table-ubigeo'))
         const tableUbigeoComp = tableUbigeoEL.componentInstance as TableUbigeoComponent
         spyOn(tableUbigeoComp._caseUbigeo, 'getDataConditional').and.returnValue(throwError({ error: 'error' }));
         tableUbigeoComp.loadData();
         expect(tableUbigeoComp.error).toBe(true)
      })

      it('all should', () => {
         const fixture = TestBed.createComponent(AppComponent);
         fixture.detectChanges()
         const tableUbigeoEL = fixture.debugElement.query(By.css('app-table-ubigeo'))
         const tableUbigeoComp = tableUbigeoEL.componentInstance as TableUbigeoComponent
         spyOn(tableUbigeoComp._caseUbigeo, 'getDataConditional').and.returnValue(of({ ubigeo: [] }));
         tableUbigeoComp.loadData();
         expect(tableUbigeoComp.error).toBe(false)
      })
   })

});
