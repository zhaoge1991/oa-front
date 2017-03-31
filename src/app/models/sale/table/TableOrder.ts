import {User} from "../../user/user";
import {Customer} from "../../customer/customer";
import {TableOrderCost} from "./TableOrderCost";
import {Payment} from "../../common/payment";
import {Provision} from "../../common/provision";
import {Transport} from "../../common/transport";

export class TableOrder{
  id: number;
  status: number;
  transport_id: number;
  payment_id: number;
  product_price: string;
  total_price: any;
  other_price: number;
  provision_id: number;
  remark: string;
  created_at: string;
  updated_at: string;
  shipping_costs: any;
  payment_costs: any;
  payment: Payment;
  provision: Provision;
  transport: Transport;

  constructor(order){
    if(order){
      this.id = order.id;
      this.status = order.status;
      this.transport_id = order.transport_id;
      this.payment_id = order.payment_id;
      this.product_price = order.product_price;
      this.total_price = order.total_price;
      this.other_price = order.other_price;
      this.provision_id = order.provision_id;
      this.remark = order.remark;
      this.created_at = order.created_at;
      this.updated_at = order.updated_at;
      this.shipping_costs = order.shipping_costs;
      this.payment_costs = order.payment_costs;
      this.payment = new Payment(order.payment);
      this.provision = new Provision(order.provision);
      this.transport = new Transport(order.transport);
    } else {
      this.id = null;
      this.status = null;
      this.transport_id = null;
      this.payment_id = null;
      this.product_price = '';
      this.total_price = '';
      this.other_price = 0;
      this.provision_id = null;
      this.remark = '';
      this.created_at = '';
      this.updated_at = '';
      this.shipping_costs = '';
      this.payment_costs = '';
      this.payment = new Payment(null);
      this.provision = new Provision(null);
      this.transport = new Transport(null);
    }
  }
}
