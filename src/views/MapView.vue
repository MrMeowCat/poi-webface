<template>
  <VMap/>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { VMap } from '@/components';

  @Component({
    components: {
      VMap
    },
  })
  export default class MapView extends Vue {

  }
</script>
