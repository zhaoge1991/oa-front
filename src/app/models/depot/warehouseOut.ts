import {WarehouseOutProduct} from "./warehouseOutProduct"
export class WarehouseOut {
    warehouse_out_id: number;
    warehouse_out_no: string;
    out_date: string;
    user_id: number;
    receive_user_id: number;
    order_id: number;
    remark: string;
    created_at: string;
    updated_at: string;
    country_name:string;
    order_no:string;
    contract_no:string;
    
    products: WarehouseOutProduct[];

    constructor(out) {
        if (out) {
            this.warehouse_out_id = out.warehouse_out_id;
            this.warehouse_out_no = out.warehouse_out_no;
            this.out_date = out.out_date;
            this.user_id = out.user_id;
            this.receive_user_id = out.receive_user_id;
            this.order_id = out.order_id;
            this.remark = out.remark;
            this.created_at = out.created_at;
            this.updated_at = out.updated_at;
            this.products=[]
            for (let product of out.products) {
                this.products.push(new WarehouseOutProduct(product))
            }
            
            
            if(out.country_name){
                this.country_name = out.country_name;
            }else{
                this.country_name='';
            }
            if(out.order_no){
                this.order_no = out.order_no;
            }else{
                this.order_no='';
            }
            if(out.contract_no){
                this.contract_no = out.contract_no;
            }else{
                this.contract_no='';
            }
            
        } else {
            this.warehouse_out_id = 0;
            this.warehouse_out_no = '';
            this.out_date = '';
            this.user_id = 0;
            this.user_id = 0;
            this.receive_user_id = 0;
            this.remark = '';
            this.created_at = '';
            this.updated_at = '';
            this.products=[];
        }

    }
    addProduct(product: WarehouseOutProduct) {
        this.products.push(product);

    }
    deleteProduct(index) {
        this.products.splice(index, 1)
    }
    
}
