
var listenerApp = new PracticingMusician.com.practicingmusician.ListenerApp()

//Resizing code
var resizeTimeoutID;
window.onresize = function() {
    clearTimeout(resizeTimeoutID);
    resizeTimeoutID = setTimeout(
        function() {
            listenerApp.doResizeActions()
        }
    , 500);
}


function networkRequest(url, dataObject) {
    var objectData = JSON.stringify(dataObject)
    console.log("Object data:")
    console.log(dataObject)
    $.ajax({
        url:url,
        type: "POST",
        contentType: "application/json",
        data: objectData,
        dataType: 'json',
        success: function(result) {
            alert(result)
        },
        failure: function(result) {
            alert(result)
        }
    })
}

$(document).ready(function(){
    //networkRequest("https://google.com",{data: "test"})
})
