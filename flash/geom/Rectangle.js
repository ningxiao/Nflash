/**
 * Rectangle
 * User: ningxiao
 * Date: 13-6-13
 * Time: 上午11:06
 * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。
 * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其它属性。 但是，right 和 bottom 属性与这四个属性是整体相关的。 例如，如果更改 right 属性的值，则 width 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
 */
flash.utils.provide("flash.geom.Rectangle");
flash.geom.Rectangle = function(x,y,width,height){
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
}
/**
 * 返回一个新的矩形对象
 * @return {flash.geom.Rectangle}
 */
flash.geom.Rectangle.prototype.clone = function(){
    return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
}
/**
 * 确认指定点是否在该矩形区域内
 * @param x
 * @param y
 */
flash.geom.Rectangle.prototype.contains = function(x,y){

}
/**
 * 按指定量调整 Rectangle 对象的位置（由其左上角确定）。
 * @param dx 将 Rectangle 对象的 x 值移动此数量
 * @param dy 将 Rectangle 对象的 y 值移动此数量
 */
flash.geom.Rectangle.prototype.offset = function(dx,dy){

}
/**
 * 将一个矩形与当前矩形组合成为一个新的矩形
 * @param toUnion
 */
flash.geom.Rectangle.prototype.union = function(toUnion){

}