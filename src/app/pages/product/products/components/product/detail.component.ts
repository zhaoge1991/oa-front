import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {ProductListService} from "../../../../../services/product/productList/product_list.service";
import {Product} from "../../../../../models/product/product/product";
import {Language} from "../../../../../models/localisation/language";
import {LanguageService} from "../../../../../services/core/languageService/language.service";
import {ProductCatalogService} from "../../../../../services/product/productCatalog/product_catalog.service";


@Component({
  selector:'product-product-detail',
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent implements OnInit,OnDestroy{
  constructor(
    private route:ActivatedRoute,
    private productservice: ProductListService,
    private catalogservice: ProductCatalogService,
    private languageservice: LanguageService
  ){
    this.commonActionBarConfig.idName = 'product_id';
    this.commonActionBarConfig.editUrl = 'pages/product/products/product/edit';
    this.languages = this.languageservice.get();
  }
  private commonActionBarConfig: CommonActionBarConfig = new CommonActionBarConfig();
  private id:number;
  private data: any;
  private sub:any;
  public languages: Language[];
  public filter_groups;

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }

  getById(id:number){
    this.productservice.get(id).subscribe(data=>{
      this.data = new Product(data,this.languages);
      this.getFilters(this.data.catalog_id);
    })
  }

  //获取分类筛选组
  getFilters(id:number){
    this.catalogservice.getcatalog(id).subscribe(data=>{
      if(data){
        this.filter_groups = data.filter_groups;
      }
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

  ngOnDestroy(){this.sub.unsubscribe();}

}


