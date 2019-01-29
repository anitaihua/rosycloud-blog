import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


import { MyToast } from './my-toast.service';
import { UserInfo } from './user-info.service';


/**
 * 网络接口集合
 */
@Injectable()
export class WebApi {


    // 域名地址
    private API_HOST = 'http://10.10.10.121:9101/';

    public FILESERVE_HOST = 'http://47.94.2.176/';

    // 请求头
    private headers: Headers;

    public constructor(
        private http: Http,
        private events: Events,
        private storage: Storage,
        private myToast: MyToast,
        private userInfo: UserInfo,
        private transfer: FileTransfer
    ) { }

    /**
     * put方法
     * @param path 请求路径
     */
    private put(path: string, body: any) {
        let promise = this.http
            .put(this.API_HOST + path, body, new RequestOptions({ headers: this.headers }))
            .toPromise();
        return this.handleResult(promise);
    }
    /**
     * delete方法
     * @param path 请求路径
     */
    private delete(path: string) {
        let promise = this.http
            .delete(this.API_HOST + path, new RequestOptions({ headers: this.headers }))
            .toPromise();

        return this.handleResult(promise);
    }
    /**
     * get方法
     * @param path 请求路径
     */
    private get(path: string, paramObj: any) {
        let promise = this.http
            .get(this.API_HOST + path + this.toQueryString(paramObj), new RequestOptions({ headers: this.headers }))
            .toPromise();

        return this.handleResult(promise);
    }

    /**
     * post方法
     * @param path 请求路径
     * @param body 请求体
     */
    private post(path: string, body: any) {
        let promise = this.http
            .post(this.API_HOST + path, body, new RequestOptions({ headers: this.headers }))
            .toPromise();

        return this.handleResult(promise);
    }

    /**
     * 处理网络响应结果
     * @param promise 异步响应结果
     */
    private handleResult(promise: Promise<Response>) {
        return promise.then((response: Response) => {
            //不成功
            if (!response.json().meta.success) {
                // 601错误：token过期
                console.log('errorCode:' + response.json().meta.errorCode);
                if (response.json().meta.errorCode == 601) {
                    response.status = 601;
                    this.events.publish('token:expired', response.url);
                    if (this.userInfo.token == null || this.userInfo.token == '') {
                        //当请求为获取用户信息时，不提示
                        if (this.getUserListUrl() != response.url) {
                            this.myToast.show('请登陆');
                        }
                    } else {
                        this.myToast.show('登陆状态过期');
                        //清除缓存token信息
                        this.storage.remove('token');
                        this.storage.remove('uuid');
                        this.userInfo.clear();
                    }
                } else if (response.json().meta.errorCode == 602) {
                    response.status = 602;
                    this.myToast.show('用户名或密码错误');
                } else {
                    this.myToast.show(response.json().meta.message);
                }

            }
            return response.json();

        }, (error: Response) => {
            // 其它错误：网络错误
            this.myToast.show('网络错误');
            throw error;
        });
    }

    /**
    * @param obj　参数对象
    * @return {string}　参数字符串
    * @example
    *  声明: var obj= {'name':'zhangsan',sex:1};
    *  调用: toQueryString(obj);
    *  返回: "?name=zhangsan&age=1"
    */
    private toQueryString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor == Array) {//数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        let str = obj ? '?' + ret.join('&') : ""
        return str;

    }

    private toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }

    /**
     * 获取用户信息
     */
    public getStorageUserInfo() {
        // 读取本地存储
        this.storage.get('token').then((data) => {
            return data || '';
        });

    }

    /**
     * 获取用户信息
     */
    public getUserInfo() {
        // 读取本地存储
        let getToken = this.storage.get('token').then((data) => {
            this.userInfo.token = data || '';
        });

        let getUUID = this.storage.get('uuid').then((data) => {
            this.userInfo.uuid = data || '';
        });

        return Promise.all([getToken, getUUID]).then(() => {
            // 生成请求头
            this.headers = new Headers({ 'X-Token': this.userInfo.token, 'uuid': this.userInfo.uuid });

            return this.get('user/info', '').then((data) => {

                if (!data.meta.success) {
                    this.storage.set('isLogin', false);
                } else {
                    this.userInfo.setExtra(data.data);
                    this.storage.set('isLogin', true);
                }

            });
        });
    }

    /**
     * 登陆
     */
    public login(userName: string, password: string) {
        return this.post('tokens', { 'username': userName, 'password': password, 'uuid': this.userInfo.uuid })
            .then((data) => {
                if (data.meta.success) {
                    // 写入本地存储
                    this.storage.set('token', data.data.token);
                    this.storage.set('uuid', this.userInfo.uuid);
                    this.userInfo.token = data.data.token;


                    // 生成请求头
                    this.headers = new Headers({ 'X-Token': this.userInfo.token, 'uuid': this.userInfo.uuid });
                    this.get('user/info', '').then((data) => {
                        this.userInfo.setExtra(data.data);
                        this.events.publish('user:refresh');
                    });
                } else {
                    console.log('登陆失败');
                }
                return data.meta.success;

            });
    }

    /**
     * 注销
     */
    public logout() {
        this.storage.remove('token');
        this.storage.remove('uuid');
        this.userInfo.clear();
        return this.delete('tokens');
    }
   

    public getNoticeList(noticeType: string, page: number, limit: number) {
        this.events.publish('tabBadge:num',5);
        return this.post('log/list', { 'page': page, 'limit': limit, 'type': noticeType });
        
    }
    /**
     * 获取博文列表
     * @param page 
     * @param limit 
     */
    public getArticleList(page: number, limit: number) {
        return this.post('article/list', { 'page': page, 'limit': limit });
    }
    public getInfoList(page: number, limit: number) {
        return this.post('article/list', { 'page': page, 'limit': limit });
    }

    /**
     * 获取用户信息URL
     */
    public getUserListUrl() {
        return this.API_HOST + 'user/info';
    }

    /**
     * 修改用户头像
     * @param fileId 
     */
    public editUserLogo(fileId: string) {
        return this.post('user/updateLogo', fileId);
    }

    /**
     * 修改用户背景图片
     * @param fileId 
     */
    public editUserBackgroundPhoto(fileId: string) {
        return this.post('user/updateBackgroundPhoto', fileId);
    }

     /**
     * 修改用户昵称
     * @param nickName 
     */
    public editUserNickName(nickName: string) {
        return this.post('user/updateNickName', nickName);
    }

     /**
     * 修改用户简介
     * @param introduction 
     */
    public editUserIntroduction(introduction: string) {
        return this.post('user/updateIntroduction', introduction);
    }

    /**
     *  上传文件
     * @param fiePath 文件内部路径 
     */
    uploadFile(fiePath: string): any {
        //获取最后一个/的位置
        var site = fiePath.lastIndexOf("\/");
        //截取最后一个/后的值
        let fileName = fiePath.substring(site + 1, fiePath.length);

        const fileTransfer: FileTransferObject = this.transfer.create();
        // 更多的 Options 可以点进去自己看看，不懂的就谷歌翻译他的注释
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: fileName,  // 文件类型
            headers: this.headers,
            params: {}    // 如果要传参数，写这里

        }

        return new Promise((resolve, reject) => {
            fileTransfer.upload(fiePath, this.API_HOST+'system/uploadFile', options)
            .then((data) => {
                this.myToast.show('上传成功');
                resolve(JSON.parse(data['response']));
            }, (err) => {
                console.log(err);
                this.myToast.show('上传失败');
                reject(err);
            })
        });
        
    }

}