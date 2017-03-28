import {Component,Input,Output,ViewEncapsulation,EventEmitter} from '@angular/core';
import {CalenderService} from "./calender.service";

@Component({
  selector: 'ng-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.scss'],
  providers: [CalenderService]
})

export class CalenderComponent{

  public results
  public currentDate
  public currentYear
  public currentMonth
  public currentDay
  public selectedIndex
  public isSelected:boolean
  public selectedDate
  public showCalender:boolean = false
  @Input() placeholder = '默认提示文本';
  @Input() disabled;
  @Input() value;
  @Output() valueChange = new EventEmitter();
  @Input() name

  public monthArr = [{zn:'一月',en:1},{zn:'二月',en:2},{zn:'三月',en:3},{zn:'四月',en:4},{zn:'五月',en:5},{zn:'六月',en:6},{zn:'七月',en:7},{zn:'八月',en:8},{zn:'九月',en:9},{zn:'十月',en:10},{zn:'十一月',en:11},{zn:'十二月',en:12}];
  public yearArr = [];

  constructor(private utils: CalenderService) {
    for(let i=1949;i<2050;i++){
      this.yearArr.push(i);
    }
  }

  /**
   *渲染日历方法
   * @param dateTime 显示日期
   */
  private init(dateTime?:string){
    let date: Date, year, month, day;

    //没有传入日期则显示系统日期
    if (dateTime) {
      date = new Date(dateTime);
      [year, month, day] = dateTime.split('-');
      this.selectedIndex = +day;
      this.currentYear = year;
      this.currentMonth = month;
    } else {
      date = new Date();
      this.currentYear = year = date.getFullYear();
      this.currentMonth = month = date.getMonth() + 1;
    }

    //系统日期常量
    const _year = new Date().getFullYear();
    const _month = new Date().getMonth() + 1;
    const _day = new Date().getDate();

    this.currentDate = `${year}-${month}`;
    const weekLength = 7;

    //获取显示月的天数
    let monthSize = this.utils.getMonthSize(`${year}/${month}/1`);
    //获取上一个月的天数
    let prevMonthSize: number;
    if(month == 1){
      prevMonthSize = this.utils.getMonthSize(`${year-1}/12/1`)
    } else {
      prevMonthSize = this.utils.getMonthSize(`${year}/${month-1}/1`)
    }
    //获取显示月第一天星期几
    const firstDay = this.utils.getFirstDay(year,month-1);
    //显示区的行数
    let lines = Math.ceil((firstDay+monthSize)/weekLength);
    //显示区上一个月的开始日期
    let initPrevDay = prevMonthSize - firstDay + 1;
    //显示区日期数组
    let _m = new Array(lines*weekLength);
    //结果数组
    this.results = new Array(lines);

    //创建显示页每一天的日期对象
    for(let i=0;i<_m.length;i++){
      if(i<firstDay){
        _m[i] = {
          isCurMonth: false,
          date: initPrevDay++,
          isCurDay: false
        }
      } else if(i>=(firstDay+monthSize)){
        _m[i] = {
          isCurMonth: false,
          date: i - monthSize - firstDay + 1,
          isCurDay: false
        }
      } else {
        if(i - firstDay + 1 === _day && +year === _year && +month === _month){
          _m[i] = {
            date: i - firstDay + 1,
            isCurMonth: true,
            isCurDay: true
          }
        } else {
          _m[i] = {
            date: i - firstDay + 1,
            isCurMonth: true,
            isCurDay: false
          }
        }
      }
    }

    //将日期对象按星期分为结果数组对象
    for(let i=0;i<lines;i++){
      this.results[i] = [];
      for(let j=0;j<weekLength;j++){
        let index = j + i*weekLength;
        this.results[i][j] = _m[index];
      }
    }

  }

  //选中日期
  public onSelect(days:number,isCurMonth: boolean): void{
    if(!isCurMonth) return;
    this.selectedIndex = days;
    this.selectedDate = this.currentDate+'-'+days;
    this.isSelected = true;
    this.valueChange.emit(this.selectedDate);
    setTimeout(()=>this.showCalender= false,100);
  }

  //增加、减少月份
  public tabMonth(val: number): void{
    this.selectedIndex = 0;
    let [year, month] = this.currentDate.split('-');
    if(month == 1&&val == -1){
      year = +year + val;
      month = 12;
    } else if(month == 12&&val == 1){
      year = +year + val;
      month = 1;
    } else {
      month = +month + val;
    }
    this.currentDate = `${year}-${month}`;
    this.currentYear = year;
    this.currentMonth = month;
    this.init(this.currentDate);
  }

  //禁止输入框输入
  public disableInput($event){
    //按下删除键清空选中日期
    if($event.keyCode === 8){
      $event.target.value = '';
      this.selectedDate = '';
      this.selectedIndex = '';
      this.isSelected = false;
    } else {
      //禁用其他按键
      return false;
    }
  }

  //年和月选择框改变
  public monthChange($event){
    this.currentMonth = $event.target.value;
    this.selectedIndex = '';
    this.init(this.currentYear+'-'+this.currentMonth);
  }
  public yearChange($event){
    this.currentYear = $event.target.value;
    this.selectedIndex = '';
    this.init(this.currentYear+'-'+this.currentMonth);
  }

  //回到今天
  public gotoToday(){
    this.selectedIndex = '';
    const _year = new Date().getFullYear();
    const _month = new Date().getMonth();
    if(this.currentYear == _year && this.currentMonth == _month) return true;
    this.init();
  }

  //显示、隐藏日历面板
  public showcalender($event){
    let val = $event.target.value;
    if(val.match(/^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}$/)){
      this.init(val);
    } else {
      this.init();
    }
    this.showCalender = true;
  }
  public closeCalender(){
    this.selectedIndex = '';
    setTimeout(()=>this.showCalender= false,100);
  }
}
