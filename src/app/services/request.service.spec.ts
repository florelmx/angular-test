import { TestBed, getTestBed } from '@angular/core/testing';

import { RequestService } from './request.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RequestService', () => {

   let injector: TestBed
   let httpMock: HttpTestingController
   let service: RequestService
   const dummyObj = [{ name: 'Name 1' }, { name: 'Name 2' }]
   const url = 'https://jsonplaceholder.typicode.com/users'

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [HttpClientTestingModule],
         providers: [RequestService]
      })
      injector = getTestBed()
      httpMock = injector.get(HttpTestingController)
      service = TestBed.get(RequestService);
   });
   
   it('should return an Observable<any> for method GET', () => {
      service.getLocally(url).subscribe(obj => {
         expect(obj).toEqual(dummyObj)
      })
      const req = httpMock.expectOne(url)
      expect(req.request.method).toEqual('GET');
      req.flush(dummyObj)
   });

   it('should return an Observable<any> for method GET when sending empty type parameter', () => {
      service.getLocally(url, '').subscribe(obj => {
         expect(obj).toEqual(dummyObj)
      })
      const req = httpMock.expectOne(url)
      expect(req.request.method).toEqual('GET');
      req.flush(dummyObj)
   });
   
});
