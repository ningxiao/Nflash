/**
 * canvas框架 键盘事件
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:09
 */
flash.utils.provide("flash.events.KeyboardEvent");
flash.utils.require("flash.events.Event");
flash.events.KeyboardEvent = function () {
    flash.events.Event.apply(this, arguments);
    this.keyCode = 0;//按下或释放的键的键控代码值。
    this.shiftKey = true;//指示 Shift 键是处于活动状态 (true) 还是非活动状态 (false)。
    this.ctrlKey = true;//指示 Ctrl 键是处于活动状态 (true) 还是非活动状态 (false)。
}
flash.utils.inherits(flash.events.KeyboardEvent, flash.events.Event);
flash.events.KeyboardEvent.KEY_DOWN = "keyDown";
flash.events.KeyboardEvent.KEY_UP = "keyUp";