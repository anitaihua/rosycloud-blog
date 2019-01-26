import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { MyToast } from '../../providers/my-toast.service';
import { WebApi } from '../../providers/web-api.service';
import { MyAlert } from '../../providers/my-alert.service';


@IonicPage()
@Component({
  selector: 'page-user-info-introduction',
  templateUrl: 'user-info-introduction.html',
})
export class UserInfoIntroductionPage {

  @ViewChild(Navbar) navBar: Navbar;

  introduction:string;

  readyText:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myToast: MyToast,
    private myAlert: MyAlert,
    private webApi: WebApi,
    private events: Events
  ) {
    this.introduction = this.navParams.data;
    this.readyText = this.navParams.data;
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
  }

  backButtonClick = (e: UIEvent) => {

    if(this.readyText.length>0 && this.introduction.length >0 && this.introduction != this.readyText){
      this.myAlert.showConfirms('是否保存修改内容?',()=>{
        this.navCtrl.pop();
      },()=>{
        this.save();
      });
    }else{
      this.navCtrl.pop();
    }
    
}
 //监听事件
  onChangeText(value:string){

    if(value.length == 0){
        this.myToast.show('简介不能为空');
    }
    if(value.length > 100){
      this.myToast.show('不能超过100个汉字');
   }
  }

  save(){
    if(this.readyText.length == 0){
      this.myToast.show('简介不能为空');
      return;
    }
    this.webApi.editUserIntroduction(this.readyText).then((data)=>{
      if(data.meta.success){
        this.myToast.show('简介保存成功');
        this.events.publish('user:refresh');
        this.navCtrl.pop();
      }else{
        this.myToast.show('简介保存失败');
      }
    },(err)=>{
      this.myToast.show('简介保存失败');
    });
  }

}
