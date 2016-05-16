/**
 * 整蛊车神入口函数
 * User: ningxiao
 * Date: 13-8-17
 * Time: 上午9:29
 */
Stage = new flash.display.Stage(document.getElementById('canvas'), 40);
flash.utils.queueImg(car.urls, car.bitmaps, function () {
    car.content = document.getElementById("content");
    for(var i= 1;i<5;i++){
        car.panels.push({"val":"宁肖"+i,"ioc":car.bitmaps["avatar"+i],"numberIoc":car.bitmaps["number"+i]});
    }
    car.layout();
});
car.layout = function(){
    car.guide = new car.guide_ui(0,0,{ width:800,height:600});
    Stage.addChild(car.guide);
    car.guide.addEventListener(CarEvent.START,car.startGame);
}
/**
 * 开始游戏删除引导界面
 * @param event
 */
car.startGame = function(event){
    Stage.removeChild(car.guide);
    car.content.style.display = "none";
    car.background = new flash.display.Sprite(0,40,new flash.display.BitmapData(1440,333,0,0,car.bitmaps["background"]));
    Stage.addChild(car.background);
    Stage.addChild(new flash.display.Sprite(0,370,new flash.display.BitmapData(800,180,0,0,car.bitmaps["road"])));
    for(var i=0;i<3;i++){
        Stage.addChild(new car.panel_ui (i*(266+2),0,new flash.display.BitmapData(266,143,0,0,car.bitmaps["smallwindow"]),car.panels[i]));
    }
    Stage.addChild(new car.props_ui(10,200,{width:50,height:240}));
    Stage.addChild(new car.panel_ui (-3,600 - 62,new flash.display.BitmapData(313,65,0,0,car.bitmaps["msg"]),car.panels[3]));
}
