import {Component,Input,Output,EventEmitter,ViewChild,ViewEncapsulation,OnInit} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {GridOptions} from 'ag-grid/main';
import {ProductCatalogService} from "../../../../services/product/productCatalog/product_catalog.service";
import {Catalog} from "../../../../models/product/catalog/catalog";

@Component({
  selector: 'product-catalog-select',
  templateUrl: './product_catalog_select.component.html',
  styleUrls: ['./product_catalog_select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ProductCatalogService]
})

export class ProductCatalogSelectComponent implements OnInit{
  constructor(
    private productcatalogservice: ProductCatalogService,
    private appconfigservice: AppconfigService
  ){}

  private catalognodes: any[] = []; //产品分类树列表
  private catalogdata: any[];      //产品分类数据

  @Input()  catalogObj: Catalog;    //传入单个用户对象
  @Input()  catalogArr: Catalog[];  //传入用户对象数组

  @Output() catalogObjChange = new EventEmitter();
  @Output() catalogArrChange = new EventEmitter();

  @Output() productChange = new EventEmitter();

  ngOnInit(){
    this.getTrreNodes();
  }

  //弹出列表框
  @ViewChild('dialog') Modal: ModalDirective;
  show(){
    this.Modal.show();
  }

  hide(){
    this.Modal.hide();
  }

  //获取树列表
  getTrreNodes(){
    this.productcatalogservice.get().subscribe(data=>{
      this.catalogdata = data;
      console.log(data);
      this.productcatalogservice.getdataTrre(data,this.catalognodes)
    })
  }
  customTemplateStringOptions = {
    isExpandedField: 'expanded',
    idField: 'uuid',
    actionMapping,
    allowDrag: false
  }

  //选择分类
  onchanged($event){
    let catalogId = +$event.node.data.id;
    if(this.catalogObj){
      this.getselectedCatalog(catalogId,this.catalogdata)
      this.catalogObj = this.selectedCatalog;
    } else if(this.catalogArr){
      this.getselectedCatalog(catalogId,this.catalogdata);
      this.catalogArr.push(this.selectedCatalog);
      this.catalogArr = this.filterArr(this.catalogArr);
    }
  }

  //获取选中分类
  selectedCatalog: Catalog;
  getselectedCatalog(id:number,data){
    for(let i in data){
      if(selected){
        break;
      }
      if(id == data[i].catalog_id){
        var selected = data[i];
        this.selectedCatalog = selected;
      } else {
        if(data[i].items){
          this.getselectedCatalog(id,data[i].items);
        }
      }
    }
  }


  //选中去重
  filterArr(Arr: any[]){
    let arr = [];
    let obj = {};
    for (let i=0;i<Arr.length;i++){
      if(!obj[Arr[i].catalog_id]){
        arr.push(Arr[i]);
        obj[Arr[i].catalog_id] = 1;
      }
    }
    return arr;
  }

  //删除选中
  deleteCatalogArr(index){
    this.catalogArr.splice(index, 1);
  }
  deleteCatalogObj(){
    this.catalogObj = null;
  }

  //确认添加
  add(){
    if(this.catalogObj){
      this.catalogObjChange.emit(this.catalogObj);
    } else if(this.catalogArr){
      this.catalogArrChange.emit(this.catalogArr);
    }
    this.Modal.hide();
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
