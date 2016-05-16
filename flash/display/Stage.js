/**
 * Stage 舞台对象控制显示对象管理
 * User: ningxiao
 * Date: 13-3-19
 * Time: 下午3:03
 */
flash.utils.provide("flash.display.Stage");
flash.utils.require("Zepto");
flash.utils.require("flash.events.Event");
flash.utils.require("flash.events.MouseEvent");
flash.utils.require("flash.display.DisplayObject");
flash.display.Stage = function (canvas, frame) {
    flash.display.DisplayObject.apply(this, [0, 0, null]);
    this.stage = Stage;
    this.canvas = canvas || null;
    this.times = null;
    this.movingoElements = null;//移动到当前对象
    this.leaveoElements = null;//离开对象
    this.event = null;
    this.point = this.canvas && flash.utils.getPoint(canvas);
    this.conText = this.canvas ? this.canvas.getContext('2d') : null;
    this.frame = frame || 60;//渲染频率
    this.height = parseInt(canvas.height)//高度
    this.width = parseInt(canvas.width);//宽度
    this.ENTER_FRAME = new flash.events.Event(flash.events.ENTER_FRAME);
    this.MOUSEDOWN = new flash.events.MouseEvent(flash.events.MouseEvent.MOUSEDOWN);
    this.MOUSEOUT = new flash.events.MouseEvent(flash.events.MouseEvent.MOUSEOUT);
    this.MOUSEMOVE = new flash.events.MouseEvent(flash.events.MouseEvent.MOUSEMOVE);
    this.MOUSEOVER = new flash.events.MouseEvent(flash.events.MouseEvent.MOUSEOVER);
    this.MOUSEUP = new flash.events.MouseEvent(flash.events.MouseEvent.MOUSEUP);
    this.CLICK = new flash.events.MouseEvent(flash.events.MouseEvent.CLICK);
    this.DBCLICK = new flash.events.MouseEvent(flash.events.MouseEvent.DBCLICK);
    this.animate = {};
    this.playAnimate = false;
    this.addRouting();
    this.startDraw();
}
flash.utils.inherits(flash.display.Stage, flash.display.DisplayObject);
/**
 * 继承flash.display.DisplayObject 执行开始渲染
 */
flash.display.Stage.prototype.startDraw = function () {
    var child = null;
    this.conText.clearRect(0, 0, this.width, this.height);
    if (this.conText) {//渲染如果对象为舞台则不执行渲染
        for (var i = this.childList.length - 1; i >= 0; i--) {
            child = this.childList[i];
            if (child && child.visible) {
                child.startDraw();
            }
        }
        this.dispatchEvent(this.ENTER_FRAME);
        for(var i in this.animate){
            this.animate[i]();
        }
        requestAnimationFrame(flash.utils.bind(this.startDraw, this));
    }
}
flash.display.Stage.prototype.addAnimate=function(key,animate){
    this.playAnimate = true;
    this.animate[key] = animate;
}
flash.display.Stage.prototype.stopAnimate=function(key){
    this.playAnimate = false;
    if(this.animate[key]){
        this.animate[key] = null;
        delete this.animate[key];
    }
    for(var i in this.animate){
        this.playAnimate = true;
    }
}
/**
 * 继承flash.display.DisplayObject
 * 返回指定点坐标下存在的元素实例
 * @param x
 * @param y
 * @param _this
 * @return {*}
 */
flash.display.Stage.prototype.getObjectsUnderPoint = function (x, y, _this) {
    var z = -1, ind = null, j, k, obj;
    for (var i = 0, l = _this.childList.length; i < l; i++) {
        var child = _this.getChildAt(i);
        if (child && child.visible && child.hitTestPoint(x, y)) {
            if (child.zIndex > z) {
                z = child.zIndex;
                ind = i;
            }
        }
    }
    if (ind != null) {
        obj = _this.childList[ind];
        if (obj instanceof flash.display.Button) {
            j = x - obj.stageX;
            k = y - obj.stageY;
            if (!obj.bitmapData.hitTest(j, k)) {
                return false;
            }
        }
        if (obj.childList.length > 0) {
            var obs = this.getObjectsUnderPoint.call(this, x, y, obj);
            return obs == Stage ? obj : obs;
        } else {
            return  obj;
        }
    }
    return Stage;
}
flash.display.Stage.prototype.addRouting = function(){
    this.isMobile = flash.utils.checkMobile(); //是否是移动平台
    if(this.isMobile){
        Zepto(this.canvas).on(flash.events.MouseEvent.TOUCHSTART,this.dispatcherRouting);
        Zepto(this.canvas).on(flash.events.MouseEvent.TOUCHMOVE,this.dispatcherRouting);
        Zepto(this.canvas).on(flash.events.MouseEvent.TOUCHEND,this.dispatcherRouting);
    }else{
        this.canvas.onclick = this.canvas.onmouseup = this.canvas.onmouseout = this.canvas.onmousemove = this.canvas.onmousedown = this.dispatcherRouting;
    }
}
flash.display.Stage.prototype.dispatcherRouting = function(event){
    event = event || window.event;
    if (Stage.isMobile) {
        if (event["touches"] && event["touches"].length == 1) {
            Stage.mouseX = event["touches"][0].clientX;
            Stage.mouseY = event["touches"][0].clientY;
        }
    } else {
        Stage.mouseX = event.offsetX || event.layerX;
        Stage.mouseY = event.offsetY || event.layerY;
    }
    Stage.movingoElements = Stage.getObjectsUnderPoint(Stage.mouseX, Stage.mouseY, Stage);
    switch (event.type) {
        case flash.events.MouseEvent.MOUSEMOVE:
        case flash.events.MouseEvent.TOUCHMOVE:
            Stage.event = Stage.MOUSEMOVE;
            break;
        case flash.events.MouseEvent.CLICK:
        case flash.events.MouseEvent.TOUCHEND:
            Stage.event = Stage.CLICK;
            break;
        case flash.events.MouseEvent.MOUSEDOWN:
        case flash.events.MouseEvent.TOUCHSTART:
            Stage.event = Stage.MOUSEDOWN;
            break;
        case flash.events.MouseEvent.MOUSEUP:
            Stage.event = Stage.MOUSEUP;
            break;
        case flash.events.MouseEvent.MOUSEOUT:
            Stage.event = Stage.MOUSEOUT;
            break;
        default:
            break;
    }
    Stage.movingoElements.EventCall(Stage.event);
    if (Stage.leaveoElements && Stage.leaveoElements != Stage.movingoElements) {
        Stage.event = Stage.MOUSEOUT;
        Stage.leaveoElements.EventCall(Stage.event);
    }
    Stage.leaveoElements = Stage.movingoElements;
    event.preventDefault();
    event.stopPropagation ?event.stopPropagation() : (event.cancelBubble=true);
}