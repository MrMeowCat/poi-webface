<template>
  <div>
    <h2>Page not found...</h2>
    <a @click="handleBackClick">Go back</a>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class NotFoundView extends Vue {

    public handleBackClick(): void {
      this.$router.back();
    }
  }
</script>
