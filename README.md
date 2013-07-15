# Leaflet.TileLegend

Create legends for your background layer using Leaflet.

Checkout the [demo](http://hotosm.github.io/HDM-CartoCSS/).

# Usage

### Define a JSON describing your legend

```
var legend = {
    title: "HOT style",
    description: "Humanitarian focused OSM base layer.",
    entries: [{
        title: 'Roads',
        className: 'roads',
        keys: [
            {
                coordinates: [19.67236, -72.11825, 15],
                text: "Paved primary road"
            },
            {
                coordinates: [19.8090, -72.4498, 15],
                text: "Paved secondary road"
            },
            {
                coordinates: [19.72434, -72.16495, 15],
                text: "highway=tertiary"
            }
        ]
    },
    {
        title: 'Health & education',
        className: 'poi',
        keys: [
            {
                coordinates: [19.67108, -72.12233, 19],
                text: "Hospital"
            },
            {
                coordinates: [19.67269, -72.12493, 19],
                text: "Pharmacy"
            },
            {
                coordinates: [19.65555, -72.07040, 17],
                text: "University"
            },
            {
                coordinates: [19.54809, -71.72016, 19],
                text: "School"
            },
            {
                coordinates: [19.55134, -71.72704, 19],
                text: "Kindergarden"
            }
        ]
    }
]};

```
Here you can add:
* a title
* a description
* as many sections as you want, with, foreach:
  * a title
  * an optionnal class name
  * expend: true if you want it to be expended by default
  * a list of keys, with a latitude, a longitude, a zoom, and a text

### Add it to your `L.TileLayer` options

```
var mylayer = L.tileLayer(..., {legend: legend});
```

### Deactivate the `L.Control.Attribution`

```
var map = L.map('map, {..., attributionControl: false});
```

### Add the `L.Control.TileLegend` to you map

```
var legendControl = (new L.Control.TileLegend()).addTo(map);

```
