/**
 * 使用 BitmapData 类，您可以处理 Bitmap 对象的数据(像素)
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:01
 */
flash.utils.provide("flash.display.BitmapData");
flash.display.BitmapData = function (width, heigth, x, y, imgdata, swidth, sheight) {
    this.width = width || 0;  //位图大小
    this.height = heigth || 0;//位图宽度
    this.swidth = swidth || this.width;//剪切宽度
    this.sheight = sheight || this.height;//剪切高度
    this.offsetX = x || 0;//图片偏移X值
    this.offsetY = y || 0;//图片偏移Y值
    this.imgData = imgdata || null;//图片信息
    //定义位图图像大小和位置的矩形。 矩形的顶部和左侧为零；宽度和高度等于 BitmapData 对象的宽度和高度（以像素为单位）。
    this.rect = {x: this.offsetX, y: this.offsetY, width: this.width, height: this.height};
    //图像
    this.bitmap = this.imgData && flash.utils.getImageData(this.imgData, this.offsetX, this.offsetY, this.width, this.height);
    this.bitmapData = this.bitmap && this.bitmap.data;//图像的像素点信息
}
/**
 * 返回一个新的 BitmapData 对象，它是对原始实例的克隆，包含与原始实例所含位图完全相同的副本。
 * @return {flash.display.BitmapData}
 */
flash.display.BitmapData.prototype.clone = function () {
    return new flash.display.BitmapData(this.offsetX, this.offsetY, this.width, this.height, this.imgData);
}
/**
 * 释放用来存储 BitmapData 对象的内存。
 */
flash.display.BitmapData.prototype.dispose = function () {
    this.imgData = null;
    this.bitmap = null;
    this.bitmapData = null;
}
/**
 * 对指定对象进行拍照拷贝并且生成 BitmapData
 * @param source
 * @param clipRect 一个 Rectangle 对象，定义要绘制的源对象的区域 x,y,width,height
 * @return {flash.display.BitmapData}
 */
flash.display.BitmapData.prototype.draw = function (source, clipRect) {
    var stageX = null, stageY = null, width = null, height = null;
    if (source && source instanceof flash.display.DisplayObject) {
        stageX = source.stageX;
        stageY = source.stageY;
        width = this.width || source.width;
        height = this.height || source.height;
        if (clipRect) {
            stageX += clipRect.x;
            stageY += clipRect.y;
            width = clipRect.width;
            height = clipRect.height;
        }
        this.width = width;
        this.height = height;
        this.bitmap = source.conText.getImageData(stageX, stageY, width, height);
        this.bitmapData = this.bitmap.data;
        this.imgData = flash.utils.setImageData(this.bitmap, width, height);
    }
}
/**
 * 指定区域像素填充
 * @param rect
 * @param color
 * @param bol 值为true 时执行对区域所以像素填充 bol不填写或者false 只对区域内有颜色进行填充
 */
flash.display.BitmapData.prototype.fillRect = function (rect, color, bol) {
    var len = rect.width * rect.height, x = rect.x, y = rect.y;
    var w = rect.width, data = this.bitmapData, a, b, g, r, l, r;
    var bool = bol || false;
    if (data) {
        r = color >> 16 & 0xFF;
        g = color >> 8 & 0xFF;
        b = color & 0xFF;
        a = color >> 24 & 0xFF;
        for (var i = 0; i < len; i++) {
            l = parseInt(i / w);
            this.setColor(x + i % w, y + parseInt(i / w), this.width, data, r, g, b, a, bool);
        }
        this.imgData = flash.utils.setImageData(this.bitmap, this.width, this.height);
    }
}
/**
 * 返回一个 ARGB 颜色值，它包含 Alpha 通道数据和 RGB 数据
 * @param x
 * @param y
 * @return {Object}
 */
flash.display.BitmapData.prototype.getPixel32 = function (x, y) {
    var sum = null, data = this.bitmapData, color = {};
    if (data) {
        sum = y * this.width + x;
        if (data[sum * 4]) {
            color.r = data[sum * 4];
            color.g = data[sum * 4 + 1];
            color.b = data[sum * 4 + 2];
            color.a = data[sum * 4 + 3];
        }
    }
    return color;
}
/**
 * 设置 BitmapData 对象的单个像素。 在此操作过程中将会保留图像像素的当前 Alpha 通道值。 RGB 颜色参数的值被视为一个未经过相乘的颜色值。
 * @param x x 可以是一个点也可以是一个x坐标的集合数组
 * @param y y 可以是一个点也可以是一个y坐标的集合数组
 * @param color  0xFFFFFFFF
 * @param bol 值为true 时执行对区域所以像素填充 bol不填写或者false 只对区域内有颜色进行填充
 */
flash.display.BitmapData.prototype.setPixel = function (x, y, color, bol) {
    var data = this.bitmapData, a, b, g, r;
    var bool = bol || false;
    if (data) {
        r = color >> 16 & 0xFF;
        g = color >> 8 & 0xFF;
        b = color & 0xFF;
        a = color >> 24 & 0xFF;
        if (flash.utils.getType(y) == "Array" && flash.utils.getType(x) == "Array" && x.length == y.length) {
            for (var i = 0, l = x.length; i < l; i++) {
                this.setColor(x[i], y[i], this.width, data, r, g, b, a, bool);
            }
        } else {
            this.setColor(x, y, this.width, data, r, g, b, a, bool);
        }
        //修改完毕像素信息从新绘制生成新的img对象
        this.imgData = flash.utils.setImageData(this.bitmap, this.width, this.height);
    }
}
/**
 * 设置颜色
 * @param x x坐标
 * @param y y坐标
 * @param w 宽度
 * @param data 像素信息集合
 * @param r
 * @param g
 * @param b
 * @param a
 * @param bol 值为true 时执行对区域所以像素填充 bol不填写或者false 只对区域内有颜色进行填充
 */
flash.display.BitmapData.prototype.setColor = function (x, y, w, data, r, g, b, a, bol) {
    var sum = y * w + x;
    var bool = bol || data[sum * 4];
    console.log(r, g, b, a);
    if (bool) {
        data[sum * 4] = r;
        data[sum * 4 + 1] = g;
        data[sum * 4 + 2] = b;
        data[sum * 4 + 3] = a;
    }
}
/**
 * 检查当然像素是否与指定点碰撞
 * @param x
 * @param y
 * @return {Boolean}
 */
flash.display.BitmapData.prototype.hitTest = function (x, y) {
    var sum, data = this.bitmapData;
    if (data) {
        sum = y * this.width + x;
        if (data[sum * 4 + 3] || data[sum * 4 + 1]) {
            return true;
        } else {
            return false;
        }
    }
}
