import {Injectable} from '@angular/core';
import {CatalogDescription} from "./catalogDescription";
import {LanguageService} from "../../../services/core/languageService/language.service";
import {Language} from "../../localisation/language";
import {User} from "../../user/user";
import {CatalogFilterGroup} from "./catalogFilterGroup";

@Injectable()
export class Catalog {
    catalog_id: number;
    sort_order: number;
    entry_show: number;
    parent_id: number;
    image: string;
    index_tpl: string;
    list_tpl: string;
    info_tpl: string;
    catalog_urlrule: string;
    detail_urlrule: string;
    field: string;
    channel_id: number;
    top: number;
    status: number;
    packing_spec_id: number;
    created_at: string;
    updated_at: string;
    users: User[];
    catalog_description: CatalogDescription[];
    filter_groups: CatalogFilterGroup[];
    constructor(catalog,languages:Language[]) {
        if (catalog) {
            this.catalog_id = catalog.catalog_id;
            this.sort_order = catalog.sort_order;
            this.entry_show = catalog.entry_show;
            this.parent_id = catalog.parent_id;
            this.image = catalog.image;
            this.index_tpl = catalog.index_tpl;
            this.list_tpl = catalog.list_tpl;
            this.info_tpl = catalog.info_tpl;
            this.catalog_urlrule = catalog.catalog_urlrule;
            this.detail_urlrule = catalog.detail_urlrule;
            this.field = catalog.field;
            this.channel_id = catalog.channel_id;
            this.top = catalog.top;
            this.status = catalog.status;
            this.packing_spec_id = catalog.packing_spec_id;
            this.created_at = catalog.created_at;
            this.updated_at = catalog.updated_at;
            this.catalog_description = [];
            this.users = [];
            this.filter_groups = [];
            if(catalog.users){
              for (let user of catalog.users){
                this.users.push(new User(user));
              };
            }
            if(catalog.filter_groups){
              for (let filter_group of catalog.filter_groups){
                this.filter_groups.push(new CatalogFilterGroup(filter_group,languages));
              }
            }
        } else {
            this.catalog_id = 0;
            this.sort_order = 0;
            this.entry_show = 0;
            this.parent_id = 0;
            this.image = '';
            this.index_tpl = '';
            this.list_tpl = '';
            this.info_tpl = '';
            this.catalog_urlrule = '';
            this.detail_urlrule = '';
            this.field = '';
            this.channel_id = 0;
            this.top = 0;
            this.status = 0;
            this.packing_spec_id = 0;
            this.created_at = '';
            this.updated_at = '';
            this.catalog_description = [];
            this.users = [];
            this.filter_groups = [];
        }
        //先循环语言生成所有语言描述数组
        for(let i=0;i<languages.length;i++){
          this.catalog_description.push(new CatalogDescription(null));
          //给每一个语言的描述加上对应语言id
          this.catalog_description[this.catalog_description.length-1].language_id = languages[i].language_id;
        }
        //如果处于编辑状态则遍历数据对象的描述并与描述数组语言id对比，若一样则将数据的描述赋给相应语言描述
        if(catalog){
          let des = catalog.catalog_description;
          if(des){
            for(let i=0;i<des.length;i++){
              for(let j=0;j<this.catalog_description.length;j++){
                if(des[i].language_id == this.catalog_description[j].language_id){
                  this.catalog_description[j] = des[i];
                }
              }
            }
          }
        }
    }
}
