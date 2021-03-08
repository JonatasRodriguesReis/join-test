<template>

  <div id="map-container">
    <div id="map" :style="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm' ? 'width:100%;' : 'width:80%;'"></div>
    <v-card :width="$vuetify.breakpoint.name === 'xs' ? '300' :'500'" class="station-details">
      <v-card-title>
        <v-container>
          <v-row>
            Dados da estação
            <v-spacer></v-spacer>
            <v-btn icon rounded @click="closeStationDetails"><v-icon>close</v-icon></v-btn>
          </v-row>
        </v-container>
      </v-card-title>
      <v-card-text class="station-details text-start">
        <v-row>
          <v-col cols="12" sm="4"> 
            <strong>Identificador</strong>
            <br/>
            <span id="station-identification"></span> 
          </v-col>
          <v-col cols="12" sm="8"> 
            <strong>Nome</strong>
            <br/>
            <span id="station-name"></span> 
          </v-col>
          <v-col cols="12" sm="4"> 
            <strong>Latitude</strong>
            <br/>
            <span id="station-latitude"></span> 
          </v-col>
          <v-col cols="12" sm="4"> 
            <strong>Longitude</strong>
            <br/>
            <span id="station-longitude"></span> 
          </v-col>
          <v-col cols="12" sm="4"> 
            <strong>Elevação (m2)</strong>
            <br/>
            <span id="station-elevation"></span> 
          </v-col>
          <v-col cols="12" sm="4"> 
            <strong>Início de operação</strong>
            <br/>
            <span id="station-start-operation"></span> 
          </v-col>
          <v-col cols="12" sm="4"> 
            <strong>Fim de operação</strong>
            <br/>
            <span id="station-finish-operation"></span> 
          </v-col>
          <v-col cols="12" sm="4"> 
            <strong>Tipo da Estação</strong>
            <br/>
            <span id="station-type"></span> 
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
import Overlay from "ol/Overlay";
import moment from 'moment';

export default {
  props:['stationsSelected'],
  data: () => ({
    vectorGeoJSON: undefined,
    source: undefined,
    overlayLayer: undefined
  }),
  async mounted() {
    this.source = new VectorSource({
        format: new GeoJSON(),
        url: "https://raw.githubusercontent.com/JonatasRodriguesReis/stations-files/main/station_list.geojson",
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

    await this.$store.dispatch('loadTypesStation');
    this.initiateMap();
  },
  watch:{
    stationsSelected(value){
      if(value.length > 0){
        const rawStations = this.$store.getters.getRawStations;
        let filterStations = Object.assign({},rawStations);
        filterStations.features = filterStations.features.filter((stationMap) => value.find((station) => station.id === stationMap.properties.id));
        this.source.clear();
        this.source.addFeatures(new GeoJSON().readFeatures(filterStations));
      }
    }
  },
  computed:{
    typesStation(){
          return this.$store.getters.getTypesStation;
    },
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

      var popup = document.querySelector(".station-details");
      this.overlayLayer = new Overlay({ element: popup });
      map.addOverlay(this.overlayLayer);

      var overlayerName = document.getElementById("station-name");
      var overlayerId = document.getElementById("station-identification");
      var overlayerLatitude = document.getElementById("station-latitude");
      var overlayerLongitude = document.getElementById("station-longitude");
      var overlayerElevation = document.getElementById("station-elevation");
      var overlayerStartOperation = document.getElementById("station-start-operation");
      var overlayerFinishOperation = document.getElementById("station-finish-operation");
      var overlayerType = document.getElementById("station-type");
      let typesStation = this.typesStation;
      let overlayLayerLocal = this.overlayLayer;

      map.on("click", function (e) {
        overlayLayerLocal.setPosition(undefined);
        
        map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
          overlayLayerLocal.setPositioning("top-center");
          overlayLayerLocal.setPosition(e.coordinate);

          overlayerName.innerHTML = feature.get("name");
          overlayerId.innerHTML = feature.get("id");
          overlayerLatitude.innerHTML = feature.get("latitude");
          overlayerLongitude.innerHTML = feature.get("longitude");
          overlayerElevation.innerHTML = feature.get("elevation_meters");
          overlayerStartOperation.innerHTML = moment(feature.get("operation_start_date"), 'YYYY-MM-DD').format('DD/MM/YYYY');
          overlayerFinishOperation.innerHTML = moment(feature.get("operation_end_date"), 'YYYY-MM-DD').format('DD/MM/YYYY');

          const station_type = typesStation.find((type) => type.id === feature.get("station_type_id"));
          overlayerType.innerHTML = station_type.name;
        })
      });
    },

    closeStationDetails(){
      this.overlayLayer.setPosition(undefined);
    }
  },
};
</script>
<style>
#map {
  position: absolute;
  height: 100%;
  /* width: 100%; */
}

#map-container {
  text-align: end;
  color: #2c3e50;
}
</style>