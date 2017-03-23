import {Customer} from "./../Customer";
import {User} from "./../User";
import {OrderProduct} from "./OrderProduct";
import {OrderCost} from "./OrderCost";
import {OrderAnnex} from "./OrderAnnex";

export class Order{
  order_id: number;
  customer_id: number;
  name: string;
  order_no: string;
  purchase_order: string;
  online_order: string;
  product_price: any;
  total_price: any;
  actual_payment: string;
  actual_bank_fee: string;
  transport_id: number;
  payment_id: number;
  provision_id: number;
  contract_id: number;
  date_added: string;
  user_id: number;
  order_status_id: number;
  currency_id: number;
  remark: string;
  created_at: string;
  updated_at: string;
  order_source_id: number;
  complaint: string;
  purchased_added: string;
  purchased_price: string;
  money_receipt: string;
  ship_date: string;
  estimated_arrival_date: string;
  actual_transport_id: number;
  invoice_number: any;
  delivery_number: any;
  actual_currency_id: number;
  actual_shipping_costs: string;
  shipping_description: string;
  order_out_delivery: string;
  shipping_costs: any;
  payment_costs: any;
  other_customer: string;
  other_country_id: number;
  project_id: number;
  other_contract: string;
  order_type_id: number;
  payable_cost: string;
  balance_payment: string;
  test_result: string;
  test_description: string;
  test_date: string;
  sample_fee_info: string;
  sample_shipping_info: string;
  pi: string;
  customer: Customer;
  users: User[];
  status_name: string;
  products: OrderProduct[];
  ordercost: OrderCost[];
  annex: OrderAnnex[];
  other_price: number;

  constructor(saleorder){
    this.other_price = 0;
    if(saleorder){
      this.order_id = saleorder.order_id;
      this.customer_id = saleorder.customer_id;
      this.name = saleorder.name;
      this.order_no = saleorder.order_no;
      this.purchase_order = saleorder.purchase_order;
      this.online_order = saleorder.online_order;
      this.product_price = saleorder.product_price;
      this.total_price = saleorder.total_price;
      this.actual_payment = saleorder.actual_payment;
      this.actual_bank_fee = saleorder.actual_bank_fee;
      this.transport_id = saleorder.transport_id;
      this.payment_id = saleorder.payment_id;
      this.provision_id = saleorder.provision_id;
      this.contract_id = saleorder.contract_id;
      this.date_added = saleorder.date_added;
      this.user_id = saleorder.user_id;
      this.order_status_id = saleorder.order_status_id;
      this.currency_id = saleorder.currency_id;
      this.remark = saleorder.remark;
      this.created_at = saleorder.created_at;
      this.updated_at = saleorder.updated_at;
      this.order_source_id = saleorder.order_source_id;
      this.complaint = saleorder.complaint;
      this.purchased_added = saleorder.purchased_added;
      this.purchased_price = saleorder.purchased_price;
      this.money_receipt = saleorder.money_receipt;
      this.ship_date = saleorder.ship_date;
      this.estimated_arrival_date = saleorder.estimated_arrival_date;
      this.actual_transport_id = saleorder.actual_transport_id;
      this.invoice_number = saleorder.invoice_number;
      this.delivery_number = saleorder.delivery_number;
      this.actual_currency_id = saleorder.actual_currency_id;
      this.actual_shipping_costs = saleorder.actual_shipping_costs;
      this.shipping_description = saleorder.shipping_description;
      this.order_out_delivery = saleorder.order_out_delivery;
      this.shipping_costs = saleorder.shipping_costs;
      this.payment_costs = saleorder.payment_costs;
      this.other_customer = saleorder.other_customer;
      this.other_country_id = saleorder.other_country_id;
      this.project_id = saleorder.project_id;
      this.other_contract = saleorder.other_contract;
      this.order_type_id = saleorder.order_type_id;
      this.payable_cost = saleorder.payable_cost;
      this.balance_payment = saleorder.balance_payment;
      this.test_result = saleorder.test_result;
      this.test_description = saleorder.test_description;
      this.test_date = saleorder.test_date;
      this.sample_fee_info = saleorder.sample_fee_info;
      this.sample_shipping_info = saleorder.sample_shipping_info;
      this.pi = saleorder.pi;
      this.customer = new Customer(saleorder.customer);
      this.users = [];
      this.status_name = saleorder.status_name;
      this.products = [];
      this.ordercost = [];
      this.annex = [];
      for (let user of saleorder.users){
        this.users.push(new User(user));
      }
      for (let product of saleorder.products) {
        this.products.push(new OrderProduct(product))
      };
      for(let ordercost of saleorder.ordercost){
        this.ordercost.push(new OrderCost(ordercost));
        this.other_price = this.other_price * 1 + ordercost.price * 1;
      };
      for(let annex of saleorder.annex){
        this.annex.push(new OrderAnnex(annex))
      };
    } else {
      this.order_id = 0;
      this.customer_id = 0;
      this.name = '';
      this.order_no = '';
      this.purchase_order = '';
      this.online_order = '';
      this.product_price = '';
      this.total_price = '';
      this.actual_payment = '';
      this.actual_bank_fee = '';
      this.transport_id = 0;
      this.payment_id = 0;
      this.provision_id = 0;
      this.contract_id = 0;
      this.date_added = '';
      this.user_id = 0;
      this.order_status_id = 0;
      this.currency_id = 0;
      this.remark = '';
      this.created_at = '';
      this.updated_at = '';
      this.order_source_id = 0;
      this.complaint = '';
      this.purchased_added = '';
      this.purchased_price = '';
      this.money_receipt = '';
      this.ship_date = '';
      this.estimated_arrival_date = '';
      this.actual_transport_id = 0;
      this.invoice_number = 0;
      this.delivery_number = 0;
      this.actual_currency_id = 0;
      this.actual_shipping_costs = '';
      this.shipping_description = '';
      this.order_out_delivery = '';
      this.shipping_costs = '';
      this.payment_costs = '';
      this.other_customer = '';
      this.other_country_id = 0;
      this.project_id = 0;
      this.other_contract = '';
      this.order_type_id = 0;
      this.payable_cost = '';
      this.balance_payment = '';
      this.test_result = '';
      this.test_description = '';
      this.test_date = '';
      this.sample_fee_info = '';
      this.sample_shipping_info = '';
      this.pi = '';
      this.customer = new Customer(null);
      this.users = [];
      this.status_name = '';
      this.products = [];
      this.ordercost = [];
      this.annex = [];
    }
  }

  addProduct(saleOrderProduct: OrderProduct) {
    this.products.push(saleOrderProduct);
    this.refreshPrice();
  }
  deleteProduct(index){
    this.products.splice(index, 1)
    this.refreshPrice();
  }
  addCost(saleOrderCost: OrderCost) {
    this.ordercost.push(saleOrderCost);
    this.refreshPrice();
  }
  deleteCost(index){
    this.ordercost.splice(index, 1);
    this.refreshPrice();
  }

  refreshPrice() {
    let other_price = 0;
    let product_price = 0;
    for (let product of this.products) {
      product_price = product_price*1+product.quantity * product.price;
    }
    for (let cost of this.ordercost) {
      other_price = other_price*1+ cost.price*1;
    }
    this.product_price = product_price;
    this.other_price = other_price;
    this.total_price = product_price+other_price+this.shipping_costs*1+this.payment_costs*1;

  }
}
