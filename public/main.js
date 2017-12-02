Cesium.BingMapsApi.defaultKey = "AqzV1M_9YQDSZOG7dw03eFj6m_gWikdq_71LU-zleTYWmaWInfYyS8JUZMu4Dfz-";
var viewer = new Cesium.Viewer('cesiumContainer', {
	timeline: false,
	infoBox: false,
	animation: false,
	selectionIndicator: false,
	homeButton: false,
	fullscreenButton: false,
	navigationHelpButton: false,
	baseLayerPicker: false,
	// geocoder: false,
	sceneModePicker: false
});
var currentTask = task3;

var scene = viewer.scene;
var clock = viewer.clock;

viewer.canvas.addEventListener('click', currentTask, false);

function changeTask(task) {
	viewer.canvas.removeEventListener('click', currentTask, false);
	currentTask = task;
	viewer.canvas.addEventListener('click', currentTask, false);
}

function showDiv(id) {
	document.getElementById(id).style.display = 'inline-block';
}

function hideAllDivs() {
	document.getElementById('task_3').style.display = 'none';
	document.getElementById('task_4').style.display = 'none';
	document.getElementById('task_5').style.display = 'none';
}

addPins();