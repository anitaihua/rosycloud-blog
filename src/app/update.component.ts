import { Events,ViewController } from 'ionic-angular';
import { Component,OnInit,OnChanges } from '@angular/core';


@Component({
    template: `<h1>下载中...{{progress}}%</h1>`
  })
  export class UpdatePopover implements OnChanges{

    public progress:number;

    constructor(private events: Events,private viewCtrl: ViewController) {
      this.setData();
    }

  
    /**
     * 设置数据
     */
    setData(){
      this.events.subscribe('update:progress',(progress)=>{
        UpdatePopover.prototype.progress = progress;
      });
    }
  
    /**
     * 数据变化
     */
    ngOnChanges() {
      if(this.progress == 100){
        this.viewCtrl.dismiss();
      }
    }
  

  
  }