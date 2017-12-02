var premitiveTemp = "";
function task4(event) {

	// $('#info').fadeOut(300);
	$("#info_2").delay(300).fadeIn(300);

	var info_box = document.getElementById("info_2");

	var mousePosition = new Cesium.Cartesian2(event.clientX, event.clientY);
	var ellipsoid = viewer.scene.globe.ellipsoid;
	var scene = viewer.scene;
	var terrainProvider = new Cesium.CesiumTerrainProvider({
		url: '//assets.agi.com/stk-terrain/world'
	});

	clearScreen(scene);
	if (premitiveTemp != "") {
		premitiveTemp.destroy();
	}
	var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
	if (cartesian) {
		var cartographic = ellipsoid.cartesianToCartographic(cartesian);
		var longitude = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(5));
		var latitude = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(5));
		var positions = [];
		for (var i = longitude - 0.01; i < longitude + 0.01; i += 0.002) {
			for (var j = latitude - 0.01; j < latitude + 0.01; j += 0.002) {
				var latlong = Cesium.Cartographic.fromDegrees(i, j);
				positions.push(latlong);
			}
		}

		var promise = Cesium.sampleTerrain(terrainProvider, 11, positions);
		Cesium.when(promise, function (updatedPositions) {
			var stats = getStats(positions);
			addPin(stats.redar.lat, stats.redar.long, "Best Position For redar", "./images/default.png");
			info_box.innerHTML = "<b>Highest : </b><br>" + stats.max + "<br>" + "<b>Lowest :</b><br>" + stats.min + "<br>" + "<b>Average :</b><br>" + stats.average +
				"<br><b>Radar</b><br>Lat: " + stats.redar.lat + " Long: " + stats.redar.long;

		});
		var color = Cesium.Color.fromBytes(154, 205, 50, 110);
		premitiveTemp = scene.primitives.add(new Cesium.Primitive({
			geometryInstances: new Cesium.GeometryInstance({
				geometry: new Cesium.RectangleGeometry({
					rectangle: Cesium.Rectangle.fromDegrees(longitude - 0.01, latitude - 0.01, longitude + 0.01, latitude + 0.01),
					height: 100,
					vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
				}),
				attributes: {
					color: Cesium.ColorGeometryInstanceAttribute.fromColor(color)
				}
			}),
			appearance: new Cesium.PerInstanceColorAppearance()
		}));

	} else {
		alert('Globe was not picked');
	}
}


function clearScreen(scene) {
	// First, remove all dataSources.  Removing a dataSource will
	// automatically remove its associated entities & primitives.
	viewer.dataSources.removeAll();

	// Next, remove any remaining entities that weren't part of a dataSource.
	viewer.entities.removeAll();

	// Finally, it is safe to remove any remaining primitives, as we can
	// now be certain they did not belong to any dataSource or entity.
	// scene.primitives.removeAll();
}


function getStats(positions) {
	var max = 0;
	var min = Number.POSITIVE_INFINITY;
	var total = 0;
	var average = 0;
	var lat = 0;
	var long = 0;
	for (var i in positions) {
		if (positions[i].height > max) {
			max = positions[i].height;
			lat = positions[i].latitude;
			long = positions[i].longitude;
		}

		if (positions[i].height < min) {
			min = positions[i].height;
		}

		total += positions[i].height;
	}
	if (positions.length > 1) {
		average = total / (positions.length);
	}
	return {
		min: min.toFixed(5),
		max: max.toFixed(5),
		total: total.toFixed(5),
		average: average.toFixed(5),
		redar: {
			lat: Cesium.Math.toDegrees(lat).toFixed(5),
			long: Cesium.Math.toDegrees(long).toFixed(5)
		}
	}
}