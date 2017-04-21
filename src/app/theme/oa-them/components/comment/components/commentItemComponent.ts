import {Component,Input,OnInit,Output,EventEmitter} from '@angular/core';
import {Comment} from "../../../../../models/common/comment";

@Component({
  selector: 'comment-item',
  templateUrl: './commentItemComponent.html',
  styleUrls: ['./commentItemComponent.scss']
})

export class CommentItemComponent implements OnInit{
  @Input() commentitem: Comment;
  @Output() replay = new EventEmitter();

  ngOnInit(){}

  replayclick(e){
    this.replay.emit(e);
  }
}
