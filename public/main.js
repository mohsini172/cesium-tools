Cesium.BingMapsApi.defaultKey = "AqzV1M_9YQDSZOG7dw03eFj6m_gWikdq_71LU-zleTYWmaWInfYyS8JUZMu4Dfz-";
var viewer = new Cesium.Viewer('cesiumContainer',{timeline : false, infoBox : false, animation:false , selectionIndicator : false});
var currentTask = task3;
viewer.canvas.addEventListener('click',currentTask, false);


function changeTask(task){
	currentTask = task;
}

