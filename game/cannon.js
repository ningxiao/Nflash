/**
 * Created with JetBrains WebStorm.
 * User: ningxiao
 * Date: 13-6-28
 * Time: 下午8:39
 * To change this template use File | Settings | File Templates.
 */
function cannon(x,y,w,h,img){
    var cannon = new flash.display.Sprite(x,y,new flash.display.BitmapData(w,h,0,0,img));
    cannon.useHandCursor = true;
    cannon.centerX = w /2;
    cannon.centerY = h /2;
    return cannon;
}