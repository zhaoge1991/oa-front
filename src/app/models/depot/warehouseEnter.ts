import {WarehouseEnterProduct} from "./warehouseEnterProduct"
import {User} from "../user/user"
import {ProcurementOrder} from "../procurement/procurementOrder";
export class WarehouseEnter {
    warehouse_enter_id: number;
    warehouse_enter_no: string;
    enter_date: string;
    user_id: number;
    procurement_order_id: number;
    price: number;
    remark: string;
    
    
    
    
    procurement_order_price:number;
    contracts:string[];
    procurement_user_name:string;
    can_edit:number;
    user:User;
    procurement_order_no:string;
    procurement:ProcurementOrder;
    
    created_at: string;
    updated_at: string;
    products: WarehouseEnterProduct[];
    constructor(enter) {
        if (enter) {
            this.warehouse_enter_id = enter.warehouse_enter_id;
            this.warehouse_enter_no = enter.warehouse_enter_no;
            this.enter_date = enter.enter_date;
            this.user_id = enter.user_id;
            this.procurement_order_id = enter.procurement_order_id;
            this.price = enter.price;
            this.remark = enter.remark;
            this.created_at = enter.created_at;
            this.updated_at = enter.updated_at;
            this.products=[]
            for (let product of enter.products) {
                this.products.push(new WarehouseEnterProduct(product))
            }
            if(enter.procurement_order_price){
                this.procurement_order_price = enter.procurement_order_price;
            }else{
                this.procurement_order_price=0;
            }
            
            if(enter.contracts){
                this.contracts = enter.contracts;
            }else{
                this.contracts=[];
            }
            
            if(enter.procurement_user_name){
                this.procurement_user_name = enter.procurement_user_name;
            }else{
                this.procurement_user_name='';
            }
            if(enter.can_edit){
                this.can_edit = enter.can_edit;
            }else{
                this.can_edit=0;
            }
            if(enter.procurement_order_no){
                this.procurement_order_no = enter.procurement_order_no;
            }else{
                this.procurement_order_no = ''
            }
            
            if(enter.user){
                this.user = new User(enter.user);
            }else{
                this.user=null;
            }
            
            if(enter.procurement){
                this.procurement = new ProcurementOrder(enter.procurement);
            }else{
                this.procurement=null;
            }
            
            
        } else {
            this.warehouse_enter_id = 0;
            this.warehouse_enter_no = '';
            this.enter_date = '';
            this.user_id = 0;
            this.procurement_order_id = 0;
            this.price = 0;
            this.remark = '';
            this.created_at = '';
            this.updated_at = '';
            this.products = [];
        }

    }
    addProduct(product: WarehouseEnterProduct) {
        this.products.push(product);

    }
    deleteProduct(index) {
        this.products.splice(index, 1)
    }

}
