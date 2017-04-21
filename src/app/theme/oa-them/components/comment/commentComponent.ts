import {Component,OnInit,Input,EventEmitter,Output,ViewChild,OnChanges} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/index";

import {Comment} from "../../../../models/common/comment";
@Component({
  selector: 'comment-component',
  templateUrl: './commentComponent.html',
  styleUrls: ['./commentComponent.scss']
})

export class CommentComponent implements OnInit{
  @Input() commonents: Comment[];
  @Input() parent:{name:string,id:number};
  @Output() commentChange = new EventEmitter();
  @Output() newcommentChange = new EventEmitter();
  constructor(){}

  public newcomment:any = {}; //新评论
  public comment = {comment_id: null,content: ''}//新回复
  setting = {initialFrameHeight: 230,zIndex: 1060};  //编辑器高度

  ngOnInit(){
    this.newcomment[this.parent.name] = this.parent.id;
    this.newcomment.content = '';
  }

  //显示按钮
  @ViewChild('checkdialog') checkModal: ModalDirective;
  replayclick(e){
    this.comment.comment_id = e;
    this.checkModal.show();
  }

  //发送回复
  postReplay(){
    this.commentChange.emit(this.comment);
    this.comment.content = '';
    this.checkModal.hide();
  }

  //发送评论
  postComment(){
    this.newcommentChange.emit(this.newcomment);
    this.newcomment.content = '';
  }
}
