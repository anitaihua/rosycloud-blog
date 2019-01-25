import { Injectable } from '@angular/core';

/**
 * 用户信息集合
 */
@Injectable()
export class UserInfo {


    public token: string;
    public uuid: string;
    
    
    public userId: number;
    public userName: string;
    public nickName: string = '登陆/注册';
    public realName: string;
    public email: string;
    public telephoneNumber: string;
    public profilePhoto: string;
    public backgroundPhoto: string;
    public introduction: string = '暂无简介';
    public level: string;
    public birthday: Date;

    /**
     * 设置用户详情
     * @param data 详情信息
     */
    public setExtra(data: any) {
        this.email = data.email;
        this.profilePhoto = data.profilePhoto;
        this.telephoneNumber = data.telephoneNumber;
        this.nickName = data.nickName;
        this.realName = data.realName;
        this.userId = data.userId;
        this.userName = data.userName;

        this.backgroundPhoto = data.backgroundPhoto;
        this.introduction = data.introduction;
        this.level = data.level;
        this.birthday = data.birthday;
    }

    /**
     * 清空用户信息
     */
    public clear() {
        this.token = '';
        this.uuid = '';
        this.setExtra({nickName: '登陆/注册',introduction: '暂无简介'});
    }
}