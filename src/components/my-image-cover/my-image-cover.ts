import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';


/**
 * Generated class for the MyImageCoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-image-cover',
  templateUrl: 'my-image-cover.html'
})
export class MyImageCoverComponent {


  // 所选图片数组
  private images = [];

  constructor(
    private camera: Camera
  ) { }

  /**
     * 获取图片（base64）
     * @param type 来源类型
     */
    private getPicture(type: number) {
      let options = {
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: type,
          allowEdit: true,
          targetHeight:536,
          targetWidth:1122,
          correctOrientation: false,
          mediaType: this.camera.MediaType.PICTURE
      };

      // 调用原生接口
      this.camera.getPicture(options).then((data) => {
          this.images = [];
          this.images.push('data:image/jpeg;base64,' + data);
      }, (error) => {
          console.log(error);
       });
  }

  /**
   * 获取所选图片
   */
  public getImage() {
    return this.images[0];
}

  /**
   * 获取所选图片列表
   */
  public getImageList() {
      return this.images;
  }

}
