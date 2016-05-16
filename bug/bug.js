/**
 * Created with JetBrains WebStorm.
 * User: ningxiao
 * Date: 13-6-4
 * Time: 上午11:31
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var str = window.location.hash;
    var swf = null,div=document.createElement("div"),ie=(navigator.appName.indexOf("Microsoft") != -1)?true:false;
    if(str.indexOf("ip")!=-1){
        div.innerHTML='<object width="1" height="1" align="middle" id="socket_bug" type="application/x-shockwave-flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">'
            +'<param name="movie" value="bug/bug.swf">'
            +'<param value="always" name="allowscriptaccess">'
            +'<param value="true" name="allowfullscreen">'
            +'<param value="transparent" name="wmode" />'
            +'<embed width="1" height="1" name="socket_bug"  src="bug/bug.swf" quality="high"  wmode="transparent" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" />'
            +'</object>';
        document.body.appendChild(div);
        if(ie){
            swf = document.getElementById("socket_bug");
        }else{
            swf = document.getElementById("socket_bug").getElementsByTagName("embed")[0];
        }
    }
    window["socketlog"] = function(val){
        swf && swf.socketLog(val);
    }
})();