import {Component,Input,Output,EventEmitter,OnInit} from '@angular/core';

import {GridOptions} from 'ag-grid/main';
import {Paginate} from "../../../../models/common/paginate";
import {ReportService} from "../../../../services/work/report/report.service";
import {ReportWeek} from "../../../../models/work/report/reportWeek";
import {ReportMonth} from "../../../../models/work/report/reportMonth";



@Component({
  selector: 'report-list',
  templateUrl: './report_list.component.html',
  styleUrls: ['./report_list.component.scss']
})

export class ReportListComponent implements OnInit{
  @Input()  reportType: string;
  @Output() rowSelected = new EventEmitter();
  @Output() cellDoubleClicked = new EventEmitter();

  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData: ReportWeek[]|ReportMonth[];
  private columnDefs:any[];
  private selectedeRow: boolean;
  public selectedrowData: ReportWeek|ReportMonth;
  //翻页配置
  private paginate : Paginate;

  //列表配置
  listconfig;

  constructor(
    private listservice: ReportService
  ){}

  ngOnInit(){
    this.getListConfig();
    this.gridOptions = <GridOptions>{};
    this.createRowData(1);
    this.createColumnDefs();
    this.showGrid = true;
  }

  pageClick($event){
    this.createRowData($event.text-0);
    this.selectedeRow = false;
    this.selectedrowData = null;
    this.rowSelected.emit(this.selectedrowData);
  }

  //获取列表配置
  getListConfig(){
    if(this.reportType == 'week'){
      this.listconfig = {
        getReport: 'getReportWeeks',
        reportname: '周报',
        isweek: true,
        delet: 'deleteweek',
        idname: 'report_week_id'
      }
    } else {
      this.listconfig = {
        getReport: 'getReportMonths',
        reportname: '月报',
        isweek: false,
        delet: 'deletemonth',
        idname: 'report_month_id'
      }
    }
  }

  //行配置项(获取数据)
  private createRowData(page) {
    this.listservice[this.listconfig.getReport](page)
      .subscribe(data=>{
        this.paginate = data;
        this.rowData = this.paginate.data;
        this.gridOptions.api.sizeColumnsToFit();
      })
  }

  //列配置项
  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: ' ',field:' ',width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true, hide: true,suppressSizeToFit: true
      },
      {
        headerName: "#", width: 30,suppressSorting: true,
        suppressMenu: true, pinned: true,suppressSizeToFit: true,
        cellRenderer: function (params) {
          return params.rowIndex+1
        }
      },
      {
        headerName: this.listconfig.reportname,
        width: 120,
        cellRenderer: (params)=>{
          let rowdata = params.data;
          let name = rowdata.user.name;
          let year, month, day;
          [year,month,day] = rowdata.report_time.split('-');
          if(this.listconfig.isweek){
            return `${name}-${year}年${month}月第${Math.floor(day/7)+1}周周报`
          } else {return `${name}-${year}年${month}月月报`}
        }
      },
      {
        headerName: '时间',
        field: 'created_at',
        width: 160,
      }
    ];
  }


  //选中行列表行配置
  onRowSelected($event) {
    if($event.node.selected){
      this.selectedrowData = $event.node.data as ReportWeek|ReportMonth;
      this.selectedeRow = true;
      this.rowSelected.emit(this.selectedrowData);
    }
  }

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.cellDoubleClicked.emit($event);
  }

  //删除数据
  delete(e){
    if(e){
      let id:number = this.selectedrowData[this.listconfig.idname];
      this.listservice[this.listconfig.delet](id).subscribe(data=>{
        this.selectedrowData = null;
        this.rowSelected.emit(this.selectedrowData);
        this.createRowData(this.paginate.current_page);
      })
    }
  }

  //选中订单数据改变
  objectChange(){
    this.selectedrowData = null;
    this.rowSelected.emit(this.selectedrowData);
    this.createRowData(this.paginate.current_page);
  }
}
