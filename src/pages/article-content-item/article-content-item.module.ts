import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleContentItemPage } from './article-content-item';

@NgModule({
  declarations: [
    ArticleContentItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleContentItemPage),
  ],
})
export class ArticleContentItemPageModule {}
