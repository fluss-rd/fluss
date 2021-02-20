<template>
  <div>
    <h1 class="text-h3">Another</h1>

    <v-btn @click="toPrevious()">To previous</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  toPrevious() {
    this.$router.back();
  }
}
</script>