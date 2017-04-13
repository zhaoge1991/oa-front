import {CatalogFilterGroupDescription} from "./catalogFilterGroupDescription";
import {Language} from "../../localisation/language";
export class CatalogFilterGroup{
  filter_group_id: number;
  sort_order: number;
  filter_group_catalog_id: number;
  created_at: string;
  updated_at: string;
  filter_group_description: CatalogFilterGroupDescription[];

  constructor(catalogFilterGroup,languages?:Language[]){
    if(catalogFilterGroup){
      this.filter_group_id = catalogFilterGroup.filter_group_id;
      this.sort_order = catalogFilterGroup.sort_order;
      this.filter_group_catalog_id = catalogFilterGroup.filter_group_catalog_id;
      this.created_at = catalogFilterGroup.created_at;
      this.updated_at = catalogFilterGroup.updated_at;
      this.filter_group_description = [];
    } else {
      this.filter_group_id = null;
      this.sort_order = null;
      this.filter_group_catalog_id = null;
      this.created_at = null;
      this.updated_at = null;
      this.filter_group_description = [];
    }
    //先循环语言生成所有语言描述数组
    for(let i=0;i<languages.length;i++){
      this.filter_group_description.push(new CatalogFilterGroupDescription(null));
      //给每一个语言的描述加上对应语言id
      this.filter_group_description[this.filter_group_description.length-1].language_id = languages[i].language_id;
    }
    //如果处于编辑状态则遍历数据对象的描述并与描述数组语言id对比，若一样则将数据的描述赋给相应语言描述
    if(catalogFilterGroup){
      let des = catalogFilterGroup.filter_group_description;
      for(let i=0;i<des.length;i++){
        for(let j=0;j<this.filter_group_description.length;j++){
          if(des[i].language_id == this.filter_group_description[j].language_id){
            this.filter_group_description[j] = des[i];
          }
        }
      }
    }
  }
}
