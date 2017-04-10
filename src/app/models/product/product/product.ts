import {Catalog} from "../catalog/catalog";
import {Language} from "../../localisation/language";
import {ProductDescription} from "./productDescription";
import {Filter} from "../filter/filter";
export class Product {
    product_id: number;
    model: string;
    sku: string;
    upc: string;

    ean: string;
    jan: string;
    isbn: string;
    mpn: string;
    location: string;
    quantity: number;
    stock_status_id: number;
    image: string;
    manufacturer_id: number;
    shipping: number;
    price: number;
    points: number;
    tax_class_id: number;
    date_available: string;
    weight: number;
    weight_class_id: number;
    length: number;
    width: number;
    height: number;
    length_class_id: number;
    subtract: number;
    minimum: number;
    sort_order: number;
    status: number;
    viewed: number;
    date_added: string;
    date_modified: string;
    channel_id: number;
    catalog_id: number;
    packing_spec_id: number;
    product_catalog_id: number;
    product_no: string;
    warning_quantity: number;
    warning_date: string;
    coefficient_quotation: number;
    coefficient_floor_price: number;
    coefficient_discount: number;
    created_at: string;
    updated_at: string;
    catalogs: Catalog[];
    product_description: ProductDescription[];
    filters: Filter[];
    constructor(product,languages:Language[]) {
        if (product) {
            this.product_id = product.product_id;
            this.model = product.model;
            this.sku = product.sku;
            this.upc = product.upc;

            this.ean = product.ean;
            this.jan = product.jan;
            this.isbn = product.isbn;
            this.mpn = product.mpn;
            this.location = product.location;
            this.quantity = product.quantity;
            this.stock_status_id = product.stock_status_id;
            this.image = product.image;
            this.manufacturer_id = product.manufacturer_id;
            this.shipping = product.shipping;
            this.price = product.price;
            this.points = product.points;
            this.tax_class_id = product.tax_class_id;
            this.date_available = product.date_available;
            this.weight = product.weight;
            this.weight_class_id = product.weight_class_id;
            this.length = product.length;
            this.width = product.width;
            this.height = product.height;
            this.length_class_id = product.length_class_id;
            this.subtract = product.subtract;
            this.minimum = product.minimum;
            this.sort_order = product.sort_order;
            this.status = product.status;
            this.viewed = product.viewed;
            this.date_added = product.date_added;
            this.date_modified = product.date_modified;
            this.channel_id = product.channel_id;
            this.catalog_id = product.catalog_id;
            this.packing_spec_id = product.packing_spec_id;
            this.product_catalog_id = product.product_catalog_id;
            this.product_no = product.product_no;
            this.warning_quantity = product.warning_quantity;
            this.warning_date = product.warning_date;
            this.coefficient_quotation = product.coefficient_quotation;
            this.coefficient_floor_price = product.coefficient_floor_price;
            this.coefficient_discount = product.coefficient_discount;
            this.created_at = product.created_at;
            this.updated_at = product.updated_at;
            this.catalogs = [];
            this.product_description = [];
            this.filters = [];
            for (let catalog of product.catalogs){
              this.catalogs.push(new Catalog(catalog,languages));
            };
            for (let filter of product.filters){
              this.filters.push(new Filter(filter,languages));
            };
        } else {
            this.product_id = 0;
            this.model = '';
            this.sku = '';
            this.upc = '';

            this.ean = '';
            this.jan = '';
            this.isbn = '';
            this.mpn = '';
            this.location = '';
            this.quantity = 0;
            this.stock_status_id = 0;
            this.image = '';
            this.manufacturer_id = 0;
            this.shipping = 0;
            this.price = 0;
            this.points = 0;
            this.tax_class_id = 0;
            this.date_available = '';
            this.weight = 0;
            this.weight_class_id = 0;
            this.length = 0;
            this.width = 0;
            this.height = 0;
            this.length_class_id = 0;
            this.subtract = 0;
            this.minimum = 0;
            this.sort_order = 0;
            this.status = 0;
            this.viewed = 0;
            this.date_added = '';
            this.date_modified = '';
            this.channel_id = 0;
            this.catalog_id = 0;
            this.packing_spec_id = 0;
            this.product_catalog_id = 0;
            this.product_no = '';
            this.warning_quantity = 0;
            this.warning_date = '';
            this.coefficient_quotation = 0;
            this.coefficient_floor_price = 0;
            this.coefficient_discount = 0;
            this.created_at = '';
            this.updated_at = '';
            this.catalogs = [];
            this.product_description = [];
            this.filters = [];
        }
        //先循环语言生成所有语言描述数组
        for(let i=0;i<languages.length;i++){
          this.product_description.push(new ProductDescription(null));
          //给每一个语言的描述加上对应语言id
          this.product_description[this.product_description.length-1].language_id = languages[i].language_id;
        }
        //如果处于编辑状态则遍历数据对象的描述并与描述数组语言id对比，若一样则将数据的描述赋给相应语言描述
        if(product){
          let des = product.product_description;
          if(des){
            for(let i=0;i<des.length;i++){
              for(let j=0;j<this.product_description.length;j++){
                if(des[i].language_id == this.product_description[j].language_id){
                  this.product_description[j] = des[i];
                }
              }
            }
          }
        }
    }
}
