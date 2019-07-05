export class UbigeoModel {
   public department: any
   public province: any
   public district: any

   initData() {
      this.department = {
         code: '-',
         name: '-'
      }
      this.province = {
         code: '-',
         name: '-'
      }
      this.district = {
         code: '-',
         name: '-'
      }
   }
}
