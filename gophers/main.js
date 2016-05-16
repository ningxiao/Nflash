Stage = new flash.display.Stage(document.getElementById('canvas'), 40);
flash.utils.queueImg(gophers.urls, gophers.bitmaps, function () {
    gophers.init();
});
gophers.init = function(){
	var uid,sum = 0.1;
	gophers.background = new flash.display.Sprite(0,0,new flash.display.BitmapData(gophers.StageW, gophers.StageH, 0, 0, gophers.bitmaps["star_bg"]));
	gophers.loading_ui = new gophers.loading((gophers.StageW-522)/2,200,null,2);
	Stage.addChild(gophers.background);
	Stage.addChild(gophers.loading_ui);
	uid = setInterval(function(){
		if(sum>=1){
			gophers.loading_ui.progress(1);
			clearInterval(uid);
			gophers.layout();
		}else{
			sum+=0.02;
			gophers.loading_ui.progress(sum);
		}
	},100);
}
gophers.layout = function(){
	Stage.removeChild(gophers.loading_ui);
	gophers.bepanel_ui = new gophers.bepanel(0,0,null,gophers.guizi[0]);
	Stage.addChild(gophers.bepanel_ui);
}