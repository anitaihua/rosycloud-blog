import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/**
 * Toast封装
 */
@Injectable()
export class MyToast {

    public constructor(
        private toastCtrl: ToastController
    ) { }

    /**
     * 显示Toast
     * @param msg 消息
     */
    public show(msg: string) {
        this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        }).present();
    }
}