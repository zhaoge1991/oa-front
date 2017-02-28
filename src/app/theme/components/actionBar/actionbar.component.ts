import {
  Input,
  Output,
  EventEmitter,
  Component,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'action-bar',
  template: require('./actionBar.html'),
  styles: [require('./actionBar.scss')],
  encapsulation: ViewEncapsulation.None
})

export class ActionBar{
  @Input() actionsData: any;
  @Input() actionConfig: {
    showbtn: {},
    openurl?: string,
    addurl?: string,
    idname?: string
  }
  @Input() operat: {
    empty?: boolean,
    toship?: boolean,
    orderdemand?: boolean,
    supaudit?: boolean,
    financeaudit?: boolean,
    procurement?: boolean,
    toshipment?: boolean,
    cusrecive?: boolean,
    procurementcheck?: boolean,
    isdone?: boolean
  };

  @Output() saveClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  @Output() toshipClick = new EventEmitter();
  @Output() orderdemandClick = new EventEmitter();
  @Output() supauditClick = new EventEmitter();
  @Output() financeauditClick = new EventEmitter();
  @Output() procurementauditClick = new EventEmitter();
  @Output() toshipmentClick = new EventEmitter();
  @Output() cusreciveClick = new EventEmitter();
  @Output() procurementcheckClick = new EventEmitter();
  @Output() isdoneClick = new EventEmitter();

  constructor(private router:Router,private location:Location){}

  private actionshow: boolean = false;
  private exportshow: boolean = false;
  private dialogtext: {text:string,operat: any} = {text:'请主管审核',
    operat: ''};

  //打开按钮操作
  goDetail(){
    this.router.navigate([this.actionConfig.openurl,this.actionsData[this.actionConfig.idname]]);
  }

  //新建按钮操作
  addClick(){
    this.router.navigate([this.actionConfig.addurl])
  }

  //编辑按钮操作
  editClick(){
    this.router.navigate([this.actionConfig.addurl,this.actionsData[this.actionConfig.idname]]);
  }

  //发送保存按钮点击事件
  saveEmit(){
    this.saveClick.emit();
  }

  //发送删除按钮点击事件
  deleteEmit(){
    this.deleteClick.emit();
  }

  //返回按钮操作
  close(){
    this.location.back();
  }

  //******操作按钮*****
  //生成出运安排
  toshipclick(){
    this.toshipClick.emit();
  }
  //生成订单要求
  orderdemandclick(){
    this.orderdemandClick.emit();
  }

  //请主管审核
  @ViewChild('textdialog') textModal: ModalDirective;
  supauditclick(){
    this.dialogtext = {
      text:'请主管审核',
      operat: 'supauditEmit'
    };
    this.textModal.show();
  }
  supauditEmit($event){
    this.supauditClick.emit($event);
    this.textModal.hide();
  }

  //请财务审核
  financeauditclick(){
    this.dialogtext = {
      text:'请财务审核',
      operat: 'financeauditEmit'
    };
    this.textModal.show();
  }
  financeauditEmit($event){
    this.financeauditClick.emit($event);
    this.textModal.hide();
  }

  //请采购审核
  procurementauditclick(){
    this.dialogtext = {
      text:'请采购审核',
      operat: 'procurementauditEmit'
    };
    this.textModal.show();
  }
  procurementauditEmit($event){
    this.procurementauditClick.emit($event);
    this.textModal.hide();
  }

  //请货运发货
  toshipmentclick(){
    this.dialogtext = {
      text:'请货运发货',
      operat: 'toshipmentEmit'
    };
    this.textModal.show();
  }
  toshipmentEmit($event){
    this.toshipmentClick.emit($event);
    this.textModal.hide();
  }

  //客户已收货
  cusreciveclick(){
    this.dialogtext = {
      text:'客户已收货',
      operat: 'cusreciveEmit'
    };
    this.textModal.show();
  }
  cusreciveEmit($event){
    this.cusreciveClick.emit($event);
    this.textModal.hide();
  }

  //请采购核销
  procurementcheckclick(){
    this.procurementcheckClick.emit();
  }

  //已完成
  isdoneclick(){
    this.dialogtext = {
      text:'已完成',
      operat: 'isdoneEmit'
    };
    this.textModal.show();
  }
  isdoneEmit($event){
    this.isdoneClick.emit($event);
    this.textModal.hide();
  }

  //导出按钮

}
