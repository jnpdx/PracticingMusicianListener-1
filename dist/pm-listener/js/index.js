function networkRequest(e,i){var n=JSON.stringify(i);console.log("Object data:"),console.log(i),$.ajax({url:e,type:"POST",data:n,dataType:"json",success:function(e){alert(e)},failure:function(e){alert(e)}})}var listenerApp=new PracticingMusician.com.practicingmusician.ListenerApp,resizeTimeoutID;window.onresize=function(){clearTimeout(resizeTimeoutID),resizeTimeoutID=setTimeout(function(){listenerApp.doResizeActions()},500)},$(document).ready(function(){});