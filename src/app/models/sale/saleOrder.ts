import {SaleCustomer} from "./saleCustomer";
import {SaleUser} from "./saleUser";
import {SaleOrderProduct} from "./saleOrderProduct";
import {SaleOrderCost} from "./saleOrderCost";
import {SaleAnnex} from "./saleAnnex";

export class SaleOrder{
  order_id: number;
  customer_id: number;
  name: string;
  order_no: string;
  purchase_order: string;
  online_order: string;
  product_price: string;
  total_price: string;
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
  shipping_costs: string;
  payment_costs: string;
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
  customer: SaleCustomer;
  user: SaleUser;
  status_name: string;
  products: SaleOrderProduct[];
  ordercost: SaleOrderCost[];
  annex: SaleAnnex[];

  addProduct(saleOrderProduct: SaleOrderProduct) {
    this.products.push(saleOrderProduct);
  }
  deleteProduct(index){
    this.products.splice(index, 1)
  }
  addCost(saleOrderCost: SaleOrderCost) {
    this.ordercost.push(saleOrderCost);
  }
  deleteCost(index){
    this.ordercost.splice(index, 1)
  }
}
