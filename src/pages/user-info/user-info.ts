import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserInfo } from '../../providers/user-info.service';
import { DomSanitizer } from '@angular/platform-browser';
import { WebApi } from '../../providers/web-api.service';

import { ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';





@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  private info: UserInfo;

  userLogo: any;
  backgroundImage: any;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userInfo: UserInfo,
    private sanitizer: DomSanitizer,
    private webApi: WebApi,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private events: Events
  ) {
    this.info = this.userInfo;
    this.userLogo = this.sanitizer.bypassSecurityTrustUrl(this.webApi.FILESERVE_HOST + this.info.profilePhoto);
    this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl(this.webApi.FILESERVE_HOST + this.info.backgroundPhoto);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }
  /**
   * 更换头像
   */
  changeProfilePhoto() {
    this.addImage('logo');
  }
  /**
   * 变更昵称
   */
  changeNickName() {

  }
  /**
   * 变更简介
   */
  changeIntroduction() {
    //this.navCtrl.push();
  }
  /**
   * 更换背景图
   */
  changeBackgroundPhoto() {

    this.addImage('background');

  }



  /**
     * 添加图片
     */
  public addImage(type:string) {
    this.actionSheetCtrl.create({
      title: '添加图片',
      buttons: [
        {
          icon: 'image',
          text: '相册',
          handler: () => {
            this.getPicture(0,type);
          }
        },
        {
          icon: 'camera',
          text: '拍照',
          handler: () => {
            this.getPicture(1,type);
          }
        },
        {
          icon: 'md-close',
          text: '取消',
          role: 'cancel'
        }
      ]
    }).present();

  }

  /**
   * 获取图片（base64）
   * @param type 来源类型
   */
  private getPicture(type: number,outType:string) {
    let options = {
      sourceType: type,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    // 调用原生接口
    this.camera.getPicture(options).then((data) => {

      this.webApi.uploadFile(data).then((response)=>{
        if(response.meta.success){
          if(outType == 'logo'){
            this.userLogo = this.sanitizer.bypassSecurityTrustResourceUrl(this.webApi.FILESERVE_HOST +response.data.fileId);
            this.webApi.editUserLogo(response.data.fileId).then(()=>{
              this.events.publish('user:refresh');
            });
          }else if(outType == 'background'){
            this.backgroundImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.webApi.FILESERVE_HOST +response.data.fileId);
            this.webApi.editUserBackgroundPhoto(response.data.fileId).then(()=>{
              this.events.publish('user:refresh');
            });
          }
        }
      });

    }, (error) => {
      console.log(error);
    });
  }

}
