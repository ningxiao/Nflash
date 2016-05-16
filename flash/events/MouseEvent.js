/**
 * canvas框架 鼠标事件
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:08
 */
flash.utils.provide("flash.events.MouseEvent");
flash.utils.require("flash.events.Event");
flash.events.MouseEvent = function () {
    flash.events.Event.apply(this, arguments);
    this.localX = 0;//事件发生点的相对于包含 Sprite 的水平坐标。
    this.localY = 0;//事件发生点的相对于包含 Sprite 的垂直坐标。
    this.stageX = 0;//事件发生点在全局舞台坐标中的水平坐标
    this.stageY = 0;//事件发生点在全局舞台坐标中的垂直坐标
    this.shiftKey = true;//指示 Shift 键是处于活动状态 (true) 还是非活动状态 (false)。
    this.ctrlKey = true;//指示 Ctrl 键是处于活动状态 (true) 还是非活动状态 (false)。
}
flash.utils.inherits(flash.events.MouseEvent, flash.events.Event);
flash.events.MouseEvent.prototype.setMouseData = function(obj){
    this.stageX = Stage.mouseX;
    this.stageY = Stage.mouseY;
    this.localX = this.stageX - obj.stageX;
    this.localY = this.stageY - obj.stageY;
}
flash.events.MouseEvent.DBCLICK = "dblclick";
flash.events.MouseEvent.CLICK = "click";
flash.events.MouseEvent.MOUSEDOWN = "mousedown";
flash.events.MouseEvent.MOUSEUP = "mouseup";
flash.events.MouseEvent.MOUSEMOVE = "mousemove";
flash.events.MouseEvent.MOUSEOUT = "mouseout";
flash.events.MouseEvent.MOUSEOVER = "mouseover";
flash.events.MouseEvent.TOUCHMOVE = "touchmove";
flash.events.MouseEvent.TOUCHSTART = "touchstart";
flash.events.MouseEvent.TOUCHEND = "touchend";

