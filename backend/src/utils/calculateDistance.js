function deg2rad( deg ) {
    return deg * ( Math.PI / 180 );
}


module.exports = function calculateDistance( 
                centerCoordinates, pointCoordinates ) {
    const radius = 6371;

    const { latitude: lat1, longitude: lon1 } = centerCoordinates;
    const { latitude: lat2, longitude: lon2 } = pointCoordinates;

    const dLat = deg2rad( lat2 - lat1 );
    const dLon = deg2rad( lon2 - lon1 );

    const sinDLat = Math.sin( dLat / 2 );
    const sinDLon = Math.sin( dLon / 2 );
    const a = sinDLat * sinDLat
            + Math.cos( deg2rad( lat1 ) ) * Math.cos( deg2rad( lat2 ) )
            * sinDLon * sinDLon;

    const center = 2 * Math.atan2( 
                    Math.sqrt( a ), Math.sqrt( 1 - a ) );
    const distance = radius * center;

    return distance;

}