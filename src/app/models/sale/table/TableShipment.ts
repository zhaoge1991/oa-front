import {Customer} from "../../customer/customer";
import {TableOrderCost} from "./TableOrderCost";
import {TableOrderProduct} from "./TableOrderProduct";
import {TableOrder} from "./TableOrder";
import {User} from "../../user/user";

export class TableShipment{
  id: number;
  purchase_order: string;
  commercial_invoice: string;
  shipment_date: string;
  order_id: number;
  currency_id: number;
  customer_id: number;
  table_order_id: number;
  user_id: number;
  remark: string;
  created_at: string;
  updated_at: string;
  customer: Customer;
  user: User;
  table_order_cost: TableOrderCost[];
  table_order_product: TableOrderProduct[];
  table_order: TableOrder;

  constructor(table){
    if(table){
      this.id = table.id;
      this.purchase_order = table.purchase_order;
      this.commercial_invoice = table.commercial_invoice;
      this.shipment_date = table.shipment_date;
      this.order_id = table.order_id;
      this.currency_id = table.currency_id;
      this.customer_id = table.customer_id;
      this.table_order_id = table.table_order_id;
      this.user_id = table.user_id;
      this.remark = table.remark;
      this.created_at = table.created_at;
      this.updated_at = table.updated_at;
      this.customer = new Customer(table.customer);
      this.user = new User(table.user);
      this.table_order_cost = [];
      this.table_order_product = [];
      this.table_order =  new TableOrder(table.table_order);
      for (let cost of table.table_order_cost){
        this.table_order_cost.push(new TableOrderCost(cost));
      };
      for (let product of table.table_order_product){
        this.table_order_product.push(new TableOrderProduct(product));
      }
    } else {
      this.id = null;
      this.purchase_order = '';
      this.commercial_invoice = '';
      this.shipment_date = '';
      this.order_id = null;
      this.currency_id = null;
      this.customer_id = null;
      this.table_order_id = null;
      this.user_id = null;
      this.remark = '';
      this.created_at = '';
      this.updated_at = '';
      this.customer = new Customer(null);
      this.user = new User(null);
      this.table_order_cost = [];
      this.table_order_product = [];
      this.table_order = new TableOrder(null);
    }
  }

  addProduct(tableOrderProduct: TableOrderProduct) {
    this.table_order_product.push(tableOrderProduct);
    this.refreshPrice();
  }
  deleteProduct(index){
    this.table_order_product.splice(index, 1)
    this.refreshPrice();
  }
  addCost(tableOrderCost: TableOrderCost) {
    this.table_order_cost.push(tableOrderCost);
    this.refreshPrice();
  }
  deleteCost(index){
    this.table_order_cost.splice(index, 1);
    this.refreshPrice();
  }

  refreshPrice() {
    let other_price = 0;
    let product_price = 0;
    for (let product of this.table_order_product) {
      product_price = product_price*1+product.quantity * product.price;
    }
    for (let cost of this.table_order_cost) {
      other_price = other_price*1+ cost.price*1;
    }
    this.table_order.product_price = product_price.toString();
    this.table_order.other_price = other_price;
    this.table_order.total_price = product_price+other_price+this.table_order.shipping_costs*1+this.table_order.payment_costs*1;

  }
}
