<template>
  <SMap/>
</template>

<script lang="ts">
  import { SMap } from '../smart/index';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      SMap
    },
  })
  export default class MapView extends Vue {

  }
</script>
