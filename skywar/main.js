/**
 * 捕鱼达人入口类
 * User: ningxiao
 * Date: 13-7-3
 * Time: 下午3:46
 * To change this template use File | Settings | File Templates.
 */
flash.utils.provide("skywar"); 
flash.utils.require("skywar.config");
flash.utils.require("flash.Pool");
flash.utils.require("flash.media.Sound");
flash.utils.require("flash.events.Event");
flash.utils.require("flash.display.Stage");
flash.utils.require("flash.display.Sprite");
flash.utils.require("flash.display.Button");
flash.utils.require("flash.events.SoundEvent");
flash.utils.require("flash.events.MouseEvent");
flash.utils.require("flash.display.MovieClip");
flash.utils.require("flash.display.BitmapData");
flash.utils.require("skywar.ui.Airship");
flash.utils.require("skywar.ui.Swarm");

skywar.airship = null;
skywar.beepanel = null;
skywar.beemap = null;
skywar.beelist = null;
skywar.plasmawpanel = null;
skywar.beeplasmaws = [];
skywar.skyplasmaws = [];
skywar.originalx = 0;
skywar.plasmawcount = 0;
skywar.skin = function(){
    var airshipx = (skywar.config.width - skywar.config.airship_width)/2;
    var airshipy = skywar.config.height - skywar.config.airship_height;
    var beepanelw = skywar.config.bee_width * skywar.config.bee_column;
    var beepanelh = skywar.config.bee_height * skywar.config.bee_row;
    var beepanelx = (Stage.width - beepanelw)/2;
    if (skywar.config.userAgent.indexOf("Safari") != -1) {
        for (var i in skywar.config.audios) {
            skywar.config.audios[i] = skywar.config.audios[i].replace(/\.ogg/, ".mp3");
        }
    }    
    skywar.beepanel = new flash.display.Sprite(beepanelx, skywar.config.beepanel_y, {height: beepanelh, width: beepanelw});
    skywar.airship = new skywar.ui.Airship(airshipx,airshipy);
    skywar.plasmawpanel = new flash.display.Sprite(0, 0, {height: Stage.height, width: Stage.width});
    Stage.addChild(new flash.display.Sprite(0,0, new flash.display.BitmapData(Stage.width, Stage.height,0, 0, skywar.config.bitmaps["bg"],250,250)));    
    Stage.addChild(skywar.plasmawpanel);
    Stage.addChild(skywar.beepanel);
    Stage.addChild(skywar.airship);
    skywar.createbee();  
    skywar.config.canvas.addEventListener("touchstart",skywar.touchstart);   
}
skywar.createbee = function(){
    var bee,beex,beey,queue,beew = skywar.config.bee_width,beeh = skywar.config.bee_height;
    skywar.beemap = {};
    skywar.beelist = [];
    for(var i =0;i<skywar.config.bee_column;i++){
        beex = i*beew;
        queue = [];
        for(var l = 0;l<skywar.config.bee_row;l++){
            beey = l*beeh;
            bee = new skywar.ui.Swarm(beex,beey); 
            skywar.beepanel.addChild(bee);
            skywar.beelist.push(bee);
            queue.push(bee);
        }
        skywar.beemap[(bee.stageX+beew/2)] = queue;
    }
}
skywar.touchstart = function(event){
    // var movex = event.touches[0].pageX;
    // if(movex>skywar.config.width/2){
    //     skywar.airship.x+=20;
    // }else{
    //     skywar.airship.x-=20;
    // }
    skywar.originalx = event.touches[0].pageX;
    skywar.config.canvas.addEventListener("touchend",skywar.touchend);
    skywar.config.canvas.addEventListener("touchmove",skywar.touchmove);
    event.preventDefault();  
}
skywar.touchmove = function(event){
    var movex = event.touches[0].pageX;// - skywar.config.airship_width /2;  
    if(skywar.originalx>movex){
        skywar.airship.x = skywar.airship.x - (skywar.originalx - movex);
    }else{
        skywar.airship.x = skywar.airship.x + (movex - skywar.originalx);
    }
    skywar.originalx = movex;
    event.preventDefault();      
}
skywar.touchend = function(event){
    skywar.config.canvas.removeEventListener("touchend",skywar.touchend);
    skywar.config.canvas.removeEventListener("touchmove",skywar.touchmove);
    event.preventDefault();  
}
skywar.blastsound = function(event){
    var audiodata,sound = new flash.media.Sound();
        audiodata = {start: 0,end: 0};
        sound.load(skywar.config.audios.explosion);
        sound.addEventListener(flash.events.SoundEvent.CANPLAY, function (event) {
            audiodata.end = sound.GetDuration()-1;
            sound.audiopause();
        })
        sound.addEventListener(flash.events.SoundEvent.TIMEUPDATE, function (event) {
            var audio = event.target;
            if (audio.GetTime() >= audiodata.start + audiodata.end) {
                audio.SetTime(0);        
                sound.audiopause();
            }
        }); 
        sound.audioplay();
        skywar.config.blastsound = sound;
}
skywar.backgsound = function(event){
    var sound = new flash.media.Sound(),audiodata = {start: 0,end: 0};
    sound.load(skywar.config.audios.neointro);
    sound.addEventListener(flash.events.SoundEvent.CANPLAY, function (event) {
        audiodata.end = sound.GetDuration()-5;
    })
    sound.addEventListener(flash.events.SoundEvent.TIMEUPDATE, function (event) {
        var audio = event.target;
        if (audio.GetTime() >= audiodata.start + audiodata.end) {
            audio.SetTime(0);        
        }
    });
    sound.audioplay();           
}
skywar.playsound = function(event){
    skywar.backgsound(event);
    skywar.blastsound(event);
    skywar.config.canvas.removeEventListener("touchstart",skywar.playsound);
    Stage.addEventListener(flash.events.ENTER_FRAME, skywar.onenterframe);   
}
skywar.attackarea = function(){
    var airshipx = skywar.airship.x + skywar.airship.width/2,airshipw = skywar.config.airship_width/skywar.config.diff;
    var arr,list = [],maxx = airshipx + airshipw,minx = airshipx - airshipw;
    if(!skywar.airship.isdeath){
        for(var key in skywar.beemap){
            if(key>= minx && key <= maxx){
                arr = skywar.beemap[key];
                if(arr.length){
                    list.push(arr[arr.length-1]);
                    if(list.length == 0){
                        list = null;
                        delete skywar.beemap[key];
                    }                
                }
            }
        }
    }
    return list.length?list:null;
}
skywar.createbeeplasmaw = function(){
    var bee,exp,expx,expy,expw = skywar.config.beeplasmaw,exph = skywar.config.beeplasmah,list = skywar.attackarea();
    if(list){
        for(var i=0;i<list.length;i++){
            bee = list[i]; 
            expx = bee.stageX + (bee.width + expw)/2;
            expy = bee.stageY + bee.height + skywar.config.beeplasmatop;
            exp = flash.Pool.getPool("beeplasma");
            if(exp){
                exp.x = expx;
                exp.y = expy;
            }else{
                exp = new flash.display.Sprite(expx,expy, new flash.display.BitmapData(expw, exph,0, 0, skywar.config.bitmaps["plasma_red"],expw, exph));
                exp.rotation = skywar.config.rotation; 
            }
            skywar.plasmawpanel.addChild(exp);
            skywar.beeplasmaws.push(exp);
        }
        bee = skywar.airship; 
        expx = (bee.stageX + bee.width/2) - (expw/2);
        expy = bee.stageY + skywar.config.beeplasmatop;
        exp = flash.Pool.getPool("skyplasma");
        if(exp){
            exp.x = expx;
            exp.y = expy;
        }else{
            exp = new flash.display.Sprite(expx,expy, new flash.display.BitmapData(expw, exph,0, 0, skywar.config.bitmaps["plasma_white"],expw, exph));
        }
        skywar.plasmawpanel.addChild(exp);
        skywar.skyplasmaws.push(exp);        
    }
}
skywar.drawbeeplasmaw = function(){
    var list,index,bee,plasmaw,centerx,centery,stagew,stageh,isbool = false,maxh = Stage.height + skywar.config.beeplasmah;
    for (var i = skywar.beeplasmaws.length - 1; i >= 0; i--) {
        plasmaw = skywar.beeplasmaws[i];
        if(plasmaw.y >= maxh){
            skywar.plasmawpanel.removeChild(plasmaw);
            flash.Pool.addPool("beeplasma",plasmaw);
            skywar.beeplasmaws.splice(i, 1);
        }else{
            isbool = false;
            centerx = plasmaw.x - plasmaw.width/2;
            centery = plasmaw.y - plasmaw.height/2;  
            stagew = skywar.airship.x + skywar.airship.width;
            stageh = skywar.airship.y + skywar.airship.height;                 
            if((centerx > skywar.airship.x && centerx < stagew) && (centery > skywar.airship.y && centery < stageh)){
                isbool = true;
                skywar.airship.cutlife();
                skywar.airship.death();
            }
            if(isbool){
                skywar.plasmawpanel.removeChild(plasmaw);
                flash.Pool.addPool("beeplasma",plasmaw);
                skywar.beeplasmaws.splice(i, 1);
            }else{
                plasmaw.y += skywar.config.beespeed;
            }
        }     
    }
    for (i = skywar.skyplasmaws.length - 1; i >= 0; i--) {
        plasmaw = skywar.skyplasmaws[i];
        if(plasmaw.y <= -skywar.config.beeplasmah){
            skywar.plasmawpanel.removeChild(plasmaw);
            flash.Pool.addPool("skyplasma",plasmaw);
            skywar.skyplasmaws.splice(i, 1);
        }else{
            centerx = plasmaw.stageX + plasmaw.width/2;
            centery = plasmaw.stageY + plasmaw.height/2;
            isbool = false;
            for(var k = skywar.beelist.length - 1; k >= 0; k--){
                bee = skywar.beelist[k];
                stagew = bee.stageX + bee.width;
                stageh = bee.stageY + bee.height;
                if((centerx > bee.stageX && centerx < stagew) && (centery > bee.stageY && centery < stageh)){
                    isbool = true;
                    bee.death();
                    if(skywar.config.blastsound.GetPaused()){
                        skywar.config.blastsound.audioplay();                        
                    }
                    skywar.beelist.splice(k, 1);
                    break;
                }
            }
            if(isbool){
                for(var key in skywar.beemap){
                    list = skywar.beemap[key];
                    for(k=0;k<list.length;k++){
                        if(list[k] == bee){
                            list.splice(k, 1);
                        }
                    }
                }
                skywar.plasmawpanel.removeChild(plasmaw);
                flash.Pool.addPool("skyplasma",plasmaw);
                skywar.skyplasmaws.splice(i, 1);
            }else{
                plasmaw.y -= skywar.config.beespeed;
            }
        }     
    }         
}
skywar.onenterframe = function(){
    skywar.plasmawcount++;
    skywar.drawbeeplasmaw();
    if((skywar.plasmawcount%skywar.config.count)==0){
        skywar.createbeeplasmaw();
        skywar.plasmawcount = 0;
    }     
    // if(skywar.airship.isdeath){
    //     skywar.config.canvas.removeEventListener("touchend",skywar.touchend);
    //     skywar.config.canvas.removeEventListener("touchmove",skywar.touchmove);        
    //     skywar.config.canvas.removeEventListener("touchstart",skywar.touchstart);   
    // }
    // if(skywar.beelist.length == 0){
    //     skywar.config.canvas.removeEventListener("touchend",skywar.touchend);
    //     skywar.config.canvas.removeEventListener("touchmove",skywar.touchmove);        
    //     skywar.config.canvas.removeEventListener("touchstart",skywar.touchstart);           
    // }  
}
function main(){
    document.addEventListener("touchmove",function(event){
      event.preventDefault();
    });
    skywar.config.canvas.setAttribute("height",skywar.config.height);
    skywar.config.canvas.setAttribute("width",skywar.config.width);
    flash.utils.queueImg(skywar.config.urls, skywar.config.bitmaps, function () {
        Stage = new flash.display.Stage(skywar.config.canvas, 40);
        skywar.config.canvas.addEventListener("touchstart", skywar.playsound);
        skywar.skin();
    },function(data){
        var progress,context = skywar.config.canvas.getContext("2d");
        context.clearRect(0,0,skywar.config.width,skywar.config.height);
        context.font = "40px Arial";
        context.fillStyle = "blue";
        progress = parseInt((data.loaded/ data.total)*100);
        context.fillText(progress, (skywar.config.width-60)/2, (skywar.config.height-40)/2);
    });    
}
main();

