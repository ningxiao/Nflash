/**
 * 配置文件
 */
flash.utils.provide("skywar.config");
/**
* 当前舞台
* @type {element}
*/
skywar.config.canvas = document.getElementById('canvas');
/**
* 当前舞台高度
* @type {int}
*/
skywar.config.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
/**
* 当前舞台宽度
* @type {int}
*/
skywar.config.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
/**
* 当前浏览器信息
* @type {String}
*/
skywar.config.userAgent = navigator.userAgent.toString();
/**
* 飞船宽度
* @type {int}
*/
skywar.config.airship_width = 128;
/**
** 攻击小蜜蜂的难易度
**/
skywar.config.diff = 3;
/**
* 飞船高度
* @type {int}
*/
skywar.config.airship_height = 128;
/**
* 小蜜蜂面板距离顶部距离
* @type {int}
*/
skywar.config.beepanel_y = 64;
/**
* 小蜜蜂宽度
* @type {int}
*/
skywar.config.bee_width = 64;
/**
* 小蜜蜂高度
* @type {int}
*/
skywar.config.bee_height = 64;
/**
* 小蜜蜂炮弹宽度
* @type {int}
*/
skywar.config.beeplasmaw = 106;
/**
* 小蜜蜂炮弹高度
* @type {int}
*/
skywar.config.beeplasmah = 106;
/**
* 发射炮弹间隔
* @type {int}
*/
skywar.config.count = 30;
/**
* 小蜜蜂炮弹距离小蜜蜂top值
* @type {int}
*/
skywar.config.beeplasmatop = 40;
/**
* 小蜜蜂炮弹速度
* @type {int}
*/
skywar.config.beespeed = 10;

/**
* 小蜜蜂炮弹旋转角度
* @type {int}
*/

skywar.config.rotation = 180;

/**
* 小蜜蜂行数
* @type {int}
*/
skywar.config.bee_row = 4;
/**
* 小蜜蜂列数
* @type {int}
*/
skywar.config.bee_column = 8;
/**
* 飞船生命值
* @type {int}
*/
skywar.config.airship_life = 3;

/**
* 小蜜蜂爆炸宽度
* @type {int}
*/
skywar.config.beeexpw = 96;
/**
* 小蜜蜂爆炸高度
* @type {int}
*/
skywar.config.beeexph = 96;
/**
* 宇宙飞船爆炸宽度
* @type {int}
*/
skywar.config.airexpw = 128;
/**
* 宇宙飞船爆炸高度
* @type {int}
*/
skywar.config.airexph = 128;
/**
 * 本地缓存图片
 * @type {Object}
 */
skywar.config.bitmaps = {};
/**
 * 炮弹爆炸声音缓存对象
 * @type {Object}
 */
skywar.config.blastsound = null;

/**
 * 队列加载图片
 * @type {Array}
 */
skywar.config.urls = [{"bg":"skywar/images/bg.png"},{"airship":"skywar/images/ships/airship.png"},{"bee":"skywar/images/ships/bee.png"},{"airexp":"skywar/images/airexp.png"},{"beeexp":"skywar/images/beeexp.png"},{"plasma_red":"skywar/images/plasma_red.png"},{"plasma_white":"skywar/images/plasma_white.png"}];
/**
 * 音效
 * @type {Array}
 */
skywar.config.audios = {"explosion":"http://192.168.204.61/sound/explosion.ogg","neointro":"http://192.168.204.61/sound/neointro.ogg","shot":"http://192.168.204.61/sound/shot.ogg"};
