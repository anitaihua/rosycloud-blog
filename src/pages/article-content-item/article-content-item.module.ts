import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleContentItemPage } from './article-content-item';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
  declarations: [
    ArticleContentItemPage,
  ],
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    IonicPageModule.forChild(ArticleContentItemPage),
  ],
})
export class ArticleContentItemPageModule {}
