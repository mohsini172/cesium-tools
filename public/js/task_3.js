function task3(e){
    var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
 
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
    if (cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
       
        var pointOfInterest = Cesium.Cartographic.fromDegrees(
        parseFloat(longitudeString), parseFloat(latitudeString), 5000, new Cesium.Cartographic());
        
        var terrainProvider = new Cesium.CesiumTerrainProvider({
            url : '//assets.agi.com/stk-terrain/world',
            requestWaterMask: true
        });
        var positions = [Cesium.Cartographic.fromDegrees(parseFloat(longitudeString), parseFloat(latitudeString))];
        var promise = Cesium.sampleTerrain(terrainProvider, 11, positions);
        Cesium.when(promise, function(updatedPositions) {
            console.log(longitudeString+','+latitudeString+','+positions[0].height);
            
            // updatedPositions is just a reference to positions.
        });

    } else {
        alert('Globe was not picked');
    }
	
};
