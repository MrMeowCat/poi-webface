<template>
  <div id="map"></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import * as L from 'leaflet';

  @Component
  export default class VMap extends Vue {

    private map: any = null;

    public mounted() {
      this.map = L.map('map').setView([50, 0], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a target="_blank" href="https://www.openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
        minZoom: 3
      }).addTo(this.map);
    }

  }
</script>

<style scoped>
  @import "~leaflet/dist/leaflet.css";

  #map {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>