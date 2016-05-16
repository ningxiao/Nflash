/**
 * 配置文件
 * User: ningxiao
 * Date: 13-8-17
 * Time: 上午9:30
 */
var car = {};
/**
 * 图片加载队列
 * @type {Array}
 */
car.urls = [
    {"btn_01_normal": "cargame/img/btn_01_normal.png"}, {"btn_01_hover": "cargame/img/btn_01_hover.png"},
    {"btn_03_normal": "cargame/img/btn_03_normal.png"}, {"btn_03_hover": "cargame/img/btn_03_hover.png"},
    {"help_png":"cargame/img/new.png"},{"avatar1":"cargame/img/avatar1.jpg"},{"avatar2":"cargame/img/avatar2.jpg"},
    {"avatar3":"cargame/img/avatar3.jpg"},{"avatar4":"cargame/img/avatar4.jpg"},{"number1":"cargame/img/1.png"},
    {"number2":"cargame/img/2.png"},{"number3":"cargame/img/3.png"},{"number4":"cargame/img/4.png"},
    {"smallwindow":"cargame/img/smallwindow.png"},{"msg":"cargame/img/msg.png"},{"mine":"cargame/img/mine.png"},{"fangyu":"cargame/img/fangyu.png"},
    {"jiasu":"cargame/img/jiasu.png"},{"zhadan":"cargame/img/zhadan.png"},{"background":"cargame/img/background.png"},{"road":"cargame/img/road.png"}
];
/**
 * 本地缓存图片
 * @type {Object}
 */
car.bitmaps = {};
/**
 * 开始界面
 * @type {null}
 */
car.guide = null;
/**
 * 引导界面背景
 * @type {null}
 */
car.content = null;
/**
 * 存储缩放面板
 * @type {Array}
 */
car.panels = [];
/**
 * 背景
 * @type {null}
 */
car.background = null;