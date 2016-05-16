/**
 * 按钮
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:02
 */
flash.utils.provide("flash.display.Button");
flash.utils.require("flash.events.MouseEvent");
flash.utils.require("flash.display.BitmapData");
flash.utils.require("flash.display.DisplayObject");
flash.display.Button = function (x, y, bitmapData) {
    flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = bitmapData || {};
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.label = "";//按钮显示内容
    this.fillStyle = '#00f';//字体颜色
    this.fonsize = 12;//字体大小
    this.font = 'italic ' + this.fonsize + 'px sans-serif';//设置字体
    this.frames = [this.bitmapData, false, false, false];//存放每帧位图与坐标信息
    this.doubleClickEnabled = true;//是否接受双击事件
    this.labelx = 0;//文本标题位置
    this.labely = 0;//文本标题位置
    this.labelw = 0;
}
flash.utils.inherits(flash.display.Button, flash.display.DisplayObject);
/**
 * 继承从新flash.display.DisplayObject 的渲染核心方法
 * @param x
 * @param y
 */
flash.display.Button.prototype.drawImage = function (x, y) {
    this.conText.drawImage(this.imgData, this.offsetX, this.offsetY, this.width, this.height, x, y, this.width, this.height);
    if(this.label){
        Stage.conText.fillStyle=this.fillStyle;
        Stage.conText.font=this.font;
        Stage.conText.fillText(this.label,this.stageX+this.labelx,this.stageY+this.labely);
    }
}
/**
 * 继承从新flash.display.DisplayObject 的碰撞方法
 * 添加对像素级别碰撞因为按钮存在透明区域
 * @param x x坐标
 * @param y y坐标
 * @return {Boolean} 是否碰撞
 */
flash.display.Button.prototype.hitTestPoint = function (x, y) {
    var j, k;
    if (this.stageX <= x && x <= this.stageX + this.width && this.stageY <= y && y <= this.stageY + this.height) {
        j = x - this.stageX;
        k = y - this.stageY;
        if (this.bitmapData.hitTest(j, k)) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}
/**
 * 执行舞台分发的事件
 * @param event
 * @constructor
 */
flash.display.Button.prototype.EventCall = function (event) {
    switch (event.type) {
        case flash.events.MouseEvent.MOUSEDOWN:
            this.resetData(2);
            this.dispatchEvent(event);
            break;
        case flash.events.MouseEvent.MOUSEUP:
            this.resetData(3);
            this.dispatchEvent(event);
            break;
        case flash.events.MouseEvent.CLICK:
            this.resetData(3);
            this.dispatchEvent(event);
            break;
        case flash.events.MouseEvent.MOUSEMOVE:
            if (!this.isemoves) {
                this.useHandCursor && (Stage.canvas.style.cursor = "pointer");
                this.resetData(1);
                this.dispatchEvent(Stage.MOUSEOVER);
                this.isemoves = true;
            } else {
                this.dispatchEvent(event);
            }
            break;
        case flash.events.MouseEvent.MOUSEOUT:
            if (this.isemoves) {//移除画布
                this.useHandCursor && (Stage.canvas.style.cursor = "");
                this.resetData(0);
                this.dispatchEvent(event);
                this.isemoves = false;
            }
            break;
        default:
            break;
    }
}
flash.display.Button.prototype.setLabel=function(val,x,y,style,fonsize,font){
    this.fillStyle = style || '#00f';//字体颜色
    this.fonsize = fonsize || 12;//字体大小
    this.font = font || 'italic 12px sans-serif';//设置字体
    this.label = val;
    this.labelw = this.label?Stage.conText.measureText(this.label).width:0;
    this.labely = this.height /2;
}
/**
 * 鼠标 按下 弹起 移入 移出 的时候切换渲染图像信息
 */
flash.display.Button.prototype.resetData = function (index) {
    var bitmap;
    if (this.frames[index]) {
        bitmap = this.frames[index];
    } else {
        for (var i = index; i >= 0; i--) {
            if (this.frames[i]) {
                bitmap = this.frames[i];
                break;
            }
        }
    }
    this.imgData = bitmap.imgData;
    this.offsetX = bitmap.offsetX;
    this.offsetY = bitmap.offsetY;
    this.width = bitmap.width;
    this.height = bitmap.height;
}
/**
 * 按下时图像信息
 * @param bitmapData
 */
flash.display.Button.prototype.setDownSkin = function (bitmapData) {
    if (bitmapData instanceof flash.display.BitmapData) {
        this.frames[2] = bitmapData;
    }
}
flash.display.Button.prototype.setDisabledSkin= function(bitmapData){
    if (bitmapData instanceof flash.display.BitmapData) {
        this.frames[0] = bitmapData;
    }
}
/**
 * 移入时图像信息
 * @param bitmapData
 */
flash.display.Button.prototype.setOverSkin = function (bitmapData) {
    if (bitmapData instanceof flash.display.BitmapData) {
        this.frames[1] = bitmapData;
    }
}
/**
 * 鼠标弹起时图像信息
 * @param bitmapData
 */
flash.display.Button.prototype.setUpSkin = function (bitmapData) {
    if (bitmapData instanceof flash.display.BitmapData) {
        this.frames[3] = bitmapData;
    }
}