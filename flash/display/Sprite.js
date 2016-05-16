/**
 * 显示列表
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:02
 */
flash.utils.provide("flash.display.Sprite");
flash.utils.require("flash.display.DisplayObject");
flash.display.Sprite = function (x, y, bitmapData) {
    flash.display.DisplayObject.apply(this, arguments);
}
flash.utils.inherits(flash.display.Sprite, flash.display.DisplayObject);