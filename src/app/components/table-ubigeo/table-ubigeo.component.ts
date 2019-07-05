import { Component, OnInit, Input } from '@angular/core';
import { CaseUbigeoService } from 'src/app/business/uses-case/case-ubigeo.service';
import { UbigeoTableModel } from 'src/app/business/model/ubigeo-table.model';


@Component({
   selector: 'app-table-ubigeo',
   templateUrl: './table-ubigeo.component.html',
   styleUrls: ['./table-ubigeo.component.css']
})
export class TableUbigeoComponent implements OnInit {

   dataStore: UbigeoTableModel[]

   @Input() title: string
   @Input() conditionTable: string

   public error = false;

   constructor(
      public _caseUbigeo: CaseUbigeoService
   ) { }

   ngOnInit(): void {
      this.loadData()
   }

   loadData() {
      if (this.conditionTable) {
         this._caseUbigeo.getDataConditional(this.conditionTable).subscribe(
            res => {
               this.dataStore = res
               this.error = false
            },
            error => {
               this.dataStore = []
               this.error = true
            })
      }
   }

}
