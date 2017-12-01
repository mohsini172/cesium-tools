function task4(event) {
	var mousePosition = new Cesium.Cartesian2(event.clientX, event.clientY);
	var ellipsoid = viewer.scene.globe.ellipsoid;
	var scene = viewer.scene;
	var terrainProvider = new Cesium.CesiumTerrainProvider({
		url: '//assets.agi.com/stk-terrain/world'
	});

	var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
	if (cartesian) {
		var cartographic = ellipsoid.cartesianToCartographic(cartesian);
		var longitude = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(5));
		var latitude = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(5));
		var positions = [];
		for (var i = longitude - 5; i < longitude + 5; i++) {
			for (var j = latitude - 5; j < latitude + 5; j++) {
				var latlong = Cesium.Cartographic.fromDegrees(i, j);
				positions.push(latlong);
			}
		}

		var promise = Cesium.sampleTerrain(terrainProvider, 11, positions);
		Cesium.when(promise, function (updatedPositions) {
			console.log("working")
			info_box.style.display = "block";
			info_box.style.left = event.pageX;
			info_box.style.top = event.pageY;
			info_box.innerHTML = "Longitude : " + longitude + "<br>" + "Latitude :<br>" + latitude + "<br>" + "Altitude :<br>" + positions[0].height;


			// updatedPositions is just a reference to positions.
		});


		scene.primitives.add(new Cesium.Primitive({
			geometryInstances: new Cesium.GeometryInstance({
				geometry: new Cesium.RectangleGeometry({
					rectangle: Cesium.Rectangle.fromDegrees(longitude - 0.5, latitude - 0.5, longitude + 0.5, latitude + 0.5),
					height: 100,
					vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
				}),
				attributes: {
					color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)
				}
			}),
			appearance: new Cesium.PerInstanceColorAppearance()
		}));

	} else {
		alert('Globe was not picked');
	}
}