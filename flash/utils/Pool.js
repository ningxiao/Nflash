/**
 * canvas框架对象回收池,减少对象的创建尽量利用已经创建对象
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:12
 * To change this template use File | Settings | File Templates.
 */
flash.utils.provide("flash.Pool");
flash.Pool.depot = {};
/**
 * 添加死囚对象进入监狱
 */
flash.Pool.addPool = function () {
    var arges = Array.prototype.slice.call(arguments, 0), type = arges.shift();
    if (this.depot[type]) {
        for (var i = 0, l = arges.length; i < l; i++) {
            this.depot[type].push(arges[i]);
        }
    } else {
        this.depot[type] = arges;
    }
    if (arges[0].reset) {//调用对存入的死囚重置
        arges[0].reset.apply(this, arges);
    }
}
/**
 * 从监狱提调死囚重新利用
 * @param type  死囚类型
 * @return {*}
 */
flash.Pool.getPool = function (type) {//重监狱取得死囚对象从新利用
    var funList;
    if (!(this.depot[type])) {
        return false;
    }
    funList = this.depot[type];
    if (funList.length > 0) {
        return funList.shift();
    } else {
        return false;
    }
}
/**
 * 清除全部不需要的死囚对象
 * @param type
 */
flash.Pool.removePool = function (type) {//不在使用该类型死囚全部枪毙
    if (this.depot[type]) {
        delete this.depot[type];
    }
}
