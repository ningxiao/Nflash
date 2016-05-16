/**
 * Created with JetBrains WebStorm.
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */
flash.utils.provide("flash.display.Shape");
flash.utils.require("flash.display.DisplayObject");
flash.display.Shape = function (x, y, bitmapData) {
    flash.display.DisplayObject.apply(this, arguments);
    this.bitmapData = bitmapData || {};
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
}
flash.utils.inherits(flash.display.Shape, flash.display.DisplayObject);