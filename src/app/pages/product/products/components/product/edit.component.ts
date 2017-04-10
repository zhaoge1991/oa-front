import {Component,OnInit,ViewChild,DoCheck} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {AppconfigService} from "../../../../../services/core/appConfigService/appConfigService";
import {AlertService} from "../../../../../services/core/alert.component.service";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {Catalog} from "../../../../../models/product/catalog/catalog";
import {LanguageService} from "../../../../../services/core/languageService/language.service";
import {Language} from "../../../../../models/localisation/language";
import {ProductListService} from "../../../../../services/product/productList/product_list.service";
import {ProductCatalogService} from "../../../../../services/product/productCatalog/product_catalog.service";
import {Product} from "../../../../../models/product/product/product";

@Component({
  selector: 'product-catalog-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent implements OnInit,DoCheck{

  private id:number;
  public catalog_id: number;
  private olddata: any;
  private data: Product;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;
  public languages: Language[];

  constructor(
    private route:ActivatedRoute,
    private alertservice: AlertService,
    private productservice: ProductListService,
    private catalogservice: ProductCatalogService,
    private languageservice: LanguageService
  ){
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.saveUrl = 'save';
    this.commonActionBarConfig.idName = 'product_id';
    this.languages = this.languageservice.get();
  }


  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.catalog_id = +params['catalog_id'];
      this.isEdit = !!this.id;
    });
    this.setData();
  }

  ngDoCheck(){
    if(this.data){
      this.getUsersName();
    }
  }

  //获取数据
  setData(){
    if(this.id){
      this.productservice.get(this.id).subscribe(data=>{
        this.data = new Product(data,this.languages);
        this.refreshPrice();
        console.log(this.data);
      })
    } else {
      this.data = new Product(null,this.languages);
      this.refreshPrice();
    }
    //保存原始数据
    this.olddata = JSON.stringify(this.data);

  }

  get descriptionsstring(){return JSON.stringify(this.data)};

  catalogids: string = ''; //所有分类id字符串
  getUsersName(){
    this.catalogids = '';
    let catalogs = this.data.catalogs;
    if(catalogs){
      if(catalogs.length) {
        for (let i = 0; i < catalogs.length; i++) {
          if(i == catalogs.length-1){
            this.catalogids += catalogs[i].catalog_id;
          } else {this.catalogids += catalogs[i].catalog_id + '、'}
        }
      }
    }
  }

  //系数修改后刷新价格
  quotation;
  floor_price;
  discount;
  refreshPrice(){
    let price = +this.data.price;
    let _quotation = +this.data.coefficient_quotation;
    let _floor_price = +this.data.coefficient_floor_price;
    let _discount = +this.data.coefficient_discount;
    this.quotation = price*_quotation;
    this.floor_price = price*_floor_price;
    this.discount = price*_discount;
  }

  //筛选组类别更改
  filterGroupsChange($event){
    //this.data.filter_groups = JSON.parse(JSON.stringify($event))
  }

  //保存
  save(){
    if(this.catalog_id){
      this.data.catalog_id = this.catalog_id;
    }
    if(this.isEdit){
      this.catalogservice.put(this.id,this.data).subscribe();
    } else {
      this.catalogservice.post(this.data).subscribe();
    }
    this.olddata = JSON.stringify(this.data);
  }

  //编辑守卫
  canDeactivate(): boolean|Observable<boolean>{
    if(this.olddata == JSON.stringify(this.data)){
      return true;
    } else {
      return this.alertservice.putMessage({
        title: '提示弹窗',
        detail: '单据已修改，确认放弃修改并退出吗？',
        severity: 'warn'
      })
    }
  }

}


