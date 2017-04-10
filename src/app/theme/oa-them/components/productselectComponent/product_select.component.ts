import {Component,Input,Output,EventEmitter,ViewChild,ViewEncapsulation,OnInit} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import {ProductCatalogService} from "../../../../services/product/productCatalog/product_catalog.service";
import {ProductListService} from "../../../../services/product/productList/product_list.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";


@Component({
  selector: 'product-select',
  templateUrl: './product_select.component.html',
  styleUrls: ['./product_select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ProductCatalogService,ProductListService]
})

export class ProductSelectComponent implements OnInit{
  constructor(
    private catalogservice: ProductCatalogService,
    private productsservice: ProductListService,
    private appconfigservice: AppconfigService
  ){}

  private productnodes: any[] = [];
  private productdata: any[];
  private pageconfig:{
    current_page : number,
    last_page : number,
    total: number,
    from: number,
    to: number
  }
  @Output() productChange = new EventEmitter();
  ngOnInit(){
    this.getTrreNodes();
    this.init('',1,null);
  }

  //列表定义
  columnDefs = [
  {
    headerName: "序号", width: 50,suppressSorting: true,
    suppressMenu: true, pinned: true,
    cellRenderer: function (params) {
      return params.rowIndex+1
    }
  },
  {
    headerName: '产品ID',
    field: 'product_id',
    width: 60,
    pinned: true
  },
  {
    headerName: '商品型号',
    field: 'model',
    width: 120,
    pinned: true
  },
  {
    headerName: '商品分类',
    field: 'catalog',
    cellRenderer: (params)=>{
      let config = this.appconfigservice.get('localisation.language.default');
      if(!params.value) return '';
      for(let i=0;i<params.value.catalog_description.length;i++){
        if(params.value.catalog_description[i].language_id = config){
          return params.value.catalog_description[i].name;
        }
      }
    },
    width: 80
  },
  {
    headerName: '中文描述',
    field: 'product_description',
    width: 240,
    cellRenderer: (params)=>{
      let cn = this.appconfigservice.get('localisation.language.chinese');
      for(let i=0;i<params.value.length;i++){
        if(params.value[i].language_id == cn){
          return params.value[i].name;
        }
      }
    }
  },
  {
    headerName: '英文描述',
    field: 'product_description',
    width: 240,
    cellRenderer: (params)=>{
      let en = this.appconfigservice.get('localisation.language.english');
      for(let i=0;i<params.value.length;i++){
        if(params.value[i].language_id == en){
          return params.value[i].name;
        }
      }
    }
  },
  {
    headerName: '初次报价',
    field: 'price',
    width: 90,
  }
]


  //弹出列表框
  @ViewChild('dialog') Modal: ModalDirective;
  show(){
    this.Modal.show();
  }

  //获取树列表
  getTrreNodes(){
    this.catalogservice.get().subscribe(data=>{
      this.catalogservice.getdataTrre(data,this.productnodes)
      console.log(this.productnodes);
    })
  }
  customTemplateStringOptions = {
    isExpandedField: 'expanded',
    idField: 'uuid',
    actionMapping,
    allowDrag: false
  }

  //加载列表数据
  init(key:string,page:number,catalog: number){
    this.productsservice.getlist(key,page,catalog).subscribe(data=>{
      this.pageconfig = {
        current_page : data.current_page,
        last_page : data.last_page,
        total: data.total,
        from: data.from,
        to: data.to
      }
      this.productdata = data.data;
    })
  }

  //选择分类
  private catalog: number;
  onchanged($event){
    this.searchtext = null;
    this.catalog = $event.node.data.id;
    this.init(this.searchtext,1,this.catalog);
  }

  //翻页
  pageClick($event){
    this.init(this.searchtext,$event.text,this.catalog)
  }

  //搜索
  private searchtext:string;
  search($event){
    console.log($event);
    this.catalog = null;
    this.searchtext = $event;
    this.init(this.searchtext,1,this.catalog)
  }

  //选中列表行
  private selecteddata: any;
  onRowSelected($event){
    if($event.node.selected){
      this.selecteddata = $event.node.data;
    }
  }

  //确认添加
  addproduct(){
    let productdata = {
      product_id: this.selecteddata.product_id,
      order_product_id: '',
      model: this.selecteddata.model,
      zh_name: this.getproname('localisation.language.chinese'),
      en_name: this.getproname('localisation.language.english'),
      quantifier_id: 1,
      quantity: 1,
      price: this.selecteddata.price,
      quote_price: 0,
      discount_price: 0,
      remark: null
    };
    this.productChange.emit(productdata);
    this.Modal.hide();
  }

  //获取产品名字方法
  getproname(config:string){
    let con = this.appconfigservice.get(config);
    for(let i=0;i<this.selecteddata.product_description.length;i++){
      if(this.selecteddata.product_description[i].language_id == con){
        return this.selecteddata.product_description[i].name;
      }
    }
  }
}




//文件树配置
const actionMapping:IActionMapping = {
  mouse: {
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    }
  }
};
