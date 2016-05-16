/**
 * Created with JetBrains WebStorm.
 * User: ningxiao
 * Date: 13-6-28
 * Time: 下午3:15
 * To change this template use File | Settings | File Templates.
 */
function bullet(x, y,w,h, img,frequency) {
    var bull = new flash.display.MovieClip(x, y, new flash.display.BitmapData(w, h, 0, 0, img), frequency,null);
    for (var i = 1; i < 47; i++) {
        bull.addFrame(new flash.display.BitmapData(w, h, 0, i*h, img), null);
    }
    bull.centerX = w /2;
    bull.centerY = h /2;
    return bull;
}
