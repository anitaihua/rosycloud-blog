
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Injectable()
export class MyAlert {

  constructor(private alertCtrl: AlertController) {

  }

  /**
   * 显示基本对话框
   * @param msg 消息
   * @param handler 回调函数
   */
  public showBasic(msg:string,handler?:any){
    this.alertCtrl.create({
      subTitle:msg,
      buttons:[
        {
          text:'确定',
          handler:handler
        }
      ]
    }).present();
  }

  /**
   * 显示确认对话框
   * @param msg 消息
   * @param handler 回调函数
   */
  public showConfirm(msg:string,handler:any){
    this.alertCtrl.create({
      title:'提示',
      subTitle:msg,
      buttons:[
        {
          text:'取消',
          role:'cancel'
        },
        {
          text:'确定',
          handler:handler
        }
      ]
    }).present();
  }

  /**
   * 显示确认对话框
   * @param msg 消息
   * @param handler 回调函数
   */
  public showConfirms(msg:string,cancelhandler:any,okhandler:any){
    this.alertCtrl.create({
      title:'提示',
      subTitle:msg,
      buttons:[
        {
          text:'取消',
          handler:cancelhandler
        },
        {
          text:'确定',
          handler:okhandler
        }
      ]
    }).present();
  }

}
