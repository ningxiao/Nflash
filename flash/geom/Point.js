/**
 * Point
 * User: ningxiao
 * Date: 13-6-13
 * Time: 上午11:57
 * Point  对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
 */
flash.utils.provide("flash.geom.Point");
flash.geom.Point = function(x,y){
    this.x = x || 0;
    this.y = y || 0;
    this.length = this.distance({x:0,y:0},this);
}
flash.geom.Point.prototype.clone = function(){
    return new flash.geom.Point(this.x,this.y);
}
/**
 * 返回 pt1 和 pt2 之间的距离。
 * @param pt1
 * @param pt2
 * @return {Number}
 */
flash.geom.Point.prototype.distance = function(pt1,pt2){
    var x = Math.abs(pt1.x - pt2.x);
    var y = Math.abs(pt1.y - pt2.y);
    return Math.sqrt(x*x+y*y);
}
/**
 * 添加一个新的
 * @param v
 */
flash.geom.Point.prototype.add = function(v){
    this.x = v.x;
    this.y = v.y;
    this.length = this.distance({x:0,y:0},this);
}