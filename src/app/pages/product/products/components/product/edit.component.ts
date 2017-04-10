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
import {Filter} from "../../../../../models/product/filter/filter";

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
  public filter_groups;

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
        this.getFilters(this.data.catalog_id);
        //保存原始数据
        this.olddata = JSON.stringify(this.data);
      })
    } else {
      this.data = new Product(null,this.languages);
      this.refreshPrice();
      this.getFilters(this.catalog_id);
      this.olddata = JSON.stringify(this.data);
    }

  }

  //获取分类筛选组
  getFilters(id:number){
    this.catalogservice.getcatalog(id).subscribe(data=>{
      this.filter_groups = data.filter_groups;
    })
  }

  //初始化被选中的筛选
  isfilterChecked(id:number){
    let productFilters = this.data.filters;
    for(let i in productFilters){
      if(id == productFilters[i].filter_id){
        return true;
      }
    }
  }

  //筛选项更改
  filterChange(filter:Filter){
    let productFilters = this.data.filters;
    let length = productFilters.length.toString()-0;
    let x:number = 0;
    for(let i=0;i<length;i++){
      if(filter.filter_group_id == productFilters[i].filter_group_id){
        this.data.filters.splice(i,1,filter);
      } else {
        x++;
        //如果在所有筛选项中都没有filter则push上去
        if(x==length){
          this.data.filters.push(filter);
        }
      }
    }
    if(length == 0){
      this.data.filters.push(filter);
    }
    console.log(this.data.filters);
  }

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

  //保存
  save(){
    if(this.catalog_id){
      this.data.catalog_id = this.catalog_id;
    }
    if(this.isEdit){
      this.productservice.put(this.id,this.data).subscribe();
    } else {
      this.productservice.post(this.data).subscribe();
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


