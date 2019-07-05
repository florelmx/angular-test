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

   // servicio para optener la lista de ubigeo desde una data local txt y regresa un array de obj tipo UbigeoModel
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
                           code = (code < 10 ? '0' + code : code)//para matener el formato de dos digitos en el codigo
                           var name = obj.replace(code, '').trim()
                           switch (aux) { // verifica las veces recorrida para identificar atributo que se definira
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

   // servicio para optener una estructura padre e hijo
   getDataConditional(key = 'department'): Observable<UbigeoTableModel[]> { //key define cual es el atributo hijo el cual encabeza la estructura
      return new Observable(observable => {
         this.getDataLocal().subscribe( // metodo que regresa un array de obj tipo ubigeoModel
            res => {
               if (key) {
                  let data = <any>res
                  
                  let ubgeos = []
                  data.forEach(element => {
                     if (element[key].code != '-') { // verificamos que el codigo no sea - la cual seria que este valor no ha sido asignado
                        let keys = Object.keys(element) // optener todos los keys principales del obj
                        var d = ubgeos.find(d => d.code == element[key].code) // optener el obj que coincida con el code hijo
                        if (!d) { 
                           let i = keys.indexOf(key) // optener  index al cual pertenece el key en el obj Keys
                           let ubigeo = new UbigeoTableModel() 
                           ubigeo.initData() // inicializa el obj
                           ubigeo.code = element[key].code; // asignar los valores de los atributos hijos
                           ubigeo.name = element[key].name; // asignar los valores de los atributos hijos
                           if (i > 0) { // virifica si es index optenido del key es el primero, en caso de no ser identifica el padre que seria keys[i - 1]
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
