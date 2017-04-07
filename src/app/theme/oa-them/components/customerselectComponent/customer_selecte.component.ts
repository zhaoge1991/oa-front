import {Component,Input,Output,EventEmitter,ViewChild,ViewEncapsulation,OnInit} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {CountryService} from "../../../../services/core/countryService/country.service";
import {ProjectService} from "../../../../services/core/projectService/project.service";
import {Customer} from "../../../../models/sale/Customer";
import {Paginate} from "../../../../models/common/paginate";
import {CustomersService} from "../../../../services/customer/customers.service";


@Component({
  selector: 'customer-select',
  templateUrl: './customer_select.component.html',
  styleUrls: ['./customer_select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CustomersService]
})

export class CustomerSelectComponent implements OnInit{
  constructor(
    private customerservice: CustomersService,
    private countryservice:CountryService,
    private projectservice: ProjectService
  ){}

  @Input() customer: Customer;
  @Input() disabled:boolean;
  @Output() customerChange = new EventEmitter();
  private _customer:Customer;
  private customers: Customer[];
  private paginate: Paginate
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
      width: 90,
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
          if(country){
            return country[params.property];
          } else return '';
        } else return '';
      },
      cellRendererParams: {
        property: 'name'
      }
    },
    {
      headerName: '询盘时间',
      field: 'date_added',
      width: 120
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
      field: 'users',
      width: 90,
      cellRenderer: (params)=>{
        let data = params.value;
        let users:string = '';
        if(data&&data.length){
          for(let i=0;i<data.length;i++){
            if(data.length<=1){
              users += data[i][params.property]
            } else {
              users += data[i][params.property]+'、'
            }
          }
          return users;
        } else return '';
      },
      cellRendererParams: {
        property: 'name'
      }
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
      field: 'kh_dianhua',
      width: 90
    },
    {
      headerName: '询盘方式',
      field: 'kh_xunpan',
      width: 90
    },
    {
      headerName: '客户地址',
      field: 'kh_dizhi',
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
    this._customer = this.customer.customer_id ? new Customer(this.customer):new Customer(null); //复制未提交时的用户对象
    this.init(1,'');
  }

  //初始化列表数据
  init(page:number,key:string){
    this.customerservice.getlist(page,key).subscribe(data=>{
      let result = data.results.data.customers
      this.paginate = result;
      this.customers = this.paginate.data;
    })
  }

  //弹出列表框
  @ViewChild('dialog') Modal: ModalDirective;
  show(){
    this.Modal.show();
  }

  //点击翻页
  pageClick($event){
    this.isselected = false;
    this.init($event.text,this.searchtext);
  }

  //搜索
  private searchtext = '';
  search($event){
    this.isselected = false;
    this.searchtext = $event;
    this.init(1,this.searchtext);
  }

  //选中行
  private select_customer:{};
  onRowSelected($event){
    if($event.node.selected){
      this.select_customer = $event.node.data as Customer;
      this.isselected = true;
    }
  }

  //确定按钮
  addcustomer(){
    if(this.isselected){
      this.customerChange.emit(this.select_customer);
    } else {
      let newcustomer = new Customer(null);
      newcustomer.customer_id = null;
      newcustomer.firstname = (this._customer.firstname).toString();
      this.customerChange.emit(newcustomer);
    }
    this.Modal.hide();
  }

  //关闭、取消按钮
  close(){
    this.Modal.hide();
    this.select_customer = null;
    this.isselected = false;
  }
}
