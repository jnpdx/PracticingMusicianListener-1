var canvasName="notationCanvas",indicatorCanvasName="indicatorCanvas",feedbackCanvasName="feedbackCanvas",canvas=document.getElementById(canvasName),indicatorCanvas=document.getElementById(indicatorCanvasName),feedbackCanvas=document.getElementById(feedbackCanvasName),metronomeItems=document.getElementById("metronomeItems").getElementsByClassName("metronomeItem"),listenerApp=new PracticingMusician.com.practicingmusician.ListenerApp,resizeTimeoutID;window.onresize=function(){clearTimeout(resizeTimeoutID),resizeTimeoutID=setTimeout(listenerApp.doResizeActions,500)};