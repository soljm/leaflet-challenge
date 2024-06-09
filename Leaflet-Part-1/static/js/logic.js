function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create an overlayMaps object to hold the earthquakes layer.
    let overlayMaps = {
        "Earthquakes": earthquakes
    };

    // Create the map object with options.
    let map = L.map("map", {
        center: [0, 0],
        zoom: 2,
        layers: [streetmap, earthquakes]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    // Create legend
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        let div = L.DomUtil.create('div', 'info legend');
        
        div.innerHTML += "<h4>Depth</h4>"; // Adds title to legend

        let grades = [-10, 10, 30, 50, 70, 90]; // Separates the depth levels

        // Loop through intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background-color:' + getColour(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);
}

// Create function to create markers
function createMarkers(response) {

    let layer = L.geoJSON(response, {
        pointToLayer: function (geoJsonPoint, latlng) {

            // Create circle marker for each point with fill colour based on depth and bind popup showing place, magnitude, and depth
            return L.circleMarker(latlng, {
                radius: geoJsonPoint.properties.mag * 5,
                color: 'rgb(0,0,0)',
                weight: 1,
                fillColor: getColour(geoJsonPoint.geometry.coordinates[2]),
                fillOpacity: 1.0
            });
        }
    })
        .bindPopup((earthquake) => `<h2>${earthquake.feature.properties.place}</h2><h3>Magnitude: ${earthquake.feature.properties.mag}</h3><h3>Depth: ${earthquake.feature.geometry.coordinates[2]}</h3>`)

    createMap(layer);
}

// Create function to change colour of marker based on depth
function getColour(d) {
    return d > 90 ? 'rgb(96,78,138)' :
        d > 70 ? 'rgb(135,93,142)' :
            d > 50 ? 'rgb(187,122,142' :
                d > 30 ? 'rgb(208,134,143)' :
                    d > 10 ? 'rgb(224,156,145)' :
                        'rgb(247,206,160)';
}

// API call to retrieve data then run createMarkers function
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers)