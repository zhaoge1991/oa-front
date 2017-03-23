import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/merge'
@Injectable()
export class AlertService{

  private messageSource = new Subject();
  message$ = this.messageSource.asObservable();

  private eventSource = new Subject();
  event$ = this.eventSource.asObservable();

  putMessage(message:any){
    this.messageSource.next(message);
    return this.event$;
  }

  putEvent(event:boolean){
    return this.eventSource.next(event);
  }


}
