/**
 * 表示位图图像的显示对象
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:00
 */
flash.utils.provide("flash.display.Bitmap");
flash.utils.require("flash.display.DisplayObject");
flash.display.Bitmap = function () {
    flash.display.DisplayObject.apply(this, arguments);
}
flash.utils.inherits(flash.display.Bitmap, flash.display.DisplayObject);