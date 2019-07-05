import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { UbigeoTableModel } from 'src/app/business/model/ubigeo-table.model';
import { UbigeoModel } from '../model/ubigeo.model';
// import { UbigeoModel } from '../model/ubigeo.model';

@Injectable()
export class CaseUbigeoService {

   constructor(
      public requestService: RequestService
   ) { }

   // servicio para optener la lista de ubigeo desde una data local txt
   getDataLocal(): Observable<UbigeoModel[]> {
      return new Observable(observable => {
         this.requestService.getLocally('assets/mocks/ubigeo.txt', 'text').subscribe(
            res => {
               if (res) {
                  let data = res
                  // Eliminnar comillas 
                  data = data.replace(/"/g, '')

                  // Divivir por cada salto de linea en array 
                  data = data.split('\n')

                  // Recorrer la data para darle estrucutura UbigeoModel

                  let ubgeos = data.map(item => {
                     item = item.split(' / ')
                     let aux = 0
                     const ubigeo = new UbigeoModel()
                     ubigeo.initData()
                     item.map(obj => {

                        let code = <any>parseInt(obj)

                        if (!isNaN(code)) {
                           code = (code < 10 ? '0' + code : code)
                           var name = obj.replace(code, '').trim()
                           switch (aux) {
                              case 0:
                                 ubigeo.department.code = code;
                                 ubigeo.department.name = name;
                                 break;
                              case 1:
                                 ubigeo.province.code = code;
                                 ubigeo.province.name = name;
                                 break;
                              case 2:
                                 ubigeo.district.code = code;
                                 ubigeo.district.name = name;
                                 break;
                           }
                        }
                        aux++;
                     })
                     return ubigeo
                  });
                  observable.next(ubgeos)
               } else {
                  observable.next([])
               }


            }, error => {
               observable.error(error)
            }
         )
      })
   }

   // servicio para optener la lista de ubigeo desde una data local txt
   getDataConditional(key = 'department'): Observable<UbigeoTableModel[]> {
      return new Observable(observable => {
         this.getDataLocal().subscribe(
            res => {
               if (key) {
                  let data = <any>res
                  // Recorrer la data para darle estrucutura UbigeoModel
                  let ubgeos = []
                  data.forEach(element => {
                     if (element[key].code != '-') {
                        let keys = Object.keys(element)
                        var d = ubgeos.find(d => d.code == element[key].code)
                        if (!d) {
                           let i = keys.indexOf(key)
                           let ubigeo = new UbigeoTableModel()
                           ubigeo.initData()
                           ubigeo.code = element[key].code;
                           ubigeo.name = element[key].name;
                           if (i > 0) {
                              ubigeo.code_father = element[keys[i - 1]].code
                              ubigeo.name_father = element[keys[i - 1]].name
                           }
                           ubgeos.push(ubigeo)
                        }
                     }
                  });
                  observable.next(ubgeos)
               } else {
                  observable.next([])
               }
            }, error => {
               observable.error(error)
            }
         )
      })
   }
}
