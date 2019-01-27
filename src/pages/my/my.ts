import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WebApi } from '../../providers/web-api.service';
import { UserInfo } from '../../providers/user-info.service';

import { LoginPage } from '../login/login';
import { UserInfoPage } from '../user-info/user-info';
import { SettingPage } from '../setting/setting';
import { MyImagePickerComponent } from '../../components/my-image-picker.component';



@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  @ViewChild('myImagePickerComponent') myImagePickerComponent: MyImagePickerComponent;  

  userLogo = this.sanitizer.bypassSecurityTrustUrl('/assets/imgs/user-log.png');
  backgroundImage = this.sanitizer.bypassSecurityTrustStyle('url(/assets/imgs/user-bg.jpg)');

  items:any;

  userInfomation:UserInfo;

  applicationInterval:any; // 定时器


  constructor(public navCtrl: NavController, public navParams: NavParams,private webApi:WebApi,private sanitizer:DomSanitizer,private events: Events, private userInfo: UserInfo,private storage:Storage) {
    
    this.items = [{id:1,name:'公开博文'},{id:2,name:'私密博文'},{id:3,name:'我的主题'},{id:4,name:'草稿箱'},{id:5,name:'收藏夹'}];
    this.initUserInfo();
    
    events.subscribe('user:refresh', () => {
      this.initUserInfo();
    });

  }
  /**
   * 下拉刷新数据
   * @param refresher 
   */
  onRefresh(refresher){
    this.initUserInfo();
    refresher.complete();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }

  ionViewWillEnter(){

    console.log('ionViewWillEnter MyPage');
    
  }
  toUserLove(){
    console.log('function toUserLove()');
  }
  toUserFans(){
    console.log('function toUserFans()');
  }
  
  toUserInfo(){
    this.storage.get('isLogin').then((value)=>{ 
      if(value){
        this.navCtrl.push(UserInfoPage);
      }else{
        this.navCtrl.push(LoginPage); 
      }
     })
  }

  itemSelected(id){
    
    console.log(this.myImagePickerComponent.getImageList());

  }

  goSetting(){
    this.navCtrl.push(SettingPage);
  }
  

  initUserInfo(){

    this.webApi.getUserInfo();
    this.userInfomation = this.userInfo;

    this.storage.ready().then(() => {
      console.log('storage ready ');
    });

      this.applicationInterval = setInterval(() => {
        this.storage.get('isLogin').then((value)=>{
          if(value){
            this.items = [{id:1,name:'公开博文',nums:1},{id:2,name:'私密博文',nums:0},{id:3,name:'我的主题',nums:0},{id:4,name:'草稿箱',nums:2},{id:5,name:'收藏夹',nums:100}];
            this.userLogo = this.sanitizer.bypassSecurityTrustUrl(this.webApi.FILESERVE_HOST+this.userInfomation.profilePhoto);
            this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle('url('+this.webApi.FILESERVE_HOST+this.userInfomation.backgroundPhoto+')');
          } else {
            this.items = [{id:1,name:'公开博文'},{id:2,name:'私密博文'},{id:3,name:'我的主题'},{id:4,name:'草稿箱'},{id:5,name:'收藏夹'}];
            this.userLogo=this.sanitizer.bypassSecurityTrustUrl('/assets/imgs/user-log.png');
            this.backgroundImage=this.sanitizer.bypassSecurityTrustStyle('url(/assets/imgs/user-bg.jpg)');
          }
          clearInterval(this.applicationInterval);
      })
      }, 1000); 
  }

}
