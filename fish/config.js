/**
 * 配置文件
 * User: ningxiao
 * Date: 13-7-3
 * Time: 下午3:01
 */
flash.utils.provide("fish.config");
/**
 * 队列加载图片
 * @type {Array}
 */
fish.config.urls = [{"bottom-bar":"fish/img/bottom-bar.png"},{"number-black":"fish/img/number-black.png"},
    {"cannon1":"fish/img/cannon1.png"},{"cannon2":"fish/img/cannon2.png"},{"cannon3":"fish/img/cannon3.png"},
    {"cannon4":"fish/img/cannon4.png"},{"cannon5":"fish/img/cannon5.png"},{"cannon6":"fish/img/cannon6.png"},
    {"cannon7":"fish/img/cannon7.png"},{"fish4":"fish/img/fish4.png"},{"bullet1":"fish/img/bullet1.png"},
    {"bullet2":"fish/img/bullet2.png"},{"bullet3":"fish/img/bullet3.png"},{"bullet4":"fish/img/bullet4.png"},
    {"web1":"fish/img/web1.png"},{"web2":"fish/img/web2.png"},{"web3":"fish/img/web3.png"},{"web4":"fish/img/web4.png"},
    {"web5":"fish/img/web5.png"},{"web6":"fish/img/web6.png"},{"web7":"fish/img/web7.png"},
    {"bullet5":"fish/img/bullet5.png"},{"bullet6":"fish/img/bullet6.png"},{"bullet7":"fish/img/bullet7.png"},{"bullet8":"fish/img/bullet8.png"},
    {"coinAni1":"fish/img/coinAni1.png"},{"cannon_plus_down":"fish/img/cannon_plus_down.png"},{"cannon_plus":"fish/img/cannon_plus.png"},
    {"cannon_minus_down":"fish/img/cannon_minus_down.png"},{"cannon_minus":"fish/img/cannon_minus.png"},{"coinText":"fish/img/coinText.png"},
    {"trough":"fish/img/trough.png"}];
/**
 *
 * @type {{music_1: string, bgm_fire: string, bgm_box: string, bgm_coin_01: string}}
 */
fish.config.audio = {"music_1":"fish/music/music_1.ogg","bgm_fire":"fish/sound/bgm_fire.ogg","bgm_box":"fish/sound/bgm_box.ogg","bgm_coin_01":"fish/sound/bgm_coin_01.ogg"};

fish.config.userAgent = navigator.userAgent.toString();
/***
 * 金币声音是否播放完毕
 * @type {boolean}
 */
fish.config.is_bgmcoin = true;
/**
 * 本地缓存图片
 * @type {Object}
 */
fish.config.bitmaps = {};
/**
 * 金币与炮台背景
 * @type {null}
 */
fish.config.bottom_bar = null;
/**
 * 金币数量
 * @type {Number}
 */
fish.config.number = 325;
/**
 * 捕获金币序列数组
 * @type {Array}
 */
fish.config.numbers = [];
/**
 * 当前使用大炮
 * @type {null}
 */
fish.config.cannon = null;
/**
 * 大炮型号
 * @type {null}
 */
fish.config.cannonType = 1;
/**
 *
 * @type {Number}
 */
fish.config.pi = 180/Math.PI;
/**
 * 炮弹配置文件高度
 * @type {Array}
 */
fish.config.cannon_config = [74,74,76,76,83,85,90,94];
/**
 * 鱼的数组
 * @type {Array}
 */
fish.config.fishs = [];
/**
 * 不同型号炮弹规格
 * @type {Array}
 */
fish.config.bullets_config = [{w:24,h:26},{w:24,h:26},{w:25,h:29},{w:27,h:31},{w:29,h:33},{w:30,h:34},{w:31,h:35},{w:32,h:38},{w:30,h:44}];
/**
 * 不同捕鱼网规格配置
 * @type {Array}
 */
fish.config.web_config = [{w:116,h:118},{w:116,h:118},{w:137,h:142},{w:156,h:162},{w:180,h:174},{w:163,h:155},{w:191,h:181},{w:242,h:244}];
/**
 * 是否可以放网捕鱼
 * @type {boolean}
 */
fish.config.isweb = false;
/**
 * 炮弹数组
 * @type {Array}
 */
fish.config.bullets = [];
/**
 * 当前
 * @type {Array}
 */
fish.config.coin_texts = [];
/**
 * 银币数组
 * @type {null}
 */
fish.config.coinAni1 = [];
/**
 * 金币数组
 * @type {null}
 */
fish.config.coinAni2 = [];
/**
 * 添加大炮
 * @type {null}
 */
fish.config.plus_btn = null;
/**
 *减小大炮
 * @type {null}
 */
fish.config.minus_btn = null;
/**
 * 创建时间进度
 * @type {null}
 */
fish.config.trough_ui = null;
/**
 * 鱼添加层
 * @type {null}
 */
fish.config.fish_div = null;
/**
 * 炮弹，金币，捕鱼网，添加层
 * @type {null}
 */
fish.config.bullet_div = null;
/**
 * 空白单击层
 * @type {null}
 */
fish.config.click_div = null;
/**
 * 游戏是否结束
 * @type {boolean}
 */
fish.config.isEnd = true;