
var location_ = {};
var dataURL = "";
location_.longitude = 0;
location_.latitude = 0;

var count = locations.length;

document.getElementById("dest_count").innerHTML = "Destinations Set : " + locations.length;

function store() {
	var longitude = document.getElementById("longitude").value;
	var latitude = document.getElementById("latitude").value;
	var description = document.getElementById("description_input").value;

	location_.longitude = parseFloat(longitude);
	location_.latitude = parseFloat(latitude);
	location_.imgURL = dataURL;
	location_.description = description || "";

	locations.push(location_);
	addPin(location_.latitude, location_.longitude, location_.description, location_.imgURL);
	location_ = {};

	document.getElementById("longitude").value = "";
	document.getElementById("latitude").value = "";
	document.getElementById("description_input").value = "";


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
	clearScreen(viewer.scene);
	document.getElementById("dest_count").innerHTML = "Destinations Set : " + count;
}

function addPins() {
	var pinBuilder = new Cesium.PinBuilder();
	var pin;
	for (var i in locations) {
		pin = viewer.entities.add({
			name: 'PIN',
			position: Cesium.Cartesian3.fromDegrees(locations[i].longitude, locations[i].latitude),
			
			label: {
				id: 'my label',
				show: true,
				text: locations[i].description,
				showBackground: true,
				font: '14px monospace',
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				pixelOffset: new Cesium.Cartesian2(15, 0)
			},
			billboard: {
				image: locations[i].imgURL,
				// scaleByDistance : new Cesium.NearFarScalar(1.5e2, 0.01, 1.5e7, 0.001),
				show: true, // default
				pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
				eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
				verticalOrigin: Cesium.VerticalOrigin.CENTER, // default: CENTER
				// rotation : Cesium.Math.PI_OVER_FOUR, // default: 0.0
				alignedAxis: Cesium.Cartesian3.ZERO, // default
				width: 25, // default: undefined
				height: 25 // default: undefined
			}
		});
	}
	viewer.flyTo(pin)
}



function addPin(lat, long, description, imgURL) {
	var pinBuilder = new Cesium.PinBuilder();
	var pin = viewer.entities.add({
		name: 'PIN',
		position: Cesium.Cartesian3.fromDegrees(long, lat),
		billboard: {
			image: imgURL,
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
			show: true,
			text: description,
			showBackground: true,
			font: '14px monospace',
			horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
			verticalOrigin: Cesium.VerticalOrigin.TOP,
			pixelOffset: new Cesium.Cartesian2(15, 0)
		}
	});
	viewer.flyTo(pin)
}

