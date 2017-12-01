function task3(e){
    var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
 
    var info_box = document.getElementById("info");

    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
    if (cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
       
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
            info_box.style.display = "block";
            console.log(e.pageX);
            console.log(e.pageY);
            info_box.style.left = e.pageX;
            info_box.style.top  = e.pageY;
            info_box.innerHTML = "Longitude : " + longitudeString + "<br>" + "Latitude :<br>" + latitudeString + "<br>" + "Altitude :<br>" + positions[0].height; 
            
            
            // updatedPositions is just a reference to positions.
        });

    } else {
        alert('Globe was not picked');
    }
	
};
