import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,App } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { MyPage } from '../my/my';
import { WebApi } from '../../providers/web-api.service';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  items:any;

  logOutItem = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage,private webApi:WebApi,private events:Events,private appCtrl:App) {

    this.items = [{id:1,name:'消息设置'},{id:2,name:'意见反馈'},{id:3,name:'评分'},{id:4,name:'清理缓存',nums:'16.1M'},{id:5,name:'关于',nums:'V2.3.2'}];

    this.storage.get('isLogin').then((value)=>{ 
      if(value){
        this.logOutItem = value;
      }
     })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logOut(){
    this.webApi.logout().then(()=>{
      this.events.publish('user:refresh');
      this.navCtrl.push(MyPage);
    });
    
  }

}
