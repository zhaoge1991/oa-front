import {Component,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {OrderEditModel} from "../../../../../common/models/order_edit.model";
import {PaymentService} from "../../../../../services/core/paymentService/payment.service";
import {AppconfigService} from "../../../../../services/core/appConfigService/appConfigService";
import {QuantifierService} from "../../../../../services/core/quantifierService/quantifier.service";
import {ProductSelectComponent} from "../../../../../theme/oa-them/components/productselectComponent/product_select.component";
import {CostComponent} from "../../../../../theme/oa-them/components/costComponent/cost.component";
import {AlertService} from "../../../../../services/core/alert.component.service";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {AgGridMultiLineComponent} from "../../../../../modules/agGrid/common/agGridMultiLine.component";
import {AgGridCurrencyComponent} from "../../../../../modules/agGrid/common/agGridCurrency.component";
import {InquiryService} from "../../../../../services/inquiry/inquiry.service";
import {Table} from "../../../../../models/sale/table/Table";
import {TableOrderCost} from "../../../../../models/sale/table/TableOrderCost";
import {TableOrderProduct} from "../../../../../models/sale/table/TableOrderProduct";
import {ProvisionService} from "../../../../../services/core/provisionService/provision.service";

@Component({
  selector: 'sale-order-edit',
  templateUrl: './edit.html',
  styleUrls: []
})

export class EditComponent implements OnInit{

  private progridOptions: GridOptions;
  private costgridOptions: GridOptions;
  private id:number;
  private olddata: any;
  private data: Table;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private orderservice: InquiryService,
    private payment: PaymentService,
    private provision: ProvisionService,
    private appconfig: AppconfigService,
    private quantifier: QuantifierService,
    private location: Location,
    private alertservice: AlertService
  ){
    this.progridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.costgridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.addNewUrl = 'pages/sale/table/inquiry/edit';
    this.commonActionBarConfig.saveUrl = 'pages/sale/table/inquiry/edit';
    this.commonActionBarConfig.idName = 'id';
  }


  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.isEdit = !!this.id;
    });
    this.setData();
  }


  //选中行列表行配置
  private ordercostAll: number=0;
  private ordercostCol = [
    {
      headerName: "#", width: 30,suppressSorting: true,
      suppressMenu: true, pinned: true,
      cellRenderer: function (params) {
        return params.rowIndex+1
      }
    },
    {headerName: '费用名称',field: 'name',width: 240},
    {headerName: '费用金额',field: 'price',width: 240}
  ];
  private orderpaymentData;
  provisionData;
  other_price;
  //商品列定义
  private selectedcolumnDefs = [
    {
      headerName: '产品id',
      field: 'product_id',
      width: 90
    },
    {
      headerName: '产品型号',
      field: 'model',
      width: 160,
      editable: true
    },
    {
      headerName: '中文描述',
      field: 'zh_name',
      width: 480,
      editable: true,
      cellEditorFramework: AgGridMultiLineComponent,
    },
    {
      headerName: '英文描述',
      field: 'en_name',
      width: 480,
      editable: true,
      cellEditorFramework: AgGridMultiLineComponent,
    },
    {
      headerName: '单位',
      field: 'quantifier_id',
      width: 60,
      cellRenderer: (params)=>{
        let data = params.value;
        if(data){
          let quantifierdata=this.quantifier.get(data);
          return quantifierdata[params.property];
        } else return '';
      },
      cellRendererParams: {
        property: 'code'
      },
      editable: true,
      cellEditorFramework: AgGridCurrencyComponent,
    },
    {
      headerName: '数量',
      field: 'quantity',
      width: 60,
      editable: true
    },
    {
      headerName: '实际销售单价',
      field: 'price',
      width: 120,
      editable: true
    },
    {
      headerName: '实际销售金额',
      valueGetter: 'data.price*1*data.quantity*1',
      volatile: true,
      width: 120
    },
    {
      headerName: '指导价',
      field: 'reference_price',
      width: 90,
      editable: true
    }
  ];
  setData(){
    if(this.id){
      this.orderservice.get(this.id).subscribe(data=>{
        console.log(data);
        this.data = new Table(data);
        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));

        //支付方式数据
        this.orderpaymentData = this.payment.get(data.table_order.payment_id);

        //价格条款数据
        this.provisionData = this.provision.get(this.data.table_order.provision_id)

        //其他费用总和
        this.otherCost();

      })
    } else {
      let date = new Date();
      this.data = new Table(null);
      //this.data.date_added = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));

    }
  }

  //选中产品
  private isproselected:boolean = false;
  onRowSelected($event){
    this.isproselected = true
  }

  //添加产品按钮
  @ViewChild(ProductSelectComponent) selectproduct: ProductSelectComponent;
  addpbtn(){
    this.selectproduct.show();
  }
  addproduct($event){
    let addproduct = new TableOrderProduct($event);
    this.data.addProduct(addproduct);
    this.progridOptions.api.addItems([addproduct]);
  }

  //删除产品
  deletepro(){
    let selectedNodes = this.progridOptions.api.getSelectedNodes();
    this.progridOptions.api.removeItems(selectedNodes);
    this.data.deleteProduct(selectedNodes[0].childIndex);
    this.isproselected = false;
  }

  //选中费用
  private iscostselected:boolean = false;
  oncostRowSelected($event){
    this.iscostselected = true;
  }
  //添加费用
  @ViewChild(CostComponent) addcostdialog: CostComponent;
  addcostbtn(){
    this.addcostdialog.showdialog();
  }
  addcost($event){
    this.data.addCost($event as TableOrderCost);
    this.costgridOptions.api.addItems([$event]);
  }

  //删除费用
  deletecost(){
    let selectedNodes = this.costgridOptions.api.getSelectedNodes();
    this.costgridOptions.api.removeItems(selectedNodes);
    this.data.deleteCost(selectedNodes[0].childIndex);
    this.iscostselected = false;
  }


  //支付方式修改后
  onPaymentChange(e){
    this.data.table_order.payment_id = e;
    this.orderpaymentData = this.payment.get(e);
  }

  //价格条款修改后
  onProvisionChange(e){

    this.data.table_order.provision_id = e;
    this.provisionData = this.provision.get(e);
  }

  //订单数据修改后
  onCellValueChanged(event){
    if(event.colDef.field=='price'||event.colDef.field=="quantity"){
      this.data.refreshPrice();
    }
    this.progridOptions.api.softRefreshView();
  }
  onCostChange(){
    this.data.refreshPrice();
  }

  //计算其他费用总和
  otherCost(){
    let order_cost = this.data.table_order_cost;
    let allcost:number = 0;
    for(let i=0;i<order_cost.length;i++){
      allcost += (order_cost[i].price-0);
    }
    this.data.table_order.other_price = allcost;
  }
  //保存
  save(){
    this.data.customer_id = this.data.customer.customer_id;
    //this.data.other_customer = this.data.customer.firstname;
    if(this.isEdit){
      this.orderservice.put(this.id,this.data).subscribe();
    } else {
      this.orderservice.post(this.data).subscribe();
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


