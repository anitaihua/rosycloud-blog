import { Component,Input  } from '@angular/core';


@Component({
  selector: 'img-lazy-load',
  template: '<img src="{{default}}" alt="">'
})
export class ImgLazyLoadComponent {

  default: string = 'assets/images/default.png';

  @Input() src: string; //要显示的图片

  constructor() {

  }

  ngOnInit() {
    let img = new Image();
    img.src = this.src;
    img.onload = () => {
      this.default = this.src;
    }
  }
}
