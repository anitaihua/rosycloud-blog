import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

import { MyToast } from './my-toast.service';
import { UserInfo } from './user-info.service';

/**
 * 网络接口集合
 */
@Injectable()
export class WebApi {

    // 域名地址
    private API_HOST = 'http://127.0.0.1:9101/';

    public FILESERVE_HOST = 'http://47.94.2.176/';

    // 请求头
    private headers: Headers;

    public constructor(
        private http: Http,
        private events: Events,
        private storage: Storage,
        private myToast: MyToast,
        private userInfo: UserInfo
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
    private get(path: string,paramObj: any) {
        let promise = this.http
            .get(this.API_HOST + path+ this.toQueryString(paramObj), new RequestOptions({ headers: this.headers }))
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
            // 正确：转为json
            if(response.json().meta.success){
                return response.json();
            }else{
                // 601错误：token过期
                if (response.json().meta.errorCode == 601) {
                    this.events.publish('token:expired');
                    if (this.userInfo.token != '') this.myToast.show('登陆状态过期');
                }else{
                    this.myToast.show(response.json().meta.message);
                }

                throw response;
            }
            

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

            return this.get('users/userinfo','').then((data) => {
                this.userInfo.setExtra(data);
            });
        });
    }

    /**
     * 登陆
     */
    public login(userName: string, password: string) {
        return this.post('tokens', { 'username': userName, 'password': password, 'uuid': this.userInfo.uuid })
            .then((data) => {
                if (!data.meta.success) throw data.meta.message;

                // 写入本地存储
                this.storage.set('token', data.data.token);
                this.storage.set('uuid', this.userInfo.uuid);
                this.userInfo.token = data.data.token;
                this.userInfo.setExtra(data.data.userInfo);

                // 生成请求头
                this.headers = new Headers({ 'X-Token': this.userInfo.token, 'uuid': this.userInfo.uuid });
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
        return this.post('log/list', { 'page': page, 'limit': limit, 'type': noticeType });
    }
    public getArticleList(page: number, limit: number){
        return this.post('articles/list', { 'page': page, 'limit': limit });
    }
    public getInfoList(page: number, limit: number){
        return this.post('articles/list', { 'page': page, 'limit': limit });
    }
    public getUserInfoOnline() {
        return this.get('users/userinfo','');
    }
}