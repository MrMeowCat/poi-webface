<template>
  <div id="map"></div>
</template>

<script lang="ts">
  import { LeafletConstants } from '@/constants';
  import { Coords, geolocationService } from '@/services/common';
  import * as L from 'leaflet';
  import { LatLng, LatLngBounds, LeafletEvent, Map } from 'leaflet';
  import Component from 'vue-class-component';
  import { Vue, Watch } from 'vue-property-decorator';

  @Component
  export default class SMap extends Vue {

    private static LAT_KEY: string = 'lat';
    private static LNG_KEY: string = 'lng';
    private static ZOOM_KEY: string = 'z';

    private static MAX_ZOOM: number = 18;
    private static MIN_ZOOM: number = 3;
    private static DEFAULT_LAT: number = 50;
    private static DEFAULT_LNG: number = 0;
    private static DEFAULT_ZOOM: number = 5;
    private static MAX_BOUNDS: LatLngBounds = L.latLngBounds([[-90, -Infinity], [90, Infinity]]);

    private tileUrl: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    private map: Map;

    public mounted(): void {
      if (this.isValidRouteQuery(this.$route.query)) {
        this.initByRoute(this.$route.query);
      } else {
        this.initByGeolocation();
      }
    }

    @Watch('$route.query')
    private watchRouteQuery(to: Dictionary<string>, from: Dictionary<string>): void {
      if (this.isValidRouteQuery(to) && this.map) {
        this.map.setView([+to[SMap.LAT_KEY], +to[SMap.LNG_KEY]], +to[SMap.ZOOM_KEY]);
      }
    }

    private initByRoute(query: Dictionary<string>): void {
      this.initMap(+query[SMap.LAT_KEY], +query[SMap.LNG_KEY], +query[SMap.ZOOM_KEY]);
      this.addEventHandlers();
    }

    private initByGeolocation(): void {
      geolocationService.getGeolocation().then((latLng: Coords) => {
        this.updateRoute(latLng.lat, latLng.lng);
        this.initMap(latLng.lat, latLng.lng);
        this.addEventHandlers();
      }).catch((err: any) => {
        this.updateRoute(SMap.DEFAULT_LAT, SMap.DEFAULT_LNG);
        this.initMap(SMap.DEFAULT_LAT, SMap.DEFAULT_LNG);
        this.addEventHandlers();
      });
    }

    private initMap(lat: number, lng: number, zoom: number = SMap.DEFAULT_ZOOM): void {
      const latLng: LatLng = new LatLng(lat, lng);
      this.map = L.map('map', {
        attributionControl: false,
        maxZoom: SMap.MAX_ZOOM,
        minZoom: SMap.MIN_ZOOM,
        maxBounds: SMap.MAX_BOUNDS,
        maxBoundsViscosity: 1.0,
        worldCopyJump: true
      }).setView(latLng, zoom);
      L.tileLayer(this.tileUrl).addTo(this.map);
    }

    private addEventHandlers(): void {
      this.map.on(LeafletConstants.MAP_MOVEEND_EVENT, (e: LeafletEvent) => {
        const center: LatLng = this.map.getCenter();
        this.updateRoute(center.lat, center.lng, this.map.getZoom());
      });
    }

    private updateRoute(lat: number, lng: number, zoom: number = SMap.DEFAULT_ZOOM): void {
      const query: Dictionary<string> = {
        [SMap.LAT_KEY]: lat.toFixed(5),
        [SMap.LNG_KEY]: lng.toFixed(5),
        [SMap.ZOOM_KEY]: zoom.toString()
      };
      this.$router.push({query});
    }

    private isValidRouteQuery(query: Dictionary<string>): boolean {
      if (!query || !query[SMap.LAT_KEY] || !query[SMap.LNG_KEY] || !query[SMap.ZOOM_KEY]) {
        return false;
      }
      const lat: number = +query[SMap.LAT_KEY];
      const lng: number = +query[SMap.LNG_KEY];
      const z: number = +query[SMap.ZOOM_KEY];
      if (isNaN(lat) || isNaN(lng) || isNaN(z)) {
        return false;
      }
      return lat > -90 && lat < 90
        && lng > -180 && lng < 180
        && z >= SMap.MIN_ZOOM && z <= SMap.MAX_ZOOM;
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
