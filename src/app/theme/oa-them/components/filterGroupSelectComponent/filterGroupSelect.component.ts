import {Component,OnInit,Input,Output,EventEmitter} from "@angular/core";
import {ProductFilterGroupService} from "../../../../services/product/productFilter/product_filterGroup.service";

@Component({
  selector: 'filter-group-select',
  template: `
    <select *ngIf="options" (change)="onchange($event)" class="ng-form-control" [disabled]="disabled">
      <option *ngFor="let option of options" [value]="option.filter_group_catalog_id">{{option.name}}</option>
    </select>
`,
  styleUrls: [],
  providers: [ProductFilterGroupService]
})

export class FilterGroupSelectComponent implements OnInit{
  @Input() disabled: boolean;
  @Output() filter_groupsChange = new EventEmitter();

  constructor(private listservice: ProductFilterGroupService){}

  public options:any;

  ngOnInit(){
    this.listservice.getlist().subscribe(data=>{
      this.options = data;
    })
  }

  onchange($event){
    let filter_groups = this.getfilter_groups($event.target.value-0);
    this.filter_groupsChange.emit(filter_groups);
  }

  getfilter_groups(id:number){
    for(let i=0;i<this.options.length;i++){
      if(id == this.options[i].filter_group_catalog_id){
        return this.options[i].filter_groups;
      }
    }
  }

}
