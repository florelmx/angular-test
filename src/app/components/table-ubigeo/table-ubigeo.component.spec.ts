import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUbigeoComponent } from './table-ubigeo.component';
import { CaseUbigeoService } from 'src/app/business/uses-case/case-ubigeo.service';
import { RequestService } from 'src/app/services/request.service';
import { HttpClientModule } from '@angular/common/http';
import { throwError, of } from 'rxjs';

describe('TableUbigeoComponent', () => {
   let component: TableUbigeoComponent;
   let fixture: ComponentFixture<TableUbigeoComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [TableUbigeoComponent],
         imports: [
            HttpClientModule
         ],
         providers: [
            CaseUbigeoService,
            RequestService
         ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TableUbigeoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should show title input', () => {
      component.title = 'title test';
      fixture.detectChanges()
      expect(fixture.nativeElement.querySelector('h3').innerText).toEqual('title test')
   })

   it('should no undefined conditionTable input', () => {
      component.title = 'title test';
      expect(component.title).not.toBeUndefined()
   })

   describe('When loadData is called', () => {
      it('should handle error conditionTable undefined', () => {
         spyOn(component._caseUbigeo, 'getDataConditional').and.returnValue(throwError({ error: 'error' }));
         component.loadData();
         expect(component.error).toBe(false)
      })

      it('should handle error conditionTable definite', () => {
         component.conditionTable = 'test'
         spyOn(component._caseUbigeo, 'getDataConditional').and.returnValue(throwError({ error: 'error' }));
         component.loadData();
         expect(component.error).toBe(true)
      })

      it('all should conditionTable undefined', () => {
         spyOn(component._caseUbigeo, 'getDataConditional').and.returnValue(of({ ubigeo: [] }));
         component.loadData();
         expect(component.error).toBe(false)
      })

      it('all should conditionTable definite', () => {
         component.conditionTable = 'test'
         spyOn(component._caseUbigeo, 'getDataConditional').and.returnValue(of({ ubigeo: [] }));
         component.loadData();
         expect(component.error).toBe(false)
      })

   })

});
