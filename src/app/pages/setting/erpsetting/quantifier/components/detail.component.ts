import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {QuantifierService} from "../../../../../services/core/quantifierService/quantifier.service";

@Component({
  selector: 'country-quantifier-component',
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent  implements OnInit,OnDestroy{
  private commonActionBarConfig: CommonActionBarConfig = new CommonActionBarConfig();
  private id:number;
  private data: any;
  private sub:any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private quantifierservice: QuantifierService
  ){
    this.commonActionBarConfig.idName = 'quantifier_id';
    this.commonActionBarConfig.addNewUrl = 'pages/setting/erpsetting/quantifier/edit';
    this.commonActionBarConfig.editUrl = 'pages/setting/erpsetting/quantifier/edit';
    this.commonActionBarConfig.deleteUrl = '/api/setting/erpsetting/quantifier/quantifier';
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  getById(id:number){
      this.data = this.quantifierservice.get(id);
  }
}
