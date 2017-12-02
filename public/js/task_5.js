
var locations = [];
var location_ = {};
location_.longitude = 0;
location_.latitude = 0;

var count = 0;

document.getElementById("dest_count").innerHTML = "Destinations Set : " + count;

function store() {
	var longitude = document.getElementById("longitude").value;
	var latitude = document.getElementById("latitude").value;

	location_.longitude = parseFloat(longitude);
	location_.latitude = parseFloat(latitude);

	locations.push(location_);

	location_ = {};

	document.getElementById("longitude").value = "";
	document.getElementById("latitude").value = "";

	count = count + 1;

	document.getElementById("dest_count").innerHTML = "Destinations Set : " + count;

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

	else if (index == count) {
		locations = [];
		count = 0;
		document.getElementById("dest_count").innerHTML = "Destinations Set : " + count;
	}

}    