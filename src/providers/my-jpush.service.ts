import { Injectable } from '@angular/core';
import { JPush } from '@jiguang-ionic/jpush';
import { Platform } from 'ionic-angular';
import {Observable} from "rxjs/Observable";

/**
 * 极光推送服务
 */
@Injectable()
export class JpushProvider {

  constructor( public jpush: JPush,public pla:Platform) {
    jpush.init();
    jpush.setDebugMode(true);
  }

  /**
   * 监听点击推送信息
   */
  openNotification(): Observable<any>{
    return new Observable(observer => {
      document.addEventListener('jpush.openNotification', (event: any) => {
        observer.next(event);  
      })
    });
    
  }

  /**
   * 监听收到推送消息
   */
  receiveNotification(): Observable<any>{
    let content;
    return new Observable(observer => {
      document.addEventListener('jpush.receiveNotification', (event: any) => {
        if (this.pla.is("android")) {
          content = event.alert;
        } else { 
          content = event.aps.alert;
        }  
        this.jpush.setBadge(0);
        this.jpush.setApplicationIconBadgeNumber(0);
      }, false);
      observer.next(content);
    });
  }

 /**
  * 本地推送
  * @param content 添加推送消息
  * @param title 
  * @param extras 自定义的参数
  */
  addLocalNotification(content:string,title:string,extras?: any){
    if (this.pla.is("android")) {
      console.log("extras:"+extras)
      this.jpush.addLocalNotification(0, content, title, 1, 5000,"123");
    } else {
      this.jpush.addLocalNotificationForIOS(5, content, 1, title, extras);
    }
  }
  
}