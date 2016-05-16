/**
 * 颜色工具类
 * User: ningxiao
 * Date: 14-2-14
 * Time: 下午2:12
 */
flash.utils.provide("flash.Color");
flash.Color = function(r, g, b, a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}
flash.Color.prototype.copy=function(){
    return new flash.Color(this.r, this.g, this.b, this.a);
}
flash.Color.prototype.add=function(c){
    return new flash.Color(this.r + c.r, this.g + c.g, this.b + c.b , this.a);
}
flash.Color.prototype.multiply=function(s){
    return new flash.Color(this.r * s, this.g * s, this.b * s, this.a);
}
flash.Color.prototype.modulate=function(c){
    return new flash.Color(this.r * c.r, this.g * c.g, this.b * c.b, this.a);
}
flash.Color.prototype.saturate=function(){
    this.r = Math.min(this.r, 1);
    this.g = Math.min(this.g, 1);
    this.b = Math.min(this.b, 1);
    this.a = Math.min(this.a, 1);
}
flash.Color.prototype.toRgba = function(){
    return "rgba("+ Math.floor(this.r * 255) + ","+ Math.floor(this.g * 255) + ","+ Math.floor(this.b * 255) + ","+ this.a.toFixed(2) + ")";
}
/**
 *
 * flash.Color.black = new flash.Color(0, 0, 0);
 * flash.Color.white = new flash.Color(1, 1, 1);
 * flash.Color.red = new flash.Color(1, 0, 0);
 * flash.Color.green = new flash.Color(0, 1, 0);
 * flash.Color.blue = new flash.Color(0, 0, 1);
 * flash.Color.yellow = new flash.Color(1, 1, 0);
 * flash.Color.cyan = new flash.Color(0, 1, 1);
 * flash.Color.purple = new flash.Color(1, 0, 1);
 */
