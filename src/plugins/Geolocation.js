// Get geo coordinates

export const getMapLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem('latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
    }, onMapError, { enableHighAccuracy: true });
    return {'latitude': localStorage.getItem('latitude'), 'longitude':localStorage.getItem('longitude')}
}

function onMapError(error) {
    console.error('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
