import {Component,ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {Paginate} from "../../../../models/common/paginate";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {CustomersService} from "../../../../services/customer/customers.service";
import {Customer} from "../../../../models/customer/customer";
import {ProjectService} from "../../../../services/core/projectService/project.service";
import {CountryService} from "../../../../services/core/countryService/country.service";


@Component({
  selector: 'sale-table-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData: Customer[];
  private columnDefs:any[];
  private selectedeRow: boolean;
  public selectedcolumnDefs: any[];
  public selectedrowData: Customer;
  public isbatches: boolean = false;
  //翻页配置
  private paginate : Paginate;
  private selectedIndex:number;


  pageClick($event){
    this.createRowData($event.text-0,this.searchtext);
    this.selectedeRow = false;
    this.selectedrowData = null;
  }

  private searchtext:string = '';
  search($event){
    this.createRowData(1,$event);
    this.searchtext = $event;
    this.selectedeRow = false;
    this.selectedrowData = null;
  }

  actionConfig:CommonActionBarConfig;
  constructor(
    private router: Router,
    private listservice: CustomersService,
    private project: ProjectService,
    private country: CountryService
  ) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData(1);
    this.createColumnDefs();
    this.showGrid = true;
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.openUrl = 'pages/customer/customers/detail';
    this.actionConfig.addNewUrl = 'pages/customer/customers/edit';
    this.actionConfig.editUrl = 'pages/customer/customers/edit';
    this.actionConfig.deleteUrl = '/api/customer/customers/';
    this.actionConfig.idName = 'customer_id';
    this.actionConfig.noback = true;
  }

  //行配置项(获取数据)
  private createRowData(page,key?:string) {
    this.listservice.getlist(page,key)
      .subscribe(data=>{
        this.paginate = data.results.data.customers;
        this.rowData = this.paginate.data;
    })
  }

  //列配置项
  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: ' ',field:' ',width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true, hide: true
      },
      {
        headerName: "#", width: 30,suppressSorting: true,
        suppressMenu: true, pinned: true,
        cellRenderer: function (params) {
          return params.rowIndex+1
        }
      },
      {
        headerName: '客户ID',
        field: 'customer_id',
        width: 80,
        pinned: true //固定列
      },
      {
        headerName: '客户名称',
        field: 'firstname',
        width: 120,
        pinned: true //固定列
      },
      {
        headerName: '项目',
        field: 'project_id',
        width: 120,
        pinned: true, //固定列
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            let status = this.project.get(data)
            return status[params.property];
          } else return '';
        },
        cellRendererParams: {
          property: 'project_name'
        }
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 160,
      },
      {
        headerName: '国家',
        field: 'country_id',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            let status = this.country.get(data)
            return status[params.property];
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        }
      },
      {
        headerName: '拥有人',
        field: 'users',
        width: 120,
        editable: false, //是否可双击编辑
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
        },
      },
      {
        headerName: '客户状态',
        field: 'kh_zhuangtai',
        width: 120,
      },
      {
        headerName: '公司名称',
        field: 'field_company',
        width: 120,
      },
      {
        headerName: '公司网站',
        field: 'field_company_site',
        width: 120,
      },
      {
        headerName: '客户电话',
        field: 'kh_dianhua',
        width: 120,
      },
      {
        headerName: '询盘方式',
        field: 'kh_xunpan',
        width: 120,
      },
      {
        headerName: '询盘时间',
        field: 'date_added',
        width: 120,
      },
      {
        headerName: '客户地址',
        field: 'kh_dizhi',
        width: 280,
      },
      {
        headerName: '客户类型',
        field: 'kh_leixing',
        width: 120,
      },
      {
        headerName: '流失原因',
        field: 'kh_liushi',
        width: 120,
      },
      {
        headerName: '原因备注',
        field: 'kh_beizhu',
        width: 240,
      }
    ];
  }

  //选中行列表行配置
  private onRowSelected($event) {
    if($event.node.selected){
      this.selectedrowData = $event.node.data as Customer;
      this.selectedIndex = $event.node.rowIndex;

      this.selectedeRow = true;
    }
  }

  //批处理操作
  //private batchesClick($event){
  //  if(!this.isbatches){
  //    this.gridOptions.columnApi.setColumnVisible(' ',true);
  //    this.isbatches = true;
  //  } else {
  //    this.gridOptions.columnApi.setColumnVisible(' ',false);
  //    this.isbatches = false;
  //  }
  //}

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.router.navigate(['pages/customer/customers/detail/',$event.data.customer_id])
  }

  //删除操作
  deleteData(e){
    if(e){
      this.listservice.delete(this.selectedrowData.customer_id).subscribe(data=>{
        this.selectedrowData = null;
        this.createRowData(this.paginate.current_page);
      })
    }
  }

  //选中订单数据改变
  objectChange(){
    this.selectedrowData = null;
    this.createRowData(this.paginate.current_page);
  }
}
