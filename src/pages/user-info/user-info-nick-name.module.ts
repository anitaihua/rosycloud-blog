import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoNickNamePage } from './user-info-nick-name';

@NgModule({
  declarations: [
    UserInfoNickNamePage,
  ],
  imports: [
    IonicPageModule.forChild(UserInfoNickNamePage),
  ],
})
export class UserInfoNickNamePageModule {}
