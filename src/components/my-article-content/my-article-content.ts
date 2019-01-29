import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ArticleContentItemPage } from '../../pages/article-content-item/article-content-item';
import { WebApi } from '../../providers/web-api.service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the MyArticleContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-article-content',
  templateUrl: 'my-article-content.html'
})
export class MyArticleContentComponent {

  articleContents = [
    {type:'video',url:this.sanitizer.bypassSecurityTrustResourceUrl(this.webApi.FILESERVE_HOST +'group1/M00/00/00/rBHP-FxQUKuATUccABEVbHcFZvQ820.mp4')},
    {type:'image',url:this.sanitizer.bypassSecurityTrustResourceUrl(this.webApi.FILESERVE_HOST +'group1/M00/00/00/rBHP-FxQUKOAGNEFAAwBsQBB80E265.jpg')}
  ];

  constructor(
    private navCtrl: NavController,
     private camera: Camera,
     private webApi:WebApi,
     private sanitizer: DomSanitizer
     ) {
    console.log('Hello MyArticleContentComponent Component');
  }

  removeArticleContent(index:number){

    this.articleContents.splice(index,1);

  }

  editArticleContentItem(articleContent:any){
    this.navCtrl.push(ArticleContentItemPage,articleContent);
  }

  addArticleContentItemByText(index:number){

    let data: Object = {
      type:'text',
      callback: data => {
        if(index>=0){
          this.articleContents.splice(index+1,0,data);
        }else{
          this.articleContents.unshift(data);
        }
      }
    };
    this.navCtrl.push(ArticleContentItemPage,data);
  }

  addArticleContentItemByImageOrVideo(index:number){
    this.getPicture(index);
  }

    /**
     * 获取图片（FILE_URI）
     */
    private getPicture(index:number) {
      let options = {
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          targetHeight:536,
          targetWidth:1122,
          correctOrientation: false,
          mediaType: this.camera.MediaType.ALLMEDIA
      };

      // 调用原生接口
      this.camera.getPicture(options).then((camerData) => {
        let type = this.getFileExt(camerData);
        this.webApi.uploadFile(camerData).then((response)=>{
          if(response.meta.success){
            let data = {
              type:type,
              url:this.sanitizer.bypassSecurityTrustResourceUrl(this.webApi.FILESERVE_HOST +response.data.fileId)
            };
            if(index>=0){
              this.articleContents.splice(index+1,0,data);
            }else{
              this.articleContents.unshift(data);
            }
          }
        });
      }, (error) => {
          console.log(error);
       });
  }

  private getFileExt(filePath:string){
    var extPoint = filePath.lastIndexOf(".");
    var ext = filePath.substring(extPoint + 1, filePath.length).toLowerCase();
    if(/(3gp|mp4|avi)$/.test(ext)){
      return 'video';
    }else if(/(gif|jpg|jpeg|png)$/.test(ext)){
      return 'image';
    }else{
      return '';
    }
  }

}
