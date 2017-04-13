import {Language} from "../../localisation/language";
import {FilterDescription} from "./filterDescription";
export class Filter {
    filter_id: number;
    filter_group_id: number;
    sort_order: number;
    code: string;
    created_at: string;
    updated_at: string;
    filter_description: FilterDescription[];
    constructor(filter,languages: Language[]) {
        if (filter) {
            this.filter_id = filter.filter_id;
            this.filter_group_id = filter.filter_group_id;
            this.sort_order = filter.sort_order;
            this.code = filter.code;
            this.created_at = filter.created_at;
            this.updated_at = filter.updated_at;
            this.filter_description = [];
        } else {
            this.filter_id = 0;
            this.filter_group_id = 0;
            this.sort_order = 0;
            this.code = '';
            this.created_at = '';
            this.updated_at = '';
            this.filter_description = [];
        }
        //先循环语言生成所有语言描述数组
        for(let i=0;i<languages.length;i++){
          this.filter_description.push(new FilterDescription(null));
          //给每一个语言的描述加上对应语言id
          this.filter_description[this.filter_description.length-1].language_id = languages[i].language_id;
        }
        //如果处于编辑状态则遍历数据对象的描述并与描述数组语言id对比，若一样则将数据的描述赋给相应语言描述
        if(filter){
          let des = filter.filter_description;
          for(let i=0;i<des.length;i++){
            for(let j=0;j<this.filter_description.length;j++){
              if(des[i].language_id == this.filter_description[j].language_id){
                this.filter_description[j] = des[i];
              }
            }
          }
        }

    }
}
