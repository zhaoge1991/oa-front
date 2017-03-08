import {Component,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";

import {OrderEditModel} from "../../../../common/models/order_edit.model";
import {SaleOrderService} from "../../../../services/sale-orderService/sale-order.service";
import {PaymentService} from "../../../../services/coreService/paymentService/payment.service";
import {AppconfigService} from "../../../../services/coreService/appConfigService/appConfigService";
import {QuantifierService} from "../../../../services/coreService/quantifierService/quantifier.service";
import {ProductSelectComponent} from "../../../../theme/oa-them/components/productselectComponent/product_select.component";
import {CostComponent} from "../../../../theme/oa-them/components/costComponent/cost.component";

@Component({
  selector: 'sale-order-edit',
  templateUrl: './edit.html',
  styleUrls: []
})

export class EditComponent implements OnInit{

  private progridOptions: GridOptions;
  private costgridOptions: GridOptions;
  private id:number;
  private data: OrderEditModel;
  private isEdit:boolean;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private orderservice: SaleOrderService,
    private payment: PaymentService,
    private appconfig: AppconfigService,
    private quantifier: QuantifierService
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
    this.setcurrens();
  }

  //按钮组配置
  private actionConfig:{} = {
    showbtn: {save:true,annex:true,delete:true,close:true},
    openurl: 'pages/sale/order-manager/detail',
    addurl: 'pages/sale/order-manager/edit',
    idname: 'order_id'
  };

  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.isEdit = !!this.id;
    });
    this.setData();
  }


  //选中行列表行配置
  private customerData;
  private ordercostData: any[];
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
  private currency_id: number;
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
      editable: true
    },
    {
      headerName: '英文描述',
      field: 'en_name',
      width: 480,
      editable: true
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
      editable: true
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
      width: 90,
      editable: true
    },
    {
      headerName: '实际销售金额',
      field: 'total',
      width: 90,
      editable: true
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
      this.orderservice.getOrderById(this.id).subscribe(data=>{
        this.data = {
          order_no: data.order_no,
          customer_id: data.customer_id,
          customer: data.customer.firstname,
          online_order: data.online_order,
          currency_id: data.currency_id,
          provision_id: data.provision_id,
          pi: data.pi,
          date_added: data.date_added,
          order_type_id: data.order_type_id,
          country_id: data.customer.country_id,
          payment_id: data.payment_id,
          payment_costs: data.payment_costs,
          product_price: data.product_price,
          order_source_id: data.order_source_id,
          expected_delivery: data.expected_delivery,
          project_id: data.project_id,
          transport_id: data.transport_id,
          transport_fee: data.transport_fee,
          total_price: data.total_price,
          order_status_id: data.order_status_id,
          complaint: data.complaint,
          demand: data.demand,
          actual_payment: data.actual_payment,
          actual_bank_fee: data.actual_bank_fee,
          money_receipt: data.money_receipt,
          product: data.products,
          cost: data.ordercost
        }
        this.currency_id = this.data.currency_id;

        //用户数据
        this.customerData = data.customer?data.customer:'';
        this.customer = {
          id: this.data.customer_id,
          name: this.data.customer,
          country: this.data.country_id
        }

        //其他费用数据
        this.ordercostData = data.ordercost;
        //计算其他费用总数
        for(let i=0;i<this.ordercostData.length;i++){
          this.ordercostAll += (this.ordercostData[i].price-0);
        }

        //支付方式数据
        this.orderpaymentData = this.payment.get(data.payment_id);

        ////订单进度数据
        //this.listservice.getSchedule(this.data.order_id).then(res=>{
        //    this.orderscheduleData=res.results.data.order;
        //  }
        //);

      })
    } else {
      let date = new Date();
      this.data = {
        order_no: '',
        customer_id: null,
        customer: '',
        online_order: '',
        currency_id: null,
        provision_id: null,
        pi: '',
        date_added: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
        order_type_id: null,
        country_id: null,
        payment_id: null,
        payment_costs: '',
        product_price: '',
        order_source_id: null,
        expected_delivery: '',
        project_id: null,
        transport_id: null,
        transport_fee: '',
        total_price: '',
        order_status_id: null,
        complaint: '',
        demand: '',
        actual_payment: '',
        actual_bank_fee: '',
        money_receipt: '',
        product: [],
        cost: []
      }
      this.customer = {
        id: this.data.customer_id,
        name: this.data.customer
      }
    }
  }

  private currens:any[] = [];
  setcurrens(){
    //this.configservice.getCurrency();
    //for(let i in data){
    //
    //  this.currens.push(data[i]);
    //}

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
    this.data.product.push($event);
    this.progridOptions.api.addItems([$event]);
  }

  //删除产品
  deletepro(){
    let selectedNodes = this.progridOptions.api.getSelectedNodes();
    this.progridOptions.api.removeItems(selectedNodes);
    this.data.product.splice(selectedNodes[0].childIndex,1);
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
    this.data.cost.push($event);
    this.costgridOptions.api.addItems([$event]);
  }

  //删除费用
  deletecost(){
    let selectedNodes = this.costgridOptions.api.getSelectedNodes();
    this.costgridOptions.api.removeItems(selectedNodes);
    this.data.cost.splice(selectedNodes[0].childIndex,1);
    this.iscostselected = false;
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

  //保存
  save(){
    this.data.customer_id = this.customer.id;
    this.data.customer = this.customer.name;
    this.orderservice.addorder(this.id,this.data).subscribe(data=>{
      console.log(data);
    });
  }

}


