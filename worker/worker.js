/**
 * 开始多线程进行像素与寻路密集运算
 * User: ningxiao
 * Date: 13-7-2
 * Time: 上午10:23
 */
var obj, rs, imw, imh, bitmapData,last,pi = 180/Math.PI;
var json = {}, paths = [], index = 0, stop = true;
function calculate(data) {
    imw = data.w;
    imh = data.h;
    rs = imw * 4;
    bitmapData = data.data;
    /**
     * 取得地图开始坐标
     */
    for (var i = imw - 1; i >= 0; i--) {
        for (var k = 0; k < imh; k++) {
            index = k * rs + i * 4 + 3;
            if (bitmapData[index]) {
                json[index] = true;
                paths.push({x:i, y:k});
               // last = paths[paths.length];
                last = {x:i, y:k};
                break;
            }
        }
        if (paths.length) {
            break;
        }
    }
    i = 0;
    //利用九宫格算法顺序取得绘制路线坐标生产线性数组
    while (stop) {
        if (paths[i]) {
            obj = getPath(paths[i].x, paths[i].y);
            if (obj) {
                paths.push(obj);
                i++;
            } else {
                stop = false;
            }
        }
    }
    return paths;
}
/**
 * 坐标九宫格算法
 * @param r 列
 * @param l 行
 * @return {*} 像素点的x与y坐标
 */
var ro = 0;
function getPath(r, l) {
    var y, x, index;
    for (var i = 0; i < 9; i++) {
        x = r + (i % 3 - 1);
        y = l + (parseInt(i / 3) - 1);
        index = y * rs + x * 4 + 3;
        if (bitmapData[index] && !json[index]) {
//            if((paths.length-1)%20==0){
//                last = paths[paths.length-1];
//                ro = pi *Math.atan2(y - last.y, x - last.x);
//            }
            //fish.cannon.rotation = pi * Math.atan2(y - last.y, x - last.x);
            json[index] = true;
            return {x:x, y:y,r:pi *Math.atan2(y - last.y, x - last.x)};
            break;
        }
    }
    return false;
}
this.addEventListener("message", function (event) {
    this.postMessage(calculate(event.data));
}, false);