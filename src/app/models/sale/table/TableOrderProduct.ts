export class TableOrderProduct{
  table_order_id: number;
  product_id: number;
  en_name: string;
  model: string;
  quantity: number;
  price: any;
  total: string;
  reference_price: string;
  discount_price: string;
  quote_price: string;
  floor_price: string;
  remark: string;
  quantifier_id: number;
  order_table_product_id: number;
  zh_name: string;
  created_at: string;
  updated_at: string;

  constructor(product){
    this.table_order_id = product.table_order_id
    this.product_id = product.product_id
    this.en_name = product.en_name
    this.model = product.model
    this.quantity = product.quantity
    this.price = product.price
    this.total = product.total
    this.reference_price = product.reference_price
    this.discount_price = product.discount_price
    this.quote_price = product.quote_price
    this.floor_price = product.floor_price
    this.remark = product.remark
    this.quantifier_id = product.quantifier_id
    this.order_table_product_id = product.order_table_product_id
    this.zh_name = product.zh_name
    this.created_at = product.created_at
    this.updated_at = product.updated_at
  }
}
