import { Directive, ElementRef, Input,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';

@Directive({
  selector: '[moveModal]'
})

export class MoveModalDirective implements OnInit{
  element;
  clicks$: Observable<any>;
  mouseup$: Observable<any>;
  mousedown$: Observable<any>;
  mousemove$: Observable<any>;
  mousedrag$: Observable<any>;

  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement;
  }

  ngOnInit(){
    this.mouseup$ = Observable.fromEvent(this.element, 'mouseup');
    this.mousedown$ = Observable.fromEvent(this.element, 'mousedown');
    this.mousemove$ = Observable.fromEvent(document, 'mousemove');
    this.clicks$ = Observable.fromEvent(this.element, 'click');

    // 转换操作，鼠标按下事件发生的时候，将事件流转换成跟踪鼠标移动事件流
    this.mousedrag$ = this.mousedown$.flatMap(md =>{
      // 计算移动开始时候元素的位置
      let startX = this.element.getBoundingClientRect().left, startY = this.element.getBoundingClientRect().top;
console.log(startX,startY,'gfgf');
      // 真正的转换开始
      return this.mousemove$.map(mm => {
        mm.preventDefault();
        // 事件里面的值，即最后订阅者可以操作的数据
        return {
          left: mm.clientX - startX,
          top: mm.clientY - startY
        };
        // 直到鼠标抬起事件发生的时候整个事件流结束
      }).takeUntil(this.mouseup$);
    });

    this.mousedrag$.subscribe(d =>{
      console.log(11222,this.element.parentNode.style.top,d.top);
      this.element.parentNode.style.top = d.top + 'px';
      this.element.parentNode.style.left = d.left + 'px';
    })
  }

}
