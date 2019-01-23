import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { WebApi } from '../../providers/web-api.service'

/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  private userLogo:any;
  private backgroundImage:any;

  items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private webApi:WebApi,private sanitizer:DomSanitizer) {
    this.userLogo = this.webApi.FILESERVE_HOST+'group1/M00/00/00/rBHP-FxIcd-AY53XAACuKxJKzEI702.jpg';
    
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle('url('+this.webApi.FILESERVE_HOST+'group1/M00/00/00/rBHP-FxIcd-AY53XAACuKxJKzEI702.jpg)');

    this.items = [{name:'公开博文',nums:1},{name:'私密博文',nums:0},{name:'我的主题',nums:0},{name:'草稿箱',nums:2},{name:'收藏夹',nums:100}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }

}
