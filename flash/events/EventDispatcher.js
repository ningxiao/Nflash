/**
 * canvas框架 事件管理中心控制事件删除派发
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:04
 */
flash.utils.provide("flash.events.EventDispatcher");
flash.utils.require("flash.events.MouseEvent");
flash.events.funList = {}; //全局注册事件函数存储对象
flash.events.uint = 0; //注册对象标示
flash.events.EventDispatcher = function() {};
/**
 * 注册事件
 * @param type 事件类型
 * @param listener 注册事件执行函数
 * @return {Number} 返回当前注册函数key
 */
flash.events.EventDispatcher.prototype.addEventListener = function(type, listener) {
    flash.events.uint++;
    flash.events.funList[flash.events.uint] = listener;
    if (this[type] && this[type].constructor === Array) {
        this[type].push(flash.events.uint);
    } else {
        this[type] = [flash.events.uint];
    };
    return flash.events.uint;
};
/**
 * 派发事件执行
 * @param event
 */
flash.events.EventDispatcher.prototype.dispatchEvent = function(event) {
    var arr = this[event.type];
    if (!arr) {
        return;
    };
    for (var i = 0, l = arr.length; i < l; i++) {
        if (flash.events.funList[arr[i]]) {
            event.target = this;
            if (event instanceof flash.events.MouseEvent) {
                event.setMouseData(this);
            };
            flash.events.funList[arr[i]].call(this, event);
        };
    };
};
/**
 * 验证是否注册事件
 * @param type 事件类型
 * @return {Boolean} 返回true false
 */
flash.events.EventDispatcher.prototype.hasEventListener = function(type) {
    if (this[type]) {
        return true;
    };
    return false;
};
/**
 * 删除全部该类型事件
 * @param type
 */
flash.events.EventDispatcher.prototype.removeEventListener = function(type) {
    for (var i = 0; i < this[type].length; i++) {
        delete flash.events.funList[this[type][i]];
    };
    delete this[type];
};
/**
 * 删除指定key事件
 * @param key
 */
flash.events.EventDispatcher.prototype.unlistenByKey = function(key) {
    if (key in flash.events.funList) {
        flash.events.funList[key] = null;
        delete flash.events.funList[key];
    };
};