import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject'

@Injectable()
export class MessageService{

  private messageSource = new Subject();

  message$ = this.messageSource.asObservable();

  putMessage(message:any){
    this.messageSource.next(message);
  }
}
