import {Component,Input,Output,EventEmitter,ViewChild,ViewEncapsulation,OnInit} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {CountryService} from "../../../../services/core/countryService/country.service";
import {ProjectService} from "../../../../services/core/projectService/project.service";


@Component({
  selector: 'first-select',
  templateUrl: './firstSelect.component.html',
  styleUrls: ['./firstSelect.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FirstSelectComponent implements OnInit{
  constructor(
    private countryservice:CountryService,
    private projectservice: ProjectService
  ){}

  @Input() customer:{id:number,name: string} = {id: null,name:''};
  @Output() customerChange = new EventEmitter();
  private _customer:{id:number,name: string} = JSON.parse(JSON.stringify(this.customer)); //复制未提交时的用户对象
  private customers: any[];
  private pageconfig:{
    nowPage : number,
    lastPage : number,
    total: number,
    fromitem: number,
    toitem: number
  }
  private isselected: boolean = false;
  //列表列定义
  private columnDefs = [
    {
      headerName: "#", width: 30,suppressSorting: true,
      suppressMenu: true, pinned: true,
      cellRenderer: function (params) {
        return params.rowIndex+1
      }
    },
    {
      headerName: 'ID',
      field: 'customer_id',
      width: 50,
      pinned: true
    },
    {
      headerName: '客户姓名',
      field: 'firstname',
      width: 60,
      pinned: true
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 80
    },
    {
      headerName: '国家',
      field: 'country_id',
      width: 120,
      cellRenderer: (params)=>{
        let data = params.value;
        if(data){
          let country=this.countryservice.get(data);
          return country[params.property];
        } else return '';
      },
      cellRendererParams: {
        property: 'name'
      }
    },
    {
      headerName: '询盘时间',
      field: 'date_added',
      width: 60
    },
    {
      headerName: '项目',
      field: 'project_id',
      width: 60,
      cellRenderer: (params)=>{
        let data = params.value;
        if(data){
          let country=this.projectservice.get(data);
          return country[params.property];
        } else return '';
      },
      cellRendererParams: {
        property: 'project_name'
      },
    },
    {
      headerName: '拥有人',
      field: 'total',
      width: 90,
    },
    {
      headerName: '公司名称',
      field: 'field_company',
      width: 90,
    },
    {
      headerName: '公司网站',
      field: 'field_company_site',
      width: 90,
    },
    {
      headerName: '客户状态',
      field: 'kh_zhuangtai',
      width: 60,
    },
    {
      headerName: '客户电话',
      field: 'telephone',
      width: 90
    },
    {
      headerName: '询盘方式',
      field: 'kh_xunpan',
      width: 90
    },
    {
      headerName: '客户地址',
      field: 'address',
      width: 120
    },
    {
      headerName: '客户类型',
      field: 'kh_leixing',
      width: 90
    },
    {
      headerName: '流失原因',
      field: 'kh_liushi',
      width: 90
    }
  ]

  ngOnInit(){
    this.init('',1);
  }

  //初始化列表数据
  init(key:string,page:number){
    
  }

  //弹出列表框
  @ViewChild('dialog') Modal: ModalDirective;
  show(){
    this.Modal.show();
  }

  //点击翻页
  pageClick($event){
    this.isselected = false;
    this.init(this.searchtext,$event.text);
  }

  //搜索
  private searchtext = '';
  search($event){
    this.isselected = false;
    this.searchtext = $event;
    this.init(this.searchtext,1);
  }

  //选中行
  private select_customer:{};
  onRowSelected($event){
    if($event.node.selected){
      this.select_customer = {
        id: $event.node.data.customer_id,
        name: $event.node.data.firstname,
        country: $event.node.data.country_id
      }
      this.isselected = true;
    }
  }

  //确定按钮
  addcustomer(){
    if(this.isselected){
      this.customer = JSON.parse(JSON.stringify(this.select_customer));
      this.customerChange.emit(this.customer);
    } else {
      this.customer.id = null;
      this.customer.name = (this._customer.name).toString();
      this.customerChange.emit(this.customer);
    }
    this.Modal.hide();
  }
}
