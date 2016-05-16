/**
 * Created with JetBrains WebStorm.
 * User: ningxiao
 * Date: 13-6-28
 * Time: 下午3:15
 * To change this template use File | Settings | File Templates.
 */
function coinAni(x, y, img) {
    var width = 60, height = 60, swidth = 60, sheight = 60;
    var coin = new flash.display.MovieClip(x, y, new flash.display.BitmapData(width, height, 0, 0, img, swidth, sheight), 3, null);
    coin.useHandCursor = true;
    for (var i = 1; i < 10; i++) {
        coin.addFrame(new flash.display.BitmapData(width, height, 0, i * 60, img, swidth, sheight), null);
    }
    return coin;
}
