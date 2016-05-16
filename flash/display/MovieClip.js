/**
 * MovieClip 对象拥有一个时间轴
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:37
 */
flash.utils.provide("flash.display.MovieClip");
flash.utils.require("flash.display.DisplayObject");
/**
 *
 * @param x
 * @param y
 * @param bitmapData
 * @param frequency
 * @param script   执行脚本
 * @param fun     执行方法
 * @constructor
 */
flash.display.MovieClip = function (x, y, bitmapData, frequency,script,fun) {
    flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = bitmapData || {};
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.currentFrame = 0;//指定播放头在 MovieClip 实例的时间轴中所处的帧的编号
    this.currentLabels = [];//返回由当前场景的 FrameLabel 对象组成的数组
    this.frames = [];//存放每帧位图与坐标信息
    this.frame = 0;
    this.framestops = {};//帧对于stop对象
    this.ispaly = true;//当前状态是否在播放 true播放  false 停止
    this.callFun = false;//当前播放帧是否存在回调函数
    this.frequency = frequency || 3;//动画播放间隔频率
    this.addFrame(this.bitmapData,script,fun);
}
flash.utils.inherits(flash.display.MovieClip, flash.display.DisplayObject);
/***
 * 绘制舞台图像 如果是序列动画播放序列动画
 * @param x 绘制坐标 X
 * @param y 绘制坐标Y
 */
flash.display.MovieClip.prototype.drawImage = function (x, y) {
    if (this.framestops[this.frame]) {
        this.ispaly = false;
    }
    if (this.ispaly) {
        this.frame += 1;
    }
    if (this.frame == this.frames.length) {
        this.frame = 0;
    }
    if (this.frames[this.frame]) {
        this.currentFrame = this.frame / this.frequency + 1;
        this.resetData(this.frames[this.frame]);
        if (this.callFun) {
            this.callFun.call(this);
        }
    }
    this.conText.drawImage(this.bitmapData.imgData, this.offsetX, this.offsetY, this.swidth, this.sheight, x, y, this.width, this.height);
}
/**
 * 播放下一帧重置新信息
 */
flash.display.MovieClip.prototype.resetData = function (obj) {
    var bitmap = obj.bitmap;
    var script = obj.script;
    this.bitmapData.imgData = bitmap.imgData;
    this.offsetX = bitmap.offsetX;
    this.offsetY = bitmap.offsetY;
    this.width = bitmap.width;
    this.height = bitmap.height;
    if(script){
        for(var i in script){
            this[i] =  script[i];
        }
    }
    this.callFun = obj.callFun;
}
/**
 * 添加动画帧
 * @param bitmapData
 * @param fun
 */
flash.display.MovieClip.prototype.addFrame = function (bitmapData,script,fun) {
    var obj = {bitmap:bitmapData,script:false,callFun:false};
    if (fun == "stop") {
        this.stop(this.frames.length);
    }
    if (fun) {
        obj.callFun = fun;
    }
    if(script){
        obj.script = script;
    }
    this.frames.push(obj);
    for (var i = 0; i < this.frequency - 1; i++) {
        this.frames.push(undefined);
    }
}
/**
 * 修改动画
 * @param index 修改帧
 * @param bitmapData 位图信息
 * @param fun 调用方法
 */
flash.display.MovieClip.prototype.upFrame = function (index, bitmapData, fun) {
    var data = {bitmap:bitmapData, callFun:false};
    if (fun == "stop") {
        this.stop(this.frames.length);
    }
    if (fun) {
        data.callFun = fun;
    }
    this.frames[index * this.frequency] = data;
}
/**
 * 从指定帧开始播放 MovieClip 对象
 * @param frame 播放帧
 */
flash.display.MovieClip.prototype.gotoAndPlay = function (frame) {
    if (this.isFrame(frame)) {
        frame--;
        this.frame = frame * this.frequency;
        this.ispaly = true;
    }
}
/**
 * 将播放头移到影片剪辑的指定帧并停在那里
 * @param frame
 */
flash.display.MovieClip.prototype.gotoAndStop = function (frame) {
    if (this.isFrame(frame)) {
        frame--;
        this.frame = frame * this.frequency;
        this.ispaly = false;
    }
}
/**
 * 将播放头转到下一帧并停止
 */
flash.display.MovieClip.prototype.nextFrame = function () {
    this.gotoAndStop(this.currentFrame + 1);
}
/**
 * 在影片剪辑的时间轴中移动播放头。
 */
flash.display.MovieClip.prototype.play = function () {
    if (!this.ispaly) {
        this.gotoAndPlay(this.currentFrame + 1);
    }
}
/**
 * 将播放头转到前一帧并停止
 */
flash.display.MovieClip.prototype.prevFrame = function () {
    this.gotoAndStop(this.currentFrame - 1);
}
/**
 * 停止影片剪辑中的播放头。
 */
flash.display.MovieClip.prototype.stop = function (frame) {
    if (this.isFrame(frame)) {
        frame--;
        this.framestops[frame * this.frequency] = true;
    }
}
/**
 * 验证用户输入帧是否合法
 * @param frame 合法返回true 不合法返回false
 */
flash.display.MovieClip.prototype.isFrame = function (frame) {
    if (1 <= frame && frame <= this.frames.length / this.frequency) {
        return true;
    }
    return false;
}