
let pointA = null;
let pointB = null;

document.getElementById("actionButton").addEventListener("click", () => {
    const status = document.getElementById("status");
    const result = document.getElementById("result");

    if (!pointA) {
        // Set Point A
        navigator.geolocation.getCurrentPosition((position) => {
            pointA = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            };
            status.textContent = "Point A set. Move to the next location and click again to set Point B.";
            document.getElementById("actionButton").textContent = "Set Point B";
        }, handleError);
    } else if (!pointB) {
        // Set Point B
        navigator.geolocation.getCurrentPosition((position) => {
            pointB = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            };
            const distance = calculateDistance(pointA, pointB);
            status.textContent = "Point B set. Distance calculated:";
            result.textContent = `Total Distance: ${distance.toFixed(2)} meters`;
            document.getElementById("actionButton").textContent = "Set Point A";
            pointA = null; // Reset for next measurement
            pointB = null;
        }, handleError);
    }
});

function calculateDistance(pointA, pointB) {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = (pointA.lat * Math.PI) / 180;
    const lat2 = (pointB.lat * Math.PI) / 180;
    const deltaLat = ((pointB.lat - pointA.lat) * Math.PI) / 180;
    const deltaLon = ((pointB.lon - pointA.lon) * Math.PI) / 180;

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

function handleError(error) {
    const status = document.getElementById("status");
    status.textContent = `Error: ${error.message}`;
}
