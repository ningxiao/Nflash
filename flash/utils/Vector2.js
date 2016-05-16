/**
 * 二维矢量类:
 * User: ningxiao
 * Date: 14-2-14
 * Time: 上午10:11
 */
flash.utils.provide("flash.Vector2");
flash.Vector2=function(x, y){
    this.x = x;
    this.y = y;
}
flash.Vector2.prototype.copy = function(){
    return new flash.Vector2(this.x,this.y);
}
flash.Vector2.prototype.length = function(){
    return Math.sqrt(this.sqrLength());
}
flash.Vector2.prototype.sqrLength = function(){
    return this.x * this.x + this.y * this.y;
}
flash.Vector2.prototype.normalize = function(){
    var inv = 1/this.length();
    return new flash.Vector2(this.x * inv, this.y * inv);
}
flash.Vector2.prototype.negate = function(){
    return new flash.Vector2(-this.x, -this.y);
}
flash.Vector2.prototype.add = function(v){
    return new flash.Vector2(this.x + v.x, this.y + v.y);
}
flash.Vector2.prototype.subtract = function(v){
    return new flash.Vector2(this.x - v.x, this.y - v.y);
}
flash.Vector2.prototype.multiply = function(f){
    return new flash.Vector2(this.x * f, this.y * f);
}
flash.Vector2.prototype.divide = function(f){
    var inv = 1/f;
    return new flash.Vector2(this.x * inv, this.y * inv);
}
flash.Vector2.prototype.dot = function(v){
    return this.x * v.x + this.y * v.y;
}
flash.Vector2.prototype.reset = function(){
    this.x = 0;
    this.y = 0;
}
flash.Vector2.zero = new flash.Vector2(0, 0);

