import {Component, ViewEncapsulation,ElementRef} from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./smartTables.scss')],
  template: require('./smartTables.html')
})
export class SmartTables {

  query: string = '';

  settings = {
    actions: {
      columnTitle: '表格操作',
      add: true,
      edit: true,
      delete: true
    },
    noDataMessage: '没有项目',
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    pager: {
      display: true,
      perPage: 15
    },
    columns: {
      id: {
        title: '合同编号',
        type: 'string',
        //值的管道函数
        valuePrepareFunction: (value) => { return value === 1 ? 'true' : 'false' },
        //是否有筛选框
        filter: false
      },
      firstName: {
        title: '签约日期',
        type: 'string'
      },
      lastName: {
        title: '客户订单编号',
        type: 'string'
      },
      username: {
        title: '拥有人名称',
        type: 'string'
      },
      email: {
        title: '录入人名称',
        type: 'string'
      },
      age: {
        title: '业务员名称',
        type: 'number'
      },
      consignee: {
        title: '收货人',
        type: 'string'
      },
      pronum: {
        title: '商品总数量',
        type: 'number'
      },
      promoney: {
        title: '合同总金额',
        type: 'number'
      },
      start: {
        title: '起运港',
        type: 'string'
      },
      end: {
        title: '目的港',
        type: 'string'
      },
      moneytype: {
        title: '价格条款',
        type: 'string'
      },
      money: {
        title: '价格条款对应',
        type: 'string'
      },
      attr1: {
        title: '出口公司英文名',
        type: 'string'
      },
      attr2: {
        title: '附件数量',
        type: 'string'
      },
      attr3: {
        title: '单据确认',
        type: 'string'
      },
      attr4: {
        title: '订单当前状态',
        type: 'string'
      },
      attr5: {
        title: '临时信用额',
        type: 'string'
      },
      attr6: {
        title: '结算币种',
        type: 'string'
      },
      attr7: {
        title: '本币汇率',
        type: 'string'
      },
      attr8: {
        title: '美元汇率',
        type: 'string'
      },
      attr9: {
        title: '货物描述',
        type: 'string'
      },
      attr10: {
        title: '审核状态',
        type: 'string'
      },
      attr11: {
        title: '删除状态',
        type: 'string'
      },
      attr12: {
        title: '运输方式',
        type: 'string'
      },
      attr13: {
        title: '付款方式',
        type: 'string'
      },
      attr14: {
        title: '出口公司',
        type: 'string'
      },
      attr15: {
        title: '出口公司银行',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SmartTablesService,private _el:ElementRef) {
    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDobuleClick(event):void {
    console.log(event);
  }

  onUserSelect(event):void {
    console.log(event);
    event.data.age = (event.data.age-0) + 10;
    event.source.load(event.source.data);
    console.log(event.data.age)
  }

  //滚轮在表格里滚动表格内容左右移动
  //onMouseWhell(event):void {
  //  event.preventDefault();
  //  const scroll:number = event.wheelDelta;
  //  let target = jQuery(this._el.nativeElement).find('.card-body');
  //  target.scrollLeft(target.scrollLeft()-scroll);
  //}
}
