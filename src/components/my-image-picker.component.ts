import { Component, Input } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';


/**
 * 图片选择器
 */
@Component({
    selector: 'my-image-picker',
    template: `
        <ion-item>
            {{label}}
            <div>
                <img class="image-item" *ngFor="let image of images; let i=index" [src]="image" (click)="handleImage(i)">
                <div class="image-item" style="border: 1px solid grey;" (click)="addImage()">
                    <ion-icon ios="ios-add" md="ios-add" style="color: grey; font-size: 70px; margin-left: 16px;"></ion-icon>
                </div>
            </div>
        </ion-item>
    `,
    styles: [`
        .image-item {
            float: left;
            width: 70px;
            height: 70px;
            margin: 7px 7px 0px 0px;
        }
    `]
})
export class MyImagePickerComponent {

    // 文字标签
    @Input() label = '插入图片';
    

    // 所选图片数组
    private images = [];

    constructor(
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private photoViewer: PhotoViewer
    ) { }

    /**
     * 处理图片
     * @param index 索引
     */
    private handleImage(index: number) {
        this.actionSheetCtrl.create({
            title: '处理图片',
            buttons: [
                {
                    icon: 'eye',
                    text: '查看',
                    handler: () => {
                        this.photoViewer.show(this.images[index]);
                    }
                },
                {
                    icon: 'trash',
                    role: 'destructive',
                    text: '删除',
                    handler: () => {
                        this.images.splice(index, 1);
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
     * 添加图片
     */
    private addImage() {
        this.actionSheetCtrl.create({
            title: '添加图片',
            buttons: [
                {
                    icon: 'image',
                    text: '相册',
                    handler: () => {
                        this.getPicture(0);
                    }
                },
                {
                    icon: 'camera',
                    text: '拍照',
                    handler: () => {
                        this.getPicture(1);
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
    private getPicture(type: number) {
        let options = {
            destinationType: 0,
            sourceType: type,
            allowEdit: true,
            correctOrientation: true
        };

        // 调用原生接口
        this.camera.getPicture(options).then((data) => {
            this.images.push('data:image/jpeg;base64,' + data);
        }, (error) => {
            console.log(error);
         });
    }

    /**
     * 获取所选图片列表
     */
    public getImageList() {
        return this.images;
    }
}