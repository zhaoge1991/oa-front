import { Directive, ElementRef, Input,OnInit } from '@angular/core';

@Directive({
  selector: '[annexeicon]'
})

export class AnnexeIconDirective implements OnInit{

  @Input('annexeicon') iconname: string;

  constructor(private el: ElementRef) {}

  ngOnInit(){
    this.seticon();
  }

  seticon(){
    let element = this.el.nativeElement;
    let _class = element.className;
    switch (this.iconname){
      case 'csv':
        element.className = _class + ' icon-csv';
        break
      case 'eps':
        element.className = _class + ' icon-eps';
        break
      case 'excel':
        element.className = _class + ' icon-excel';
        break
      case 'flash':
        element.className = _class + ' icon-flash';
        break
      case 'exe':
        element.className = _class + ' icon-exe';
        break
      case 'html':
        element.className = _class + ' icon-html';
        break
      case 'jpg':
      case 'png':
      case 'gif':
        element.className = _class + ' icon-image';
        break
      case 'keynote':
        element.className = _class + ' icon-keynote';
        break
      case 'mp4':
        element.className = _class + ' icon-mp';
        break
      case 'pack':
        element.className = _class + ' icon-pack';
        break
      case 'pages':
        element.className = _class + ' icon-pages';
        break
      case 'pdf':
        element.className = _class + ' icon-pdf';
        break
      case 'ppt':
        element.className = _class + ' icon-ppt';
        break
      case 'psd':
        element.className = _class + ' icon-psd';
        break
      case 'rtf':
        element.className = _class + ' icon-rtf';
        break
      case 'video':
        element.className = _class + ' icon-video';
        break
      case 'txt':
        element.className = _class + ' icon-txt';
        break
      case 'word':
      case 'docx':
        element.className = _class + ' icon-word';
        break
      case 'zip':
        element.className = _class + ' icon-zip';
        break
      case 'xml':
        element.className = _class + ' icon-xml';
        break
      default: element.className = _class + ' icon-unknown';

    }
  }
}
