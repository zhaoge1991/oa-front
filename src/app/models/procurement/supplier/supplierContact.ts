export class SupplierContact {
    contacts_id: number;
    name:string;
    position:string;
    appellation:string;
    sex:string;
    department:string;
    phone:string;
    mobile:string;
    fax:string;
    QQ:string;
    photo:string;
    created_at:string;
    updated_at:string;
    constructor(supplierContact){
        if(supplierContact){
            this.contacts_id = supplierContact.contacts_id;
            this.name = supplierContact.name;
            this.position = supplierContact.position;
            this.appellation = supplierContact.appellation;
            this.sex = supplierContact.sex;
            this.department = supplierContact.department;
            this.phone = supplierContact.phone;
            this.mobile = supplierContact.mobile;
            this.fax = supplierContact.fax;
            this.QQ = supplierContact.QQ;
            this.photo = supplierContact.photo;
            this.created_at = supplierContact.created_at;
            this.updated_at = supplierContact.updated_at;
        }else{
             this.contacts_id = 0;
            this.name = '';
            this.position = '';
            this.appellation = '';
            this.sex = '';
            this.department = '';
            this.phone = '';
            this.mobile = '';
            this.fax = '';
            this.QQ = '';
            this.photo = '';
            this.created_at = '';
            this.updated_at = '';
        }
    }
}