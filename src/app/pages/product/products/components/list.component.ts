import {Component,ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';

import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {AlertService} from "../../../../services/core/alert.component.service";
import {Paginate} from "../../../../models/common/paginate";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {Product} from "../../../../models/product/product/product";
import {ProductListService} from "../../../../services/product/productList/product_list.service";
import {ProductCatalogService} from "../../../../services/product/productCatalog/product_catalog.service";

@Component({
  selector: 'sale-order-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent {
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData:Product[];
  private columnDefs:any[];
  private selectedeRow:boolean;
  public selectedrowData:Product;
  private productnodes: any[] = [];
  //翻页配置
  private paginate:Paginate;
  private selectedIndex:number;

  pageClick($event) {
    this.init(this.searchtext,$event.text,this.catalog)
    this.selectedeRow = false;
    this.selectedrowData = null;
  }

  private actionConfig:CommonActionBarConfig;

  constructor(private router:Router,
              private listservice:ProductListService,
              private catalogservice: ProductCatalogService,
              private appconfig:AppconfigService,
              private alertservice:AlertService) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.getTrreNodes();
    this.init('',1,null);
    this.createColumnDefs();
    this.showGrid = true;
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.idName = 'product_id';
    this.actionConfig.noback = true;
    this.actionConfig.isproduct = true;
  }

  //列配置项
  private createColumnDefs() {
    this.columnDefs = [
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
        width: 80,
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
          let config = this.appconfig.get('localisation.language.default');
          if(!params.value) return '';
          for(let i=0;i<params.value.catalog_description.length;i++){
            if(params.value.catalog_description[i].language_id = config){
              return params.value.catalog_description[i].name;
            }
          }
        },
        width: 120
      },
      {
        headerName: '中文描述',
        field: 'product_description',
        width: 240,
        cellRenderer: (params)=>{
          let cn = this.appconfig.get('localisation.language.chinese');
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
          let en = this.appconfig.get('localisation.language.english');
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
    ];
  }

  //选中行列表行
  private onRowSelected($event) {
    if ($event.node.selected) {
      this.selectedrowData = $event.node.data as Product;
      this.selectedIndex = $event.node.rowIndex;
      this.selectedeRow = true;
    }
  }

  //获取树列表
  getTrreNodes(){
    this.catalogservice.get().subscribe(data=>{
      this.catalogservice.getdataTrre(data,this.productnodes);
    })
  }
  customTemplateStringOptions = {
    isExpandedField: 'expanded',
    idField: 'tree_catalog_id',
    actionMapping,
    allowDrag: false
  }

  //加载列表数据
  init(key:string,page:number,catalog: number){
    this.selectedrowData = null;
    this.listservice.getlist(key,page,catalog).subscribe(data=>{
      this.paginate = data;
      this.rowData = this.paginate.data;
    })
  }

  //选择分类
  private catalog: number;
  onchanged($event){
    this.searchtext = null;
    this.catalog = $event.node.data.id;
    this.init(this.searchtext,1,this.catalog);
    this.selectedrowData = $event.node.data;
  }

  //搜索
  private searchtext:string;
  search($event){
    this.catalog = null;
    this.searchtext = $event;
    this.init(this.searchtext,1,this.catalog)
  }

  //双击列表单元格操作
  onCellDoubleClicked($event) {
    this.router.navigate(['pages/product/products/product/detail', $event.data.product_id])
  }

  //删除按钮点击后重新加载数据
  objectDelete(){
    this.getTrreNodes();
    this.init(this.searchtext,this.paginate.current_page,this.catalog);
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
