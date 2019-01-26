import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { MyToast } from '../../providers/my-toast.service';
import { WebApi } from '../../providers/web-api.service';


@IonicPage()
@Component({
  selector: 'page-user-info-nick-name',
  templateUrl: 'user-info-nick-name.html',
})
export class UserInfoNickNamePage {

  nickName:string;

  readyText:string;

  saveStatus = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myToast: MyToast,
    private webApi: WebApi,
    private events: Events
  ) {
    this.nickName = this.navParams.data;
    this.readyText = this.navParams.data;
    if(this.navParams.data&&this.navParams.data.length>0){
      this.saveStatus = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoNickNamePage');
  }

 //监听事件
  onChangeText(value:string){

    if(value.length == 0){
      this.saveStatus = true;
    }
    if(value.length > 30){
      this.myToast.show('不能超过30个汉字');
   }
  }

  save(){
    if(this.readyText.length < 4){
      this.myToast.show('昵称至少4个字符,请重新输入');
      return;
    }
    this.webApi.editUserNickName(this.readyText).then((data)=>{
      if(data.meta.success){
        this.myToast.show('昵称保存成功');
        this.events.publish('user:refresh');
        this.navCtrl.pop();
      }else{
        this.myToast.show('昵称保存失败');
      }
    },(err)=>{
      this.myToast.show('昵称保存失败');
    });
  }

}
