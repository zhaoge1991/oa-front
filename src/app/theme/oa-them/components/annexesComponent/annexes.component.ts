import {Component,Input,ViewChild,OnChanges,Output,EventEmitter} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import { NgUploaderOptions } from 'ngx-uploader';
import {HttpInterceptorService,baseUrl} from "../../../../services/interceptor";
import {Headers} from'@angular/http';
import {MessageService} from "../../../../services/core/messageComponent.service";
import {AnneexesService} from "./annexes.service";

@Component({
  selector: 'annexes',
  templateUrl: './annexes.component.html',
  styleUrls: ['./annexes.component.scss'],
  providers: [AnneexesService]
})

export class AnnexesComponent implements OnChanges{
  @Input() data: any;
  @Input() idname: string;
  @Output() annexChange = new EventEmitter();

  constructor(private http: HttpInterceptorService,private messageservice: MessageService,private annexesservice:AnneexesService){}

  private actionConfig = {
    showbtn: {new:true,delete:true,download:true}
  }

  ngOnChanges(){
    this.selectedAnnexe = null;
  }
  //弹出列表框
  @ViewChild('dialog') Modal: ModalDirective;
  show(){
    console.log(this.data);
    this.Modal.show();
  }

  //上传文件
  uploadfile($event){
    this.annexesservice.upload($event,this.data[this.idname]).subscribe(data=>{
      this.data.annex.push(data);
      this.annexChange.emit();
    })
  }

  //选中文件
  private selectedAnnexe: any;
  selected(annexe){
    this.selectedAnnexe = annexe;
  }

  //删除文件
  delete(){
    if(this.selectedAnnexe){
      this.annexesservice.delete(this.selectedAnnexe.annex_id).subscribe(data=>{
        let index = this.data.annex.indexOf(this.selectedAnnexe);
        this.data.annex.splice(index,1);
        this.selectedAnnexe = null;
        this.annexChange.emit();
      })
    } else {
      alert('请选中文件');
    }
  }

  //下载文件
  download(){
    if(this.selectedAnnexe){
      window.location.href = baseUrl+'/api/common/annex/download/'+this.selectedAnnexe.annex_id+'?access_token='+JSON.parse(localStorage.getItem('currentUser')).access_token
    } else {
      alert('请选中文件');
    }
  }

  downloadFile(data){
    var blob = new Blob([data], { type: 'image/jpeg' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
