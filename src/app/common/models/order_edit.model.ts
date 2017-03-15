export interface OrderEditModel{
  order_id?: number,
  order_no?: string,
  customer_id?: number,
  customer?: any,
  online_order?: string,
  currency_id?: number,
  provision_id?: number,
  pi?: string,
  order_type_id?: number,
  date_added?: string,
  country_id?: number,
  payment_id?: number,
  payment_costs?: string,
  product_price?: string,
  order_source_id?: number,
  expected_delivery?: string,
  project_id?: number,
  transport_id?: number,
  shipping_costs?: string,
  total_price?: string,
  order_status_id?: number,
  complaint?: string,
  remark?: string,
  actual_payment?: string,
  actual_bank_fee?: string,
  money_receipt?: string,
  sample_fee_info?: string,
  sample_shipping_info?: string,
  annex?: any[],
  product?: {
    product_id?: number,
    order_product_id?: number,
    model?: string,
    zh_name?: string,
    en_name?: string,
    quantifier_id?: number,
    quantity?: number,
    price?: string,
    quote_price?: string,
    discount_price?: string,
    remark?: string
  }[],
  cost?: {name?:string,price?:string}[]

}
