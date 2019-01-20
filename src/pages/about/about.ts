import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  //信息类型
  private infoType = 'recommend';

  constructor(public navCtrl: NavController) {

  }

}
