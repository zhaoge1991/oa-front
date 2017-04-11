import {Component,OnInit,ViewChild} from '@angular/core';
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
import {CatalogDescription} from "../../../../../models/product/catalog/catalogDescription";

@Component({
  selector: 'sale-order-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent implements OnInit{

  private id:number;
  public parent_id: number;
  private olddata: any;
  private data: Catalog;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;
  public languages: Language[];
  public descriptions: CatalogDescription[] = [];

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

  //获取数据
  setData(){
    if(this.id){
      this.catalogservice.getcatalog(this.id).subscribe(data=>{
        console.log(data);
        this.data = new Catalog(data);
        this.setDescription();
      })
    } else {
      this.data = new Catalog(null);
      this.setDescription();
    }
    //保存原始数据
    this.olddata = JSON.parse(JSON.stringify(this.data));
  }

  //设置多语言描述
  setDescription(){
    //先循环语言生成所有语言描述数组
    for(let i=0;i<this.languages.length;i++){
      this.descriptions.push(new CatalogDescription(null));
      //给每一个语言的描述加上对应语言id
      this.descriptions[this.descriptions.length-1].language_id = this.languages[i].language_id;
    }
    //如果处于编辑状态则遍历数据对象的描述并与描述数组语言id对比，若一样则将数据的描述赋给相应语言描述
    if(this.id){
      let des = this.data.catalog_description;
      for(let i=0;i<des.length;i++){
        for(let j=0;j<this.descriptions.length;j++){
          if(des[i].language_id == this.descriptions[j].language_id){
            this.descriptions[j] = des[i];
          }
        }
      }
    }
    console.log(this.descriptions);
  }
  

  //保存
  save(){
    if(this.isEdit){
      this.catalogservice.put(this.id,this.data).subscribe();
    } else {
      this.catalogservice.post(this.data).subscribe();
    }
    this.olddata = this.data;
  }

  //编辑守卫
  canDeactivate(): boolean|Observable<boolean>{
    if(JSON.stringify(this.olddata) == JSON.stringify(this.data)){
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


