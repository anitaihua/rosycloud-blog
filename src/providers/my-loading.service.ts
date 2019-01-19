import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

/**
 * 加载框封装
 */
@Injectable()
export class MyLoading {

    private loading: Loading;

    public constructor(
        private loadingCtrl: LoadingController
    ) { }

    /**
     * 显示加载框
     * @param content 提示信息
     */
    public show(content?: string) {
        this.loading = this.loadingCtrl.create({
            content: content || '加载中...',
            duration: 10000
        });
        this.loading.present();
    }

    /**
     * 隐藏加载框
     */
    public hide() {
        this.loading.dismiss();
    }
}