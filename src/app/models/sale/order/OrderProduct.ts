export class OrderProduct{
  order_product_id: number;
  order_id: number;
  product_id: number;
  en_name: string;
  zh_name: string;
  model: string;
  quantity: number;
  price: any;
  total: string;
  reference_price: string;
  remark: string;
  quantifier_id: number;
  expected_delivery: string;
  change_delivery: string;
  entry_date: string;
  is_stock: number;
  updated_at: string;
  created_at: string;
  discount_price: string;
  quote_price: string;
  floor_price: string;

  constructor(product: OrderProduct){
    this.order_product_id = product.order_product_id;
    this.order_id = product.order_id;
    this.product_id = product.product_id;
    this.en_name = product.en_name;
    this.zh_name = product.zh_name;
    this.model = product.model;
    this.quantity = product.quantity;
    this.price = product.price;
    this.total = product.total;
    this.reference_price = product.reference_price;
    this.remark = product.remark;
    this.quantifier_id = product.quantifier_id;
    this.expected_delivery = product.expected_delivery;
    this.change_delivery = product.change_delivery;
    this.entry_date = product.entry_date;
    this.is_stock = product.is_stock;
    this.updated_at = product.updated_at;
    this.created_at = product.created_at;
    this.discount_price = product.discount_price;
    this.quote_price = product.quote_price;
    this.floor_price = product.floor_price;
  }
}
