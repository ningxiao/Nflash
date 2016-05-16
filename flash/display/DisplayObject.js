/**
 * 显示列表中的所有对象的基类
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午1:57
 */
flash.utils.provide("flash.display.DisplayObject");
flash.utils.require("flash.profile");
flash.utils.require("flash.display.Graphics");
flash.utils.require("flash.events.MouseEvent");
flash.utils.require("flash.events.EventDispatcher");
flash.display.DisplayObject = function (x, y, bitmapData) {
    flash.events.EventDispatcher.apply(this, arguments);
    this.stage = Stage;   //显示对象的舞台
    this.alpha = 1;//透明度0到1之间
    this.buttonMode = false;//是否显示鼠标手型
    this.bitmapData = bitmapData || {};
    this.height = this.bitmapData.height || 0;//高度
    this.width = this.bitmapData.width || 0;//宽度
    this.swidth = this.bitmapData.swidth || 0;//剪切宽度
    this.sheight = this.bitmapData.sheight || 0;//剪切高度
    this.mask = false;//调用显示对象被指定的 mask 对象遮罩。
    this.clip = false;//调用显示对象的子对象去剪切
    this.mouseX = 0;//指示鼠标位置的 x 坐标，以像素为单位。
    this.mouseY = 0;//指示鼠标位置的 y 坐标，以像素为单位。
    this.name = null;//指示 DisplayObject 的实例名称。
    this.parent = this;//当前  DisplayObject 的实例的父级对象
    this.rotation = 0; // 指示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
    this.asbRotation = 0;//修正角度例如图片是竖直变为0度状态需要修正90旋转
    this.scaleX = 1;//指示从注册点开始应用的对象的水平缩放比例值比 1.0 小表示缩小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。
    this.scaleY = 1;//指示从对象注册点开始应用的对象的垂直缩放比例 1.0 小表示缩小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。
    this.scrollRect = null;//显示对象的滚动矩形范围。
    this.visible = true;//显示对象是否可见。
    this.x = x || 0;//当前对象x坐标
    this.y = y || 0;//当前对象y坐标
    this.numChildren = 0;//子对象数目
    this.mouseChildren = true;//确定对象的子项是否支持鼠标
    this.childList = [];//子对象列表
    this.tabChildren = false;//确定对象的子项是否支持 Tab 键。
    this.zMax = 0;//当前最大层
    this.zIndex = 0;//当前对象层级关系
    this.imgData = this.bitmapData.imgData || false;//绘制数据
    this.conText = this.stage ? this.stage.conText : false;//绘制信息画布
    this.userData = {};//自定义数据
    this.stageX = this.x;//相对于舞台x坐标
    this.stageY = this.y;//相对于舞台Y坐标
    this.centerX = 0;//显示对象的注册点坐标
    this.centerY = 0;//显示对象的注册点坐标
    this.startX = this.stageX;//给移动专用 运动开始的点X
    this.startY = this.stageX;//给移动专用 运动开始的点Y
    this.speedX = 0;//x坐标速度
    this.speedY = 0;//y坐标速度
    this.speed = 0;//显示对象移动速度
    this.step = 0;//移动专用得知目标移动次数
    this.offsetX = this.bitmapData.offsetX || 0;//位图信息偏移X
    this.offsetY = this.bitmapData.offsetY || 0;//位图信息偏移Y
    this.stopDrag = false;//设置是否允许拖动
    this.useHandCursor = false;//布尔值，指示当鼠标滑过其 buttonMode 属性设置为 true 的 sprite 时是否显示手指形（手形光标）。
    this.isemoves = false;//鼠标是否移入该对象
    this.operAtion = flash.profile.operAtion["DESTINATIONIN"]; // 遮罩属性
    this.disX = 0;
    this.disY = 0;
    this.isemoves = false;//鼠标是否移入该对象
    this.graphics = new flash.display.Graphics(this.conText, this);
}
flash.utils.inherits(flash.display.DisplayObject, flash.events.EventDispatcher);
flash.display.DisplayObject.prototype.startDraw = function () {
    var child = null;
    if (this.conText) {//渲染如果对象为舞台则不执行渲染
        this.stageX = this.parent.stageX + this.x;//相对于舞台x坐标
        this.stageY = this.parent.stageY + this.y;//相对于舞台x坐标
        this.renderer();
    }
    for (var i = this.childList.length - 1; i >= 0; i--) {
        child = this.childList[i];
        if (child && child.visible) {
            child.startDraw();
        }
    }
}
/**
 * 执行舞台分发的事件
 * @param event
 * @constructor
 */
flash.display.DisplayObject.prototype.EventCall = function (event) {
    switch (event.type) {
        case flash.events.MouseEvent.MOUSEDOWN:
            this.dispatchEvent(event);
            break;
        case flash.events.MouseEvent.MOUSEUP:
            this.dispatchEvent(event);
            break;
        case flash.events.MouseEvent.CLICK:
            this.dispatchEvent(event);
            break;
        case flash.events.MouseEvent.MOUSEMOVE:
            if (!this.isemoves) {
                this.useHandCursor && (Stage.canvas.style.cursor = "pointer");
                this.dispatchEvent(Stage.MOUSEOVER);
                this.isemoves = true;
            } else {
                this.dispatchEvent(event);
            }
            break;
        case flash.events.MouseEvent.MOUSEOUT:
            if (this.isemoves) {//移除画布
                this.useHandCursor && (Stage.canvas.style.cursor = "");
                this.dispatchEvent(event);
                this.isemoves = false;
            }
            break;
        default:
            break;
    }
}
/**
 * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。
 * @param child   必须继承DisplayObject对象
 */
flash.display.DisplayObject.prototype.addChild = function (child) {
    if (child && child instanceof flash.display.DisplayObject) {
        child.zIndex = this.zMax;
        child.stageX = this.x + child.x;
        child.stageY = this.y + child.y;
        child.startX = child.stageX;
        child.startY = child.stageY;
        child.parent = this;
        this.zMax++;
        this.numChildren++;
        this.childList.push(child);
        this.sortZindex();
    } else {
        alert("当前对象没有继承DisplayObject")
    }
}
/**
 * 设置元素坐标 x
 * @param x
 */
flash.display.DisplayObject.prototype.setX = function (x) {
    if (x) {
        this.x = x;
    }
    this.stageX = this.parent.stageX + this.x;//相对于舞台x坐标
    this.graphics.setX();
    this.setChildXY();
}
/**
 * 设置元素坐标 y
 * @param y
 */
flash.display.DisplayObject.prototype.setY = function (y) {
    if (y) {
        this.y = y;
    }
    this.stageY = this.parent.stageY + this.y;//相对于舞台Y坐标
    this.graphics.setY();
    this.setChildXY();
}
/**
 * 执行矢量移动y
 * @param vector
 */
flash.display.DisplayObject.prototype.setVector = function (vector) {
    if (vector && vector instanceof flash.Vector2) {
        this.x = vector.x;
        this.y = vector.y;
        this.stageX = this.parent.stageX + this.x;//相对于舞台x坐标
        this.stageY = this.parent.stageY + this.y;//相对于舞台Y坐标
        this.graphics.setX();
        this.graphics.setY();
        this.setChildXY();
    }
}
/**
 * 当修改元素x与y坐标通知该元素的子元素修改坐标
 */
flash.display.DisplayObject.prototype.setChildXY = function () {
    for (var i = 0, l = this.childList.length; i < l; i++) {
        var child = this.getChildAt(i);
        if (child) {
            child.setX(0);
            child.setY(0);
        }
    }
}
/**
 * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。
 * @param child 必须继承DisplayObject对象
 * @param index  设置Zindex值
 */
flash.display.DisplayObject.prototype.addChildAt = function (child, index) {
    if (index >= this.zMax) {
        this.addChild(child);
    } else {
        //需要后续补全在已有显示列表中间插入显示对象代码
    }
}
/**
 *  确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。
 * @param child    必须继承DisplayObject对象
 * @return {Boolean}
 */
flash.display.DisplayObject.prototype.contains = function (child) {
    if (this == child) {
        return true;
    }
    return false;
}
/**
 * 返回位于指定索引处的子显示对象实例。
 * @param index  索引值
 * @return {*} DisplayObject对象
 */
flash.display.DisplayObject.prototype.getChildAt = function (index) {
    var obj = null;
    if (this.numChildren > 0 && index < this.childList.length) {
        obj = this.childList[index];
        return obj;
    } else {
        return obj;
    }
}
/**
 * 返回具有指定名称的子显示对象。
 * @param name 对象名称
 * @return {*} DisplayObject对象
 */
flash.display.DisplayObject.prototype.getChildByName = function (name) {
    var obj = null;
    for (var i in this.childList) {
        if (this.childList[i].name == name) {
            obj = this.childList[i];
            break;
        }
    }
    return obj;
}
/**
 * 计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。
 * @param x 坐标点X
 * @param y 坐标点Y
 * @return {Boolean} true 或者false
 */
flash.display.DisplayObject.prototype.hitTestPoint = function (x, y) {
    if (this.stageX <= x && x <= this.stageX + this.width && this.stageY <= y && y <= this.stageY + this.height) {
        return true;
    }
    return false;
};
/***
 * 返回指定点坐标下存在的元素实例
 * x,y 坐标值 index为返回显示列表的层级关系
 * @param x 舞台坐标X
 * @param y 舞台坐标Y
 * @param isbo true时返回碰撞具体对象 /fasle时返回碰撞对象集合
 * @return {*}
 */
flash.display.DisplayObject.prototype.getObjectsUnderPoint = function (x, y, isbo) {
    var unDs = [], isb = isbo || false, z = -1, ind = null;
    for (var i = 0, l = this.childList.length; i < l; i++) {
        var child = this.getChildAt(i);
        if (child && child.hitTestPoint(x, y)) {
            if (isb) {
                if (child.zIndex > z) {
                    z = child.zIndex;
                    ind = i;
                }
            } else {
                unDs.push(child);
            }
        }
    }
    if (isb && ind != null) {
        return this.childList[ind];
    }
    if (unDs.length > 0) {
        return unDs;
    }
    return false;
};
/**
 * 取得当前对象的矩形信息
 * @return {Object} x,y,width,heigth
 */
flash.display.DisplayObject.prototype.getRect = function () {
    return {x: this.x, y: this.y, width: this.width, height: this.height};
}
/**
 *
 * @param obj  DisplayObject对象
 * @param type  是否返回左上角距离值
 * @return {*} true 返回碰撞结果为布尔值 / fasle 返回碰撞的距离结果值
 */
flash.display.DisplayObject.prototype.hitTestObject = function (obj, type) {
    var L1 = this.stageX, R1 = L1 + this.width;
    var T1 = this.stageY, B1 = T1 + this.height;
    var L2 = obj.stageX, R2 = L2 + obj.width;
    var T2 = obj.stageY, B2 = T2 + obj.height;
    if (R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2) {
        return false;
    } else {
        if (type) {
            return true;
        }
        return parseInt(Math.sqrt(Math.pow((L1 - L2), 2) + Math.pow((T1 - T2), 2)));
    }
}
/**
 *
 * @param child   DisplayObject的子对象
 * @return {*}
 */
flash.display.DisplayObject.prototype.removeChild = function (child) {
    var obj = null;
    if (child && child instanceof flash.display.DisplayObject) {
        for (var i = 0, l = this.childList.length; i < l; i++) {
            if (this.childList[i] == child) {
                this.childList.splice(i, 1);
                this.numChildren--;
                obj = child;
                break;
            }
        }
        return obj;
    } else {
        alert("当前对象没有继承DisplayObject")
    }
}
flash.display.DisplayObject.prototype.removeChildAt = function (index) {

}
flash.display.DisplayObject.prototype.setChildIndex = function (child, index) {
    if (index >= this.zMax) {
        child.zIndex = index;
        this.zMax = index;
    } else {
        for (var i = 0, l = this.childList.length; i < l; i++) {
            if (this.childList[i].zIndex == index) {
                this.childList[i].zIndex = child.zIndex;
                child.zIndex = index;
            }
        }
    }
    this.sortZindex();
}
/**
 * 修改当前容器里面的层级与排序关系降序排列保证层级最高在第一个
 **/
flash.display.DisplayObject.prototype.sortZindex = function () {
    var l = this.childList.length;
    if (l > 1) {
        function fn(key) {
            return function (v1, v2) {
                return v2[key] - v1[key];
            }
        }

        this.childList.sort(fn("zIndex"));
    }
};
/**
 * 拖动显示对象元素 显示对象的stopDrag 必须为true
 * @param ofx
 * @param ofy
 * @param bounds 限制拖拽对象可以移动的区域  Rectangle
 */
flash.display.DisplayObject.prototype.startDrag = function (ofx, ofy, bounds) {
    if (this.stopDrag) {
        ofx = ofx - this.disX;
        ofy = ofy - this.disY;
        if (bounds) {
            if (ofx >= bounds.x && ofx + this.width <= bounds.width) {
                this.stageX = ofx;
                this.x = ofx - this.parent.stageX;
            }
            if (ofy >= bounds.y && ofy + this.height <= bounds.height) {
                this.stageY = ofy;
                this.y = ofy - this.parent.stageY;
            }
        } else {
            this.stageX = ofx;
            this.x = ofx - this.parent.stageX;
            this.stageY = ofy;
            this.y = ofy - this.parent.stageY;
        }
    }
};
/**
 * 移动显示对象
 * @param ofx
 * @param ofy
 */
flash.display.DisplayObject.prototype.countMove = function (ofx, ofy) {
    //修补bug当角度为零的时候移动
    if (ofx && ofy) {
        this.stageX = this.stageX + ofx;
        this.stageY = this.stageY + ofy;
    } else {
        this.step++;
        this.stageY = this.startY + Math.round(this.speed * this.step * Math.sin(this.rotation * Math.PI / 180));
        this.stageX = this.startX + Math.round(this.speed * this.step * Math.cos(this.rotation * Math.PI / 180));
    }
    this.x = this.stageX - this.parent.stageX;
    this.y = this.stageY - this.parent.stageY;
};
/**
 * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）。
 * @param child1 交换甲方
 * @param child2 交换已方
 */
flash.display.DisplayObject.prototype.swapChildren = function (child1, child2) {
    var z = 0;
    if (child1 && child2) {
        z = child1.zIndex;
        child1.zIndex = child2.zIndex;
        child2.zIndex = z;
        this.sortZindex();
    }
};
/**
 * 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。
 * @param index1
 * @param index2
 */
flash.display.DisplayObject.prototype.swapChildrenAt = function (index1, index2) {

}
/**
 * 旋转角度
 **/
flash.display.DisplayObject.prototype.rotationStage = function () {
    this.conText.translate(this.stageX + this.centerX, this.stageY + this.centerY);
    this.conText.rotate((this.rotation + this.asbRotation) * Math.PI / 180);
}
/**
 * 设置速度
 * @param rotation
 */
flash.display.DisplayObject.prototype.set_rotation = function (rotation) {
    this.rotation = rotation;
    this.calculateSpeed();
}
/**
 * 计算x与y坐标的速度分量
 */
flash.display.DisplayObject.prototype.calculateSpeed = function () {
    this.speedX = parseInt(this.speed * Math.cos(this.rotation * Math.PI / 180));
    this.speedY = parseInt(this.speed * Math.sin(this.rotation * Math.PI / 180));
}
/***
 * 绘制舞台图像 如果是序列动画播放序列动画
 * @param x 绘制坐标 X
 * @param y 绘制坐标Y
 */
flash.display.DisplayObject.prototype.drawImage = function (x, y) {
    this.conText.drawImage(this.imgData, this.offsetX, this.offsetY, this.swidth, this.sheight, x, y, this.width, this.height);
}
/**
 * 指定一个对象是来遮罩
 * @param child DisplayObject对象并且是被遮罩对象子类
 */
flash.display.DisplayObject.prototype.drawMask = function (child) {
    if (child.parent == child) {
        this.addChild(child); //继续修改
    }
    if (child && (child instanceof flash.display.DisplayObject) && child.parent == this) {
        child.mask = true;
    } else {
        alert("当前对象没有继承DisplayObject")
    }
}
/**
 * 指定一个显示对象的区域剪切
 * @param child  DisplayObject对象并且是被剪切对象子类
 */
flash.display.DisplayObject.prototype.drawClip = function (child) {
    if (child && (child instanceof flash.display.DisplayObject) && child.parent == this) {
        child.clip = true;
    } else {
        alert("当前对象没有继承DisplayObject")
    }
}
/**
 * 设置透明度
 * @param value 0-1透明度
 */
flash.display.DisplayObject.prototype.drawAlpha = function (value) {
    this.alpha = value > 1 ? 1 : (value < 0 ? 0 : value);
    if (this.alpha == 0) {//当透明度为零可以认为是不可见
        this.visible = false;
    } else {
        this.visible = true;
    }
}
/**
 * 渲染图像缩放  存在bug等待修改和解决方案
 */
flash.display.DisplayObject.prototype.scaleImage = function () {
    if (this.scaleX != 1 || this.scaleY != 1) {
        this.conText.scale(this.scaleX, this.scaleY);
    }
}
/**
 *核心渲染器
 */
flash.display.DisplayObject.prototype.renderer = function () {
    this.conText.save();//保存画笔状态
    if (this.rotation) {
        this.rotationStage();// 旋转角度
        if (this.speed) {
            this.countMove(); //是否移动对象
        }
    }
    if (this.alpha != 1) { //设置对象透明度当等于1的时候不用渲染它会自动回到默认
        this.conText.globalAlpha = this.alpha;
    }
    //this.scaleImage();//设置放大缩小存在小bug等待优化
    if (this.mask) { //设置遮罩
        this.conText.globalCompositeOperation = this.operAtion;
    }
    if (this.imgData) {
        if (this.rotation) {//绘制图像
            this.drawImage(-this.centerX, -this.centerY);//当需要旋转的绘制注册点
        } else {
            this.drawImage(this.stageX, this.stageY);
        }
    }
    //等待下期优化是否在空对象上面渲染
    this.graphics.renderer();
    if (this.clip) {//设置剪切
        this.clip();
    }
    this.conText.restore();//绘制结束以后，恢复画笔状态
}
