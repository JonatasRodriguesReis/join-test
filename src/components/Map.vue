<template>
  <div id="map-container">
    <div id="map"></div>
  </div>
</template>
<script>
/* eslint-disable */
import "ol/css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { /* Fill, Stroke,  */Style, Icon, /* Circle */ } from "ol/style";
//import Overlay from "ol/Overlay";

export default {
  data: () => ({
    vectorGeoJSON: undefined,
    source: undefined,
  }),
  async mounted() {
    await this.initiateMap();
  },
  created(){
    this.source = new VectorSource({
        format: new GeoJSON(),
        url: "https://raw.githubusercontent.com/jacksonks/geojson/master/station_list.geojson",
    });

    this.vectorGeoJSON = new VectorLayer({
        source: this.source,
        /**eslint */
        style: function (feature, resolution) {
          return [new Style({
            image: new Icon({
              scale: 0.6,
              color: feature.get('station_type_id') == "1" ? '#7cb5ec' : feature.get('station_type_id') == "2" ? '#434348': feature.get('station_type_id') == "3" ? '#90ed7d' : feature.get('station_type_id') == "4" ? '#f7a35c': '#8085e9',
              src: require("../assets/location_on-white-48dp.svg"),
            })
          })];
        }
    });
  },
  methods: {
    initiateMap() {

      var vector = new VectorLayer({
        source: this.source
      });

      var raster = new TileLayer({
        source: new OSM(),
      });

      var map = new Map({
        controls: defaultControls().extend([
          new ScaleLine({
            units: "degrees",
          }),
        ]),
        target: "map",
        layers: [raster, vector, this.vectorGeoJSON],
        view: new View({
          projection: "EPSG:4326",
          center: [-51.815011395380765, -24.650150016322684],
          zoom: 7.5,
        }),
      });
    },
  },
};
</script>
<style>
#map {
  position: absolute;
  height: 100%;
  width: 85%;
}

#map-container {
  text-align: end;
  color: #2c3e50;
}
</style>