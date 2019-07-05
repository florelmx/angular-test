import { TestBed } from '@angular/core/testing';

import { CaseUbigeoService } from './case-ubigeo.service';
import { RequestService } from 'src/app/services/request.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { throwError, of } from 'rxjs';
import { UbigeoModel } from 'src/app/model/ubigeo.model';
import { UbigeoTableModel } from 'src/app/model/ubigeo-table.model';

describe('CaseUbigeoService', () => {

   let service: CaseUbigeoService
   let ubigeoDataTest: UbigeoModel
   ubigeoDataTest = new UbigeoModel()
   let dummyObj = []

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [
            HttpClientTestingModule
         ],
         providers: [
            CaseUbigeoService,
            RequestService
         ]
      });
      service = TestBed.get(CaseUbigeoService)
      ubigeoDataTest.initData()

      ubigeoDataTest.department = {
         code: '02',
         name: 'Arequipa'
      };
      ubigeoDataTest.province = {
         code: '63',
         name: 'Arequipa'
      }
      ubigeoDataTest.district = {
         code: '267',
         name: 'Cercado'
      }

      dummyObj = [ubigeoDataTest]
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('When getDataLocal is called', () => {
      it('should handle error', () => {
         spyOn(service.requestService, 'getLocally').and.returnValue(throwError({ error: true }));
         return service.getDataLocal().toPromise().catch(error => {
            expect(error.error).toBe(true)
         })
      })

      it('should success', () => {
         spyOn(service.requestService, 'getLocally').and.returnValue(of('"02 Arequipa / 63 Arequipa / 267 Cercado"'));
         service.getDataLocal().subscribe(data => {
            console.log(data instanceof UbigeoModel)
            expect((data.length > 0 ? true : false)).toBe(true)
         })
      })

      it('should success data empety', () => {
         spyOn(service.requestService, 'getLocally').and.returnValue(of(''));
         service.getDataLocal().subscribe(data => {
            expect(data.length).toEqual(0)
         })
      })

      it('should success obj in array UbigeoModel valid', () => {
         spyOn(service.requestService, 'getLocally').and.returnValue(of('"02 Arequipa / 63 Arequipa / 267 Cercado"'));
         service.getDataLocal().subscribe(data => {
            console.log()
            expect(data[0] instanceof UbigeoModel).toBe(true)
         })
      })
   })

   describe('When getDataConditional is called', () => {
      it('should handle error', () => {
         spyOn(service, 'getDataLocal').and.returnValue(throwError({ error: true }));
         return service.getDataConditional().toPromise().catch(error => {
            
            expect(error.error).toBe(true)
         })
      })

      it('should success', () => {
         spyOn(service, 'getDataLocal').and.returnValue(of(dummyObj));
         service.getDataConditional().subscribe(data => {
            expect((data.length > 0 ? true : false)).toBe(true)
         })
      })

      it('should success data empty', () => {
         spyOn(service, 'getDataLocal').and.returnValue(of([]));
         service.getDataConditional().subscribe(data => {
            expect(data.length).toEqual(0)
         })
      })

      it('should success params key empty', () => {
         spyOn(service, 'getDataLocal').and.returnValue(of(dummyObj));
         service.getDataConditional('').subscribe(data => {
            expect(data.length).toEqual(0)
         })
      })

      it('should success obj in array UbigeoTableModel valid', () => {
         spyOn(service, 'getDataLocal').and.returnValue(of(dummyObj));
         service.getDataConditional().subscribe(data => {
            expect(data[0] instanceof UbigeoTableModel).toBe(true)
         })
      })

   })

});
