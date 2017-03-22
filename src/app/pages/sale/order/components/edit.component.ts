import {Component,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {OrderEditModel} from "../../../../common/models/order_edit.model";
import {SaleOrderService} from "../../../../services/saleOrder/sale-order.service";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {ProductSelectComponent} from "../../../../theme/oa-them/components/productselectComponent/product_select.component";
import {CostComponent} from "../../../../theme/oa-them/components/costComponent/cost.component";
import {AlertService} from "../../../../services/core/alert.component.service";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {SaleOrder} from "../../../../models/sale/saleOrder";
import {SaleOrderProduct} from "../../../../models/sale/saleOrderProduct";
import {SaleOrderCost} from "../../../../models/sale/saleOrderCost";
import {AgGridMultiLineComponent} from "../../../../modules/agGrid/common/agGridMultiLine.component";
import {AgGridCurrencyComponent} from "../../../../modules/agGrid/common/agGridCurrency.component";

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
  private data: SaleOrder;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private orderservice: SaleOrderService,
    private payment: PaymentService,
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
    this.commonActionBarConfig.addNewUrl = 'pages/sale/order/edit';
    this.commonActionBarConfig.saveUrl = 'pages/sale/order/edit';
    this.commonActionBarConfig.idName = 'order_id';
    this.commonActionBarConfig.annex = true;
  }


  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.isEdit = !!this.id;
    });
    this.setData();
  }


  //选中行列表行配置
  private customerData;
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
  private orderscheduleData;
  private customer;
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
        this.data = new SaleOrder(data);
        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));

        //支付方式数据
        this.orderpaymentData = this.payment.get(data.payment_id);

        ////订单进度数据
        //this.listservice.getSchedule(this.data.order_id).then(res=>{
        //    this.orderscheduleData=res.results.data.order;
        //  }
        //);

        //判断是否为样品单
        this.isfreeOrder(this.data.order_type_id);

      })
    } else {
      let date = new Date();
      this.data = new SaleOrder(null);
      this.data.date_added = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));

      //判断是否为样品单
      this.isfreeOrder(this.data.order_type_id);
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
    let addproduct = new SaleOrderProduct($event);
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
    this.data.addCost($event as SaleOrderCost);
    this.costgridOptions.api.addItems([$event]);
  }

  //删除费用
  deletecost(){
    let selectedNodes = this.costgridOptions.api.getSelectedNodes();
    this.costgridOptions.api.removeItems(selectedNodes);
    this.data.deleteCost(selectedNodes[0].childIndex);
    this.iscostselected = false;
  }

  //更改订单类型
  orderTypeChange($event){
    this.data.order_type_id = $event - 0;
    this.isfreeOrder(this.data.order_type_id);
  }
  //判断是否是样品单
  private isfreeorder: boolean;
  isfreeOrder(id:number){
    if(id == this.appconfig.get('sale.order.type.free') || id == this.appconfig.get('sale.order.type.charge')){
      this.isfreeorder = true;
    } else this.isfreeorder = false;
  }

  //单位选择(无法实现数据绑定)
  //quantifierselect(params){
  //  let value = params.value;
  //  let selectEle = document.createElement('select');
  //  selectEle.setAttribute('selected',value);
  //  let options = this.quantifier.get();
  //  for(let i=0;i<options.length;i++){
  //    let option = document.createElement('option');
  //    option.value = options[i].quantifier_id;
  //    option.innerHTML = options[i].code;
  //    selectEle.appendChild(option);
  //  }
  //  return selectEle;
  //}

  //支付方式修改后
  onPaymentChange(e){
    this.data.payment_id = e;
    this.orderpaymentData = this.payment.get(e);
  }

  //订单数据修改后
  onCellValueChanged(event){
    console.log(event);
    if(event.colDef.field=='price'||event.colDef.field=="quantity"){
      this.data.refreshPrice();
    }
    this.progridOptions.api.softRefreshView();
  }
  onCostChange(){
    this.data.refreshPrice();
  }

  //保存
  save(){
    this.data.customer_id = this.data.customer.customer_id;
    this.data.other_customer = this.data.customer.firstname;
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
      }).map(data=>{
        return data;
      });
    }
  }

}


