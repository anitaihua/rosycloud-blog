import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebApi } from '../../providers/web-api.service';
import { MyToast } from '../../providers/my-toast.service';
import { MyPage } from '../my/my';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private myToast: MyToast,private webApi:WebApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  _login(username: HTMLInputElement, password: HTMLInputElement){
    if (username.value.length == 0) {
      this.myToast.show("请输入账号");
  } else if (password.value.length == 0) {
    this.myToast.show("请输入密码");
  } else {
    this.webApi.login(username.value,password.value);
    this.navCtrl.push(MyPage);
  }

    
  }

}
