import { MyLoading } from '../../providers/my-loading.service';

/**
 * 列表逻辑封装
 */
export abstract class BaseListPage {

    // 列表数组
    protected list: Array<any>;
    // 当前页数
    protected page: number;
    //每页显示数
    protected limit: number = 7;
    // 是否加载更多
    protected hasMore: boolean;

    protected constructor(
        protected myLoading: MyLoading
    ) { }

    /**
     * 拉取新数据（首次）
     */
    protected pullNewList() {
        this.page = 1;
        this.hasMore = true;

        this.myLoading.show();
        this.pullList().then(() => {
            this.myLoading.hide();

        }, (error) => {
            this.myLoading.hide();
        });
    }

    /**
     * 拉取数据（过程）
     */
    private pullList(): Promise<any> {
        return this.pullListImpl().then((data) => {
            if (!data.meta.success) throw (new Error(data.meta.message));

            if (this.page == 1) this.list = data.data.rows;
            else this.list = this.list.concat(data.data.rows);

            if (Math.ceil(data.data.total/this.limit) == this.page) this.hasMore = false;
            else this.page += 1;

            
        });
    }

    /**
     * 拉取数据的具体实现，由子类提供接口地址
     */
    protected abstract pullListImpl(): Promise<any>;

    /**
     * 下拉刷新
     * @param refresher 加载动画
     */
    private onRefresh(refresher) {
        this.page = 1;
        this.hasMore = true;

        this.onInfinite(refresher);
    }

    /**
     * 上拉加载
     * @param refresher 加载动画
     */
    private onInfinite(refresher) {
        this.pullList().then(() => {
            refresher.complete();

        }, (error) => {
            refresher.complete();
        });
    }
}