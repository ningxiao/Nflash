/**
 * canvas框架 事件基类
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:06
 */
flash.utils.provide("flash.events.Event");
flash.events.Event = function (type) {
    this.target = null;//事件目标。
    this.type = type;//事件的类型
}
flash.events.COMPLETE = "complete";//加载成功
flash.events.ENTER_FRAME = "enterFrame";//帧频事件
flash.events.ADDED_TO_STAGE = "addedToStage";//舞台初始化完毕
flash.events.ERROR = "error";//异常事件

