/**
 * canvas框架 鼠标事件
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:08
 */
flash.utils.provide("flash.events.SoundEvent");
flash.utils.require("flash.events.Event");
flash.events.SoundEvent = function () {
    flash.events.Event.apply(this, arguments);
}
flash.utils.inherits(flash.events.SoundEvent, flash.events.Event);
flash.events.SoundEvent.CANPLAY = "canplay";//当浏览器可以播放音频
flash.events.SoundEvent.ENDED = "ended";//当目前的播放列表已结束时
flash.events.SoundEvent.PAUSE = "pause";//当浏览器音频暂停
flash.events.SoundEvent.PLAY = "play";//当浏览器音频播放
flash.events.SoundEvent.TIMEUPDATE = "timeupdate";//当浏览器音频播放进度




