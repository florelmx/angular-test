export class UbigeoTableModel {
   public code: string
   public name: string
   public code_father: string
   public name_father: string

   initData() {
      this.code = '-'
      this.name = '-'
      this.code_father = '-'
      this.name_father = '-'
   }
}
