flash.utils.provide("playsound");
flash.utils.require("flash.media.Sound");
flash.utils.require("flash.events.SoundEvent");
playsound.userAgent = navigator.userAgent.toString();
playsound.switch = true;
playsound.soundlist = [];
playsound.init = function(){
    var url = 'http://192.168.204.61/sound/neointro.ogg',sound = new flash.media.Sound();
    var audiodata = {win: {start: 0,length: 46}};
    sound.addEventListener(flash.events.SoundEvent.CANPLAY, function (event) {
        console.log("准备完毕", event.target.GetDuration());
    })
    sound.addEventListener(flash.events.SoundEvent.PLAY, function (event) {
        console.log("播放", event.target);
    })
    sound.addEventListener(flash.events.SoundEvent.PAUSE, function (event) {
        console.log("暂停", event.target);
    })
    sound.addEventListener(flash.events.SoundEvent.ENDED, function (event) {
        console.log("结束", event.target);
    })
    sound.addEventListener(flash.events.ERROR, function (event) {
        console.log("异常", event.target);
    })
    sound.addEventListener(flash.events.SoundEvent.TIMEUPDATE, function (event) {
    	var audio = event.target;
	    if (audio.GetTime() >= audiodata.win.start + audiodata.win.length) {
    		audio.SetTime(0);        
	    }
    })   
    if (playsound.userAgent.indexOf("Safari") != -1) {
    	url = url.replace(/\.ogg/, ".mp3");
    }   
    sound.load(url);
    sound.audioplay();	
}
playsound.switchsound = function(){
    var url = 'http://192.168.204.61/sound/explosion.ogg';
    var sound,audiodata = {win: {start: 0,length: 2}};
    if(playsound.soundlist.length){
    	sound = playsound.soundlist.shift();
    	if(sound.GetPaused()){
    		sound.SetTime(0);
    		sound.audioplay();
    	}   	
    }else{
	    sound = new flash.media.Sound();
	    sound.addEventListener(flash.events.SoundEvent.CANPLAY, function (event) {
	       console.log("准备完毕", event.target.GetDuration());
	    })
	    sound.addEventListener(flash.events.SoundEvent.PLAY, function (event) {
	        //console.log("播放", event.target);
	    })
	    sound.addEventListener(flash.events.SoundEvent.PAUSE, function (event) {
	        //console.log("暂停", event.target);
	    })
	    sound.addEventListener(flash.events.SoundEvent.ENDED, function (event) {
	        //console.log("结束", event.target);
	    })
	    sound.addEventListener(flash.events.ERROR, function (event) {
	        //console.log("异常", event.target);
	    })
	    sound.addEventListener(flash.events.SoundEvent.TIMEUPDATE, function (event) {
	    	var audio = event.target;
		    if (audio.GetTime() >= audiodata.win.start + audiodata.win.length) {
		        audio.audiopause();
		        playsound.soundlist.push(audio);
		    }
	    })	 
	    if (playsound.userAgent.indexOf("Safari") != -1) {
	    	url = url.replace(/\.ogg/, ".mp3");
	    } 	      
	    sound.load(url);
	    sound.audioplay();
    }
}
document.addEventListener("touchstart",function(event){
	if(playsound.switch){
		playsound.switch = false;
		playsound.init();
	}else{
		playsound.switchsound();
	}
	event.preventDefault();   
});   