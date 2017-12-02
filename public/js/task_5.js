
var location_ = {};
location_.longitude = 0;
location_.latitude = 0;

var count = locations.length;

document.getElementById("dest_count").innerHTML = "Destinations Set : " + locations.length;

function store() {
	var longitude = document.getElementById("longitude").value;
	var latitude = document.getElementById("latitude").value;

	location_.longitude = parseFloat(longitude);
	location_.latitude = parseFloat(latitude);

	locations.push(location_);

	location_ = {};

	document.getElementById("longitude").value = "";
	document.getElementById("latitude").value = "";


	document.getElementById("dest_count").innerHTML = "Destinations Set : " + locations.length;

	console.log(locations);
}

function travel() {
	index = 0;
	flyTo();
}
var index = 0;

function flyTo() {
	if (index < locations.length) {
		console.log("called");
		// Sandcastle.declare(flyTo);
		viewer.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(locations[index].longitude, locations[index].latitude, 15000.0)
		});
		index++;
		setTimeout(flyTo, 6000);
	}

}

function clearLocations() {
	locations = [];
	count = 0;
	document.getElementById("dest_count").innerHTML = "Destinations Set : " + count;
}

function addPins() {
	var pinBuilder = new Cesium.PinBuilder();
	var pin;
	for (var i in locations) {
		pin = viewer.entities.add({
			name: 'PIN',
			position: Cesium.Cartesian3.fromDegrees(locations[i].longitude, locations[i].latitude),
			billboard: {
				image: locations[i].imgURL,
				// scaleByDistance : new Cesium.NearFarScalar(1.5e2, 0.01, 1.5e7, 0.001),
				show: true, // default
				pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
				eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
				// rotation : Cesium.Math.PI_OVER_FOUR, // default: 0.0
				alignedAxis: Cesium.Cartesian3.ZERO, // default
				width: 25, // default: undefined
				height: 25 // default: undefined
			},
			label: {
				id: 'my label',
				show: true,
				text: locations[i].description,
				showBackground : true,
				font : '14px monospace',
				horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
				verticalOrigin : Cesium.VerticalOrigin.TOP,
				pixelOffset : new Cesium.Cartesian2(15, 0)
			}
		});

		// var myLabelEntity = viewer.entities.add({
			
		// 	position: Cesium.Cartesian3.fromDegrees(locations[i].longitude, locations[i].latitude)
		// });
	}
	viewer.flyTo(pin)
}

