/**
 * 捕鱼达人入口类
 * User: ningxiao
 * Date: 13-7-3
 * Time: 下午3:46
 * To change this template use File | Settings | File Templates.
 */
flash.utils.provide("fish");
flash.utils.require("fish.config");
flash.utils.require("fish.coin_ui");
flash.utils.require("flash.Pool");
flash.utils.require("flash.media.Sound");
flash.utils.require("flash.events.Event");
flash.utils.require("flash.display.Stage");
flash.utils.require("flash.display.Sprite");
flash.utils.require("flash.display.Button");
flash.utils.require("flash.events.MouseEvent");
flash.utils.require("flash.display.MovieClip");
flash.utils.require("flash.display.BitmapData");
Stage = new flash.display.Stage(document.getElementById('canvas'), 40);
/**
 * 开启接收游戏手柄
 */
flash.socket && flash.socket.on('acceptHandle', function (data) {
    var type = data["type"];
    var json = data["data"] || {};
    switch (type) {
        case "up":
            break;
        case "left":
            fish.cannon.config.rotation = fish.cannon.config.rotation - 10;
            break;
        case "right":
            fish.cannon.config.rotation = fish.cannon.config.rotation + 10;
            break;
        case "down":
            break;
        case "fire":
            fish.config.click_div.dispatchEvent(Stage.CLICK);
            break;
        default:
            break;
    }
});
flash.utils.queueImg(fish.config.urls, fish.config.bitmaps, function () {
    fish.init();
    fish.layout();
},function(data){
});
fish.init = function () {
    var music_bak = new flash.media.Sound();
    if (fish.config.userAgent.indexOf("Safari") != -1) {
        for (var i in fish.config.audio) {
            fish.config.audio[i] = fish.config.audio[i].replace(/\.ogg/, ".mp3");
        }
    }
    music_bak.loop = true;
    music_bak.load(fish.config.audio.music_1);
    music_bak.audioplay();
}
/**
 * 页面基础布局
 */
fish.layout = function () {
    var fish4, img;
    fish.config.bottom_bar = new flash.display.Sprite((Stage.width - 765) / 2, Stage.height - 72, new flash.display.BitmapData(765, 72, 0, 0, fish.config.bitmaps["bottom-bar"]));
    fish.config.trough_ui = new flash.display.Sprite(Stage.width - 351, Stage.height - 27, new flash.display.BitmapData(1, 18, 0, 0, fish.config.bitmaps["trough"]));
    fish.config.fish_div = new flash.display.Sprite(0, 0, {height: Stage.height, width: Stage.width});
    fish.config.bullet_div = new flash.display.Sprite(0, 0, {height: Stage.height, width: Stage.width});
    fish.config.click_div = new flash.display.Sprite(0, 0, {height: Stage.height - 100, width: Stage.width});
    fish.config.click_div.useHandCursor = true;
    Stage.addChild(fish.config.fish_div);
    Stage.addChild(fish.config.bullet_div);
    Stage.addChild(fish.config.bottom_bar);
    Stage.addChild(fish.config.trough_ui);
    fish.addNumber();
    fish.setNumber(0);
    fish.config.cannon = fish.addCannon(74, fish.config.cannon_config[fish.config.cannonType], fish.config.bitmaps["cannon" + fish.config.cannonType]);
    fish.add_button();
    Stage.addChild(fish.config.click_div);
    Stage.addEventListener(flash.events.ENTER_FRAME, fish.onEnterFrame);
    fish.config.plus_btn.addEventListener(flash.events.MouseEvent.CLICK, fish.upCannon_Click);
    fish.config.minus_btn.addEventListener(flash.events.MouseEvent.CLICK, fish.upCannon_Click);
    fish.config.click_div.addEventListener(flash.events.MouseEvent.MOUSEMOVE, fish.rotation_cannon);
    fish.config.click_div.addEventListener(flash.events.MouseEvent.CLICK, fish.cannon_onClick);
    for (var i = 0; i < 10; i++) {
        img = fish.config.bitmaps["fish4"];
        fish4 = new flash.display.MovieClip(i * Math.random() * 50, i * Math.random() * 60, new flash.display.BitmapData(77, 59, 0, 0, img), 10, null);
        for (var k = 1; k < 8; k++) {
            fish4.addFrame(new flash.display.BitmapData(77, 59, 0, k * 59, img), null);
        }
        fish4.stop(4);
        fish4.stop(8);
        fish4.coin = 5;
        fish.config.fishs.push(fish4);
        fish.config.fish_div.addChild(fish4);
    }
    fish.config.cannon.rotation = -90;
}
/**
 * 鼠标在舞台区域旋转大炮
 */
fish.rotation_cannon = function () {
    var y = Stage.mouseY - (fish.config.cannon.centerY + fish.config.cannon.stageY);
    var x = Stage.mouseX - (fish.config.cannon.centerX + fish.config.cannon.stageX);
    fish.config.cannon.rotation = fish.config.pi * Math.atan2(y, x);
}
/**
 * 切换捕鱼炮弹
 * @param event
 */
fish.upCannon_Click = function (event) {
    if (event.target == fish.config.plus_btn) {
        fish.config.cannonType++;
    } else {
        fish.config.cannonType--;
    }
    if (fish.config.cannonType > 7) {
        fish.config.cannonType = 1;
    } else if (fish.config.cannonType < 1) {
        fish.config.cannonType = 7;
    }
    fish.config.cannon = fish.addCannon(74, fish.config.cannon_config[fish.config.cannonType], fish.config.bitmaps["cannon" + fish.config.cannonType]);
    fish.audio_play("audio", fish.config.audio.bgm_box, fish.audio_pause);
    fish.config.cannon.gotoAndPlay(1);
}
/**
 * 单击舞台发射大炮,并且播放动画
 * @param event
 */
fish.cannon_onClick = function (event) {
    var type, data, x, y, bullet1;
    if (fish.config.isEnd) {
        type = "bullet" + fish.config.cannonType;
        data = fish.config.bullets_config[fish.config.cannonType];
        x = fish.config.cannon.stageX + (74 - data.w) / 2;
        y = fish.config.cannon.stageY + (fish.config.cannon_config[fish.config.cannonType] - data.h) / 2;
        bullet1 = flash.Pool.getPool(type);
        fish.audio_play("audio", fish.config.audio.bgm_fire,fish.audio_pause);
        if (bullet1) {
            bullet1.stageX = bullet1.x = x;
            bullet1.stageX = bullet1.y = y;
            bullet1.step = 0;
        } else {
            bullet1 = new flash.display.Sprite(x, y, new flash.display.BitmapData(data.w, data.h, 0, 0, fish.config.bitmaps[type]));
            bullet1.centerX = data.w / 2;
            bullet1.centerY = data.h / 2;
            bullet1.asbRotation = 90;
            bullet1.speed = 6;
            bullet1.type = type;
        }
        bullet1.rotation = fish.config.cannon.rotation;
        fish.config.bullets.push(bullet1);
        fish.config.bullet_div.addChild(bullet1);
        fish.config.cannon.gotoAndPlay(2);
        fish.setNumber(-10);
    }
}
fish.onEnterFrame = function (event) {
    var fish4, coni, coinAni, isb = true;
    for (var i = 0; i < fish.config.fishs.length; i++) {
        fish4 = fish.config.fishs[i];
        if (!fish4.ispaly) {
            if (fish4.currentFrame > 4) {
                isb = false;
                fish.config.fish_div.removeChild(fish.config.fishs.splice(i, 1)[0]);
                flash.Pool.addPool("fish", fish4);
                coinAni = fish.addCoinAni(fish4.stageX + 15, fish4.stageY - 15, fish.config.bitmaps["coinAni1"]);
                fish.config.coinAni1.push(coinAni);
                fish.config.bullet_div.addChild(coinAni);
                fish.setNumber(10);
                coni = flash.Pool.getPool("coinText");
                if (coni) {
                    coni.x = fish4.stageX;
                    coni.y = fish4.stageY;
                    coni.set_coin(fish4.coin);
                } else {
                    coni = new fish.coin_ui(fish4.stageX, fish4.stageY, {height: 100, width: 100}, fish4.coin);
                }
                fish.config.coin_texts.push(coni);
                fish.config.bullet_div.addChild(coni);
                i--;
            } else {
                fish4.gotoAndPlay(1);
            }
        }
        if (fish4.currentFrame <= 4) {
            fish4.setX(fish4.x + 1);
        }
    }
    for (i = 0; i < fish.config.coin_texts.length; i++) {
        coni = fish.config.coin_texts[i];
        if (coni.is_play) {
            coni.play_Animation();
        } else {
            coni.reset();
            fish.config.coin_texts.splice(i, 1);
            flash.Pool.addPool("coinText", coni);
            i--;
        }
    }
    fish.trash_bullet();
}
/**
 * 绘制金币数量并且添加到舞台
 */
fish.addNumber = function () {
    var x = 0, y = Stage.height - 28, number = null, img = null;
    for (var i = 0; i < 6; i++) {
        x = i * 24 + 150 - i;
        img = fish.config.bitmaps["number-black"];
        number = new flash.display.MovieClip(x, y, new flash.display.BitmapData(20, 24, 0, 0, img), 3, null);
        for (var k = 1; k < 10; k++) {
            number.addFrame(new flash.display.BitmapData(20, 24, 0, k * 24, img), null);
        }
        number.gotoAndStop(10);
        fish.config.numbers.push(number);
        Stage.addChild(number);
    }

}
/**
 * 设置金币显示金额
 */
fish.setNumber = function (sum) {
    var len, number, data;
    fish.config.number += sum;
    if (fish.config.number <= 0) {
        fish.config.isEnd = false;
        fish.config.number = 0;
    }
    data = fish.config.number.toString().split("");
    len = fish.config.numbers.length - data.length;
    for (var i = 0, l = fish.config.numbers.length; i < l; i++) {
        number = fish.config.numbers[i];
        if (i >= len) {
            number.gotoAndStop(10 - data[i - len]);
        } else {
            number.gotoAndStop(10);
        }
    }
}
fish.add_button = function () {
    fish.config.plus_btn = new flash.display.Button(480, Stage.height - 30, new flash.display.BitmapData(44, 31, 0, 0, fish.config.bitmaps["cannon_plus"]));
    fish.config.plus_btn.useHandCursor = true;
    fish.config.plus_btn.setOverSkin(new flash.display.BitmapData(44, 31, 0, 0, fish.config.bitmaps["cannon_plus_down"]));
    fish.config.minus_btn = new flash.display.Button(590, Stage.height - 30, new flash.display.BitmapData(44, 31, 0, 0, fish.config.bitmaps["cannon_minus"]));
    fish.config.minus_btn.useHandCursor = true;
    fish.config.minus_btn.setOverSkin(new flash.display.BitmapData(44, 31, 0, 0, fish.config.bitmaps["cannon_minus_down"]));
    Stage.addChild(fish.config.plus_btn);
    Stage.addChild(fish.config.minus_btn);
}
/**
 * 创建金币
 * @param x
 * @param y
 * @param img
 * @return {*}
 */
fish.addCoinAni = function (x, y, img) {
    var coinAni = flash.Pool.getPool("coinAni");
    if (coinAni) {
        coinAni.stageX = coinAni.x = x;
        coinAni.stageY = coinAni.y = y;
        coinAni.gotoAndPlay(1);
    } else {
        coinAni = new flash.display.MovieClip(x, y, new flash.display.BitmapData(60, 60, 0, 0, img), 2, null);
        for (var i = 1; i < 10; i++) {
            coinAni.addFrame(new flash.display.BitmapData(60, 60, 0, i * 60, img), null);
        }
    }
    return coinAni;
}
/**
 * 创建渔网
 */
fish.addWeb = function (x, y) {
    var type = "web" + fish.config.cannonType, web = flash.Pool.getPool(type);
    var fun = null, img = null, data = fish.config.web_config[fish.config.cannonType];
    if (web) {
        web.x = web.stageX = x - (data.w / 2);
        web.y = web.stageY = y - (data.h / 2);
        web.gotoAndPlay(1);
    } else {
        img = fish.config.bitmaps["web" + fish.config.cannonType];
        web = new flash.display.MovieClip(x - (data.w / 2), y - (data.h / 2), new flash.display.BitmapData(data.w, data.h, 0, 0, img), 5, null, null);
        for (var i = 1; i < 10; i++) {
            if (i == 9) {
                fun = function () {
                    flash.Pool.addPool(this.type, this.parent.removeChild(this));
                }
            }
            web.addFrame(new flash.display.BitmapData(data.w, data.h, 0, 0, img), {alpha: 1 - (i / 10)}, fun);
        }
        web.type = type;
    }
    return web;
}
/**
 * 创建声音播放
 * @param type 声音名称
 * @param src 音频地址
 * @param config 音频配置文件
 * @param fun 播放完成调用事件
 */
fish.audio_play = function (type, src, callback, config) {
    var sound = flash.Pool.getPool(type);
    if (!sound) {
        sound = new flash.media.Sound();
    }
    sound.autoplay = true;
    if (config) {
        for (var i in config) {
            sound[i] = config[i];
        }
    }
    sound.load(src);
    callback && sound.addEventListener(flash.events.SoundEvent.ENDED, callback);

}
/**
 * 音频回收
 * @param type
 * @param audio
 */
fish.audio_pause = function (event) {
    var audio = event.target;
    audio.audiopause();
    audio.removeEventListener(flash.events.SoundEvent.ENDED);
    flash.Pool.addPool("audio", audio);
}
fish.bgmCoin_call = function (event) {
    fish.audio_pause(event);
    fish.config.is_bgmcoin = true;
}
/**
 * 创建大炮
 */
fish.addCannon = function (w, h, img) {
    var x = Stage.width / 2 + 6, y = Stage.height - h, cannon = null;
    if (fish.config.cannon) {
        Stage.removeChild(fish.config.cannon);
    }
    cannon = new flash.display.MovieClip(x, y, new flash.display.BitmapData(w, h, 0, 0, img), 3, null);
    for (var i = 1; i < 5; i++) {
        cannon.addFrame(new flash.display.BitmapData(w, h, 0, i * h, img), null);
    }
    cannon.stop(1);
    cannon.centerY = h / 2;
    cannon.centerX = w / 2;
    Stage.addChild(cannon);
    cannon.asbRotation = 90;
    return cannon;
}
/**
 * 当炮弹超出舞台 直接删除放回对象池
 * 当与鱼碰撞读取鱼的损伤数据与鱼的价格播放鱼死亡动画与价格
 * 并且执行金币的动画
 * 炮弹垃圾箱
 */
fish.trash_bullet = function () {
    var bullet, fishB, coinAni, x, y, w = Stage.width, h = Stage.height;
    //炮弹回收检测是否碰撞并且超出舞台
    for (var i = fish.config.bullets.length - 1; i >= 0; i--) {
        bullet = fish.config.bullets[i];
        x = bullet.stageX;
        y = bullet.stageY;
        if ((x < 0 || x > w || y < 0 || y > h) || fish.hitTest_fish(bullet)) {
            fish.config.bullet_div.removeChild(fish.config.bullets.splice(i, 1)[0]);
            flash.Pool.addPool(bullet.type, bullet);
            if (fish.config.isweb) {
                if (fish.config.is_bgmcoin) {
                    fish.config.is_bgmcoin = false;
                    fish.audio_play("audio", fish.config.audio.bgm_coin_01, fish.bgmCoin_call);
                }
                fish.config.bullet_div.addChild(fish.addWeb(x + bullet.centerX, y - bullet.centerY));
            }
        }
    }
    //对鱼回收检测鱼是否超出舞台
    for (i = fish.config.fishs.length - 1; i >= 0; i--) {
        fishB = fish.config.fishs[i];
        x = fishB.stageX;
        y = fishB.stageY;
        if (x < 0 || x > w || y < 0 || y > h) {
            fish.config.fish_div.removeChild(fish.config.fishs.splice(i, 1)[0]);
            flash.Pool.addPool("fish", fishB);
        }
    }
    for (i = fish.config.coinAni1.length - 1; i >= 0; i--) {
        coinAni = fish.config.coinAni1[i];
        if (Math.abs(420 - coinAni.width - coinAni.stageX) < 5 && Math.abs(Stage.height - coinAni.height - coinAni.stageY) < 5) {
            fish.config.coinAni1.splice(i, 1);
            flash.Pool.addPool("coinAni", coinAni);
            fish.config.bullet_div.removeChild(coinAni);
        } else {
            coinAni.countMove((420 - coinAni.width - coinAni.stageX) / 20, (Stage.height - coinAni.height - coinAni.stageY) / 20);
        }
        coinAni = fish.config.coinAni1[i];
    }
}
/**
 * 是否与鱼碰撞
 */
fish.hitTest_fish = function (bullet) {
    var fishB;
    fish.config.isweb = false;
    for (var i = fish.config.fishs.length - 1; i >= 0; i--) {
        fishB = fish.config.fishs[i];
        if (bullet.hitTestObject(fishB, true)) {
            fishB.gotoAndPlay(5);
            fish.config.trough_ui.width += 4;
            fish.config.isweb = true;
            return true;
            break;
        }
    }
    return false;
}