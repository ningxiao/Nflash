/**
 * 声音播放
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:02
 */
flash.utils.provide("flash.media.Sound");
flash.utils.require("flash.events.Event");
flash.utils.require("flash.events.SoundEvent");
flash.utils.require("flash.events.EventDispatcher");
flash.media.Sound = function (stream,config) {
    flash.events.EventDispatcher.apply(this, arguments);
    this.bytesLoaded = 0;//返回此声音对象中当前可用的字节数。\
    this.loop = false;//是否循环播放
    this.autoplay = false;//是否加载完毕立即播放
    this.url = stream || "";//音频播放地址
    this.audio = null;
    this.url && this.load(this.url);
    this.TIMEUPDATE = new flash.events.SoundEvent(flash.events.SoundEvent.TIMEUPDATE);
    this.CANPLAY = new flash.events.SoundEvent(flash.events.SoundEvent.CANPLAY);
    this.PAUSE = new flash.events.SoundEvent(flash.events.SoundEvent.PAUSE);
    this.PLAY = new flash.events.SoundEvent(flash.events.SoundEvent.PLAY);
    this.ENDED = new flash.events.SoundEvent(flash.events.SoundEvent.ENDED);
    this.ERROR = new flash.events.Event(flash.events.ERROR);
}
flash.utils.inherits(flash.media.Sound, flash.events.EventDispatcher);
/**
 * 加载音频文件
 * @param stream
 */
flash.media.Sound.prototype.load = function(stream){
    if(!this.audio){
        this.audio = document.createElement("audio");
    }
    this.url = stream;
    this.audio.src = stream;
    this.audio.autoplay = this.autoplay;
    this.audio.loop = this.loop;
    this.audio.addEventListener(flash.events.SoundEvent.TIMEUPDATE,flash.utils.bind(this.openEvent,this));
    this.audio.addEventListener(flash.events.SoundEvent.CANPLAY,flash.utils.bind(this.openEvent,this));
    this.audio.addEventListener(flash.events.SoundEvent.PAUSE,flash.utils.bind(this.openEvent,this));
    this.audio.addEventListener(flash.events.SoundEvent.PLAY,flash.utils.bind(this.openEvent,this));
    this.audio.addEventListener(flash.events.SoundEvent.ENDED,flash.utils.bind(this.openEvent,this));
    this.audio.addEventListener(flash.events.ERROR,flash.utils.bind(this.openEvent,this));
}
/**
 * 释放音频
 */
flash.media.Sound.prototype.reset = function(){
    this.loop = false;//是否循环播放
    this.autoplay = false;//是否加载完毕立即播放
    this.url = "";//音频播放地址
    this.audio = null;//置空
}
/**
 * 音频暂停
 */
flash.media.Sound.prototype.audiopause = function(){
    this.audio && this.audio.pause();
}
/**
 * 音频播放
 */
flash.media.Sound.prototype.audioplay = function(){
    this.audio && this.audio.play();
}
/**
 * 音频播放
 */
flash.media.Sound.prototype.audioreplay = function(){
    if(this.audio){
       this.audio.src = this.url; 
       this.audio.play();
    }
}
/**
 * 获取音频总时长
 */
flash.media.Sound.prototype.GetDuration = function(){
    if(this.audio){
       return this.audio.duration;
    }
    return 0;    
}
/**
 * 是否暂停
 */
flash.media.Sound.prototype.GetPaused = function(){
    if(this.audio){
       return this.audio.paused;
    }
    return true;
}
/**
 * 播放时间
 */
flash.media.Sound.prototype.GetTime = function(){
    if(this.audio){
       return this.audio.currentTime;
    }
    return 0;
}
/**
 * 播放时间
 */
flash.media.Sound.prototype.SetTime = function(time){
    if(this.audio){
       this.audio.currentTime = time;
    }
}
/**
 * 音频事件统一入口
 * @param event
 */
flash.media.Sound.prototype.openEvent = function(event){
    switch (event.type) {
        case flash.events.SoundEvent.CANPLAY://当浏览器可以播放音频
            this.dispatchEvent(this.CANPLAY);
            break;
        case flash.events.SoundEvent.ENDED://播放结束
            this.dispatchEvent(this.ENDED);
            break;
        case flash.events.ERROR://播放出现异常
            this.dispatchEvent(this.ERROR);
            break;
        case flash.events.SoundEvent.PAUSE://视频暂停
            this.dispatchEvent(this.PAUSE);
            break;
        case flash.events.SoundEvent.PLAY://视频播放
            this.dispatchEvent(this.PLAY);
            break;
        case flash.events.SoundEvent.TIMEUPDATE://视频进度
            this.dispatchEvent(this.TIMEUPDATE);
            break;            
        default:
            break;
    }
}