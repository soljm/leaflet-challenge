# Leaflet Challenge

From Module 15: Mapping from the Data Analytics Boot Camp by Monash University and EdX.

By implementing skills learnt throughout the module, an attempt at the challenge has been submitted here.

## Contents

- `Leaflet-Part-1` folder
  - `static` folder
    - `css` folder
      - `style.css` file
    - `js` folder
      - `logic.js` file with main code for map
  - `index.html` file to open webpage with map

## Explanations

Function was created to create a map of the world. This includes the base layer (the world map), the earthquake layer, and the legend showing depth.

Another function was created to add the markers for each earthquake onto the map. The fill colour was made to change depending on the depth of each earthquake. A popup was also bound to show the place, magnitude, and depth of the earthquake when clicked.

A `getColour(d)` function was created to assign colour to each range of depths.

API call was created to retrieve data and the `.then` function was used to create markers after information was retrieved.

## Credits

- Code for the `createMap` function was taken from **Activity 2: Citi Bike Maps** from Lesson 3 in Module 15 and modified to add necessary features.
- Legend code was taken from the Leaflet documentation for [**Interactive Choropleth Map**](https://leafletjs.com/examples/choropleth/) under the **Custom Legend Control** subheading and adjusted to fit criteria.
- Dataset was taken from **all earthquakes from the past 7 days** from the [United States Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) website as of **7 June 2024 at 21:21**.