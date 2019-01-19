import { Injectable } from '@angular/core';
import { AlertController, Events, Platform, PopoverController } from 'ionic-angular';
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push';
import { Storage } from '@ionic/storage';

import { UpdatePopover } from '../app/update.component';
import { MyToast } from './my-toast.service';


/**
 * CodePush封装
 */
@Injectable()
export class MyCodePush {

    constructor(
        private alertCtrl: AlertController,
        private events: Events,
        private platform: Platform,
        private popoverCtrl: PopoverController,
        private codePush: CodePush,
        private storage: Storage,

        private myToast: MyToast
    ) { }

    /**
     * 获取版本信息
     */
    public getVersion() {
        return {
            name: '2.3.1 v1',
            time: '2018.03.12'
        };
    }

    /**
     * 获取更新详情列表
     */
    public getDetailList() {
        return [{
            label: 'Initial',
            items: [
                '新增：保密要求页面',
                '改进：修改密码时判断密码强度',
            ]
        },
        {
            label: 'v1',
            items: [
                '修正：文件在线预览报错的bug'
            ]
        }];
    }

    /**
     * 是否显示更新
     */
    public shouldShowUpdate(): Promise<boolean> {
        return this.storage.get('showUpdate').then((data) => {
            if (data == 1) return true;
            else return false;
        });
    }

    /**
     * 设置显示更新
     * @param show 是否显示
     */
    public setShowUpdate(show: boolean) {
        if (show) this.storage.set('showUpdate', 1);
        else this.storage.set('showUpdate', 0);
    }

    /**
     * 发起热更新
     */
    public hotUpdate() {
        this.storage.get('channel').then((channel) => {
            if (channel == 'Disabled') return;

            let key: string;
            // 根据推送通道选择key
            if (channel == null || channel == 'Production') {
                if (this.platform.is('android')) key = 'boK3iAFoCfi4cHfBePspk0AuqXPv4ksvOXqog';
                else if (this.platform.is('ios')) key = 'ne7UDdrVb7pYe39tOQN6qTKJJhHA4ksvOXqog';

            } else if (channel == 'Staging') {
                if (this.platform.is('android')) key = 'Dgc4Uqal0Cbgsz9v7eGGEmZbvdE74ksvOXqog';
                else if (this.platform.is('ios')) key = 'Oyfs9aYfxSlh9OQOiUJQabND2DLA4ksvOXqog';
            }

            let options = {
                installMode: InstallMode.ON_NEXT_RESTART,
                deploymentKey: key
            };

            // 自动化同步
            this.codePush.sync(options, (data) => {
                // 捕获下载进度
                let progress = Math.ceil(data.receivedBytes / data.totalBytes * 100);
                this.events.publish('update:progress', progress);

            }).subscribe((status: SyncStatus) => {
                
                switch (status) {
                    // 下载中
                    case SyncStatus.DOWNLOADING_PACKAGE:
                        this.popoverCtrl.create(UpdatePopover).present();
                        break;

                    // 已安装
                    case SyncStatus.UPDATE_INSTALLED:
                        this.setShowUpdate(true);
                        this.myToast.show('更新安装成功，重启APP生效');
                        break;
                }
            });
        });
    }

    /**
     * 切换推送通道
     */
    public changeChannel() {
        this.storage.get('channel').then((channel) => {
            this.alertCtrl.create({
                title: 'CodePush Channel',
                inputs: [
                    {
                        // 正式通道
                        type: 'radio',
                        label: 'Production',
                        value: 'Production',
                        checked: channel == null || channel == 'Production'
                    },
                    {
                        // 测试通道
                        type: 'radio',
                        label: 'Staging',
                        value: 'Staging',
                        checked: channel == 'Staging'
                    },
                    {
                        // 禁用
                        type: 'radio',
                        label: 'Disabled',
                        value: 'Disabled',
                        checked: channel == 'Disabled'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    },
                    {
                        text: 'OK',
                        handler: (channel) => {
                            this.storage.set('channel', channel);
                        }
                    }
                ]
            }).present();
        });
    }
}