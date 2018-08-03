import Vue from 'vue';
import Router from 'vue-router';
import { HomeView, MapView } from '@/components/views';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    }
  ],
});
