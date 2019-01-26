import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoIntroductionPage } from './user-info-introduction';

@NgModule({
  declarations: [
    UserInfoIntroductionPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInfoIntroductionPage),
  ],
})
export class UserInfoIntroductionPageModule {}
