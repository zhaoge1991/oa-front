import {Component,Input,Output,EventEmitter,ViewChild,ViewEncapsulation,OnInit} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {DepartmentService} from "../../../../services/department/department.service";
import {UserService} from "../../../../services/user/user.service";
import {Paginate} from "../../../../models/common/paginate";
import {User} from "../../../../models/user/user";
import {GridOptions} from 'ag-grid/main';

@Component({
  selector: 'user-select',
  templateUrl: './user_select.component.html',
  styleUrls: ['./user_select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DepartmentService,UserService]
})

export class UserSelectComponent implements OnInit{
  constructor(
    private departmentservice: DepartmentService,
    private userservice: UserService,
    private appconfigservice: AppconfigService
  ){
    this.selectedrow = <GridOptions>{};
  }

  private usernodes: any[] = []; //部门树列表
  private usersdata: any[];      //用户列表数据
  private paginate: Paginate;
  public selectedrow: GridOptions; //数据列表对象

  @Input()  userObj: User;    //传入单个用户对象
  @Input()  userArr: User[];  //传入用户对象数组

  @Output() userObjChange = new EventEmitter();
  @Output() userArrChange = new EventEmitter();

  @Output() productChange = new EventEmitter();

  public oldUserObjData;
  public oldUserArrData;
  ngOnInit(){
    //this.oldUserObjData = JSON.parse(JSON.stringify(this.userObj)); //保存原始数据
    //this.oldUserArrData = JSON.parse(JSON.stringify(this.oldUserArrData)); //保存原始数据
    this.getTrreNodes();
    this.init('',1,null);
  }

  //列表定义
  columnDefs = [
  {
    headerName: "序号", width: 50,suppressSorting: true,
    suppressMenu: true, pinned: true,
    cellRenderer: function (params) {
      return params.rowIndex+1
    }
  },
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
    pinned: true
  },
  {
    headerName: '用户名',
    field: 'name',
    width: 120,
    pinned: true
  },
  {
    headerName: '邮箱',
    field: 'email',
    width: 160,
    pinned: true
  }
]


  //弹出列表框
  @ViewChild('dialog') Modal: ModalDirective;
  show(){
    this.Modal.show();
  }

  hide(){
    this.Modal.hide();
    //this.userObj = this.oldUserObjData;
    //this.userArr = this.oldUserArrData;
  }

  //获取树列表
  getTrreNodes(){
    this.departmentservice.get().subscribe(data=>{
      this.departmentservice.getdataTrre(data,this.usernodes)
    })
  }
  customTemplateStringOptions = {
    isExpandedField: 'expanded',
    idField: 'uuid',
    actionMapping,
    allowDrag: false
  }

  //加载列表数据
  init(key:string,page:number,department: number){
    this.userservice.getlist(key,page,department).subscribe(data=>{
      this.usersdata = data;
    })
  }

  //选择分类
  private departmentObj: any;
  onchanged($event){
    this.searchtext = null;
    this.departmentObj = $event.node.data;
    this.init(this.searchtext,1,this.departmentObj.id);
  }

  //选择所有用户
  selectAll(){
    this.userservice.getlist('',1,null).subscribe(data=>{
      this.userArr = data;
    })
  }

  //选择部门、组
  selectDepartment(){
    let newUsers = this.userArr.concat(this.usersdata);
    this.userArr = this.filterUsers(newUsers);
  }

  //搜索
  private searchtext:string;
  search($event){
    this.departmentObj = null;
    this.searchtext = $event;
    this.init(this.searchtext,1,null)
  }

  //选中行更改
  onselectionChanged($event){
    if(this.selectedrow.api.getSelectedRows().length > 0){
      if(this.userObj){
        this.userObj = this.selectedrow.api.getSelectedRows()[0];
      } else if(this.userArr){
        let newUsers = this.userArr.concat(this.selectedrow.api.getSelectedRows());
        this.userArr = this.filterUsers(newUsers);
      }
    }
  }

  //选中用户去重
  filterUsers(users: any[]){
    let arr = [];
    let obj = {};
    for (let i=0;i<users.length;i++){
      if(!obj[users[i].id]){
        arr.push(users[i]);
        obj[users[i].id] = 1;
      }
    }
    return arr;
  }

  //删除选中
  deleteUserArr(index){
    this.userArr.splice(index, 1);
  }
  deleteUserobj(){
    this.userObj = null;
  }

  //确认添加
  adduser(){
    if(this.userObj){
      this.userObjChange.emit(this.userObj);
    } else if(this.userArr){
      this.userArrChange.emit(this.userArr);
    }
    this.Modal.hide();
  }

}


//文件树配置
const actionMapping:IActionMapping = {
  mouse: {
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    }
  }
};
