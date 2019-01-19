import { Injectable } from '@angular/core';

/**
 * 用户信息集合
 */
@Injectable()
export class UserInfo {

    public token: string;
    public uuid: string;

    public des: string;
    public email: string;
    public face: string;
    public mobile: string;
    public nickName: string;
    public officePhone: string;
    public realName: string;
    public userId: number;
    public userName: string;

    /**
     * 设置用户详情
     * @param data 详情信息
     */
    public setExtra(data: any) {
        this.des = data.des;
        this.email = data.email;
        this.face = data.face;
        this.mobile = data.mobile;
        this.nickName = data.nickName;
        this.officePhone = data.officePhone;
        this.realName = data.realName;
        this.userId = data.userId;
        this.userName = data.userName;
    }

    /**
     * 清空用户信息
     */
    public clear() {
        this.token = '';
        this.uuid = '';
        this.setExtra({});
    }
}