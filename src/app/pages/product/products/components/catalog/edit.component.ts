import {Component,OnInit,ViewChild,DoCheck} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {AppconfigService} from "../../../../../services/core/appConfigService/appConfigService";
import {AlertService} from "../../../../../services/core/alert.component.service";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {Catalog} from "../../../../../models/product/catalog/catalog";
import {ProductCatalogService} from "../../../../../services/product/productCatalog/product_catalog.service";
import {LanguageService} from "../../../../../services/core/languageService/language.service";
import {Language} from "../../../../../models/localisation/language";

@Component({
  selector: 'product-catalog-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent implements OnInit,DoCheck{

  private id:number;
  public parent_id: number;
  private olddata: any;
  private data: Catalog;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;
  public languages: Language[];

  constructor(
    private route:ActivatedRoute,
    private alertservice: AlertService,
    private catalogservice: ProductCatalogService,
    private languageservice: LanguageService
  ){
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.saveUrl = 'save';
    this.commonActionBarConfig.idName = 'catalog_id';
    this.languages = this.languageservice.get();
  }


  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.parent_id = +params['parent_id'];
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
      this.catalogservice.getcatalog(this.id).subscribe(data=>{
        this.data = new Catalog(data,this.languages);
        //保存原始数据
        this.olddata = JSON.stringify(this.data);
      })
    } else {
      this.data = new Catalog(null,this.languages);
      //保存原始数据
      this.olddata = JSON.stringify(this.data);
    }
  }

  usersName: string = ''; //所有用户名字符串
  getUsersName(){
    this.usersName = '';
    let users = this.data.users;
    if(users){
      if(users&&users.length) {
        for (let i = 0; i < users.length; i++) {
          if(i == users.length-1){
            this.usersName += users[i].name;
          } else {this.usersName += users[i].name + '、'}
        }
      }
    }
  }

  //筛选组类别更改
  filterGroupsChange($event){
    this.data.filter_groups = JSON.parse(JSON.stringify($event));
  }

  //保存
  save(){
    if(this.parent_id){
      this.data.parent_id = this.parent_id;
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


