<template>
  <div>
    <h1>Home view {{ count }}</h1>
    <button @click="increment()">Increment </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  get count() {
    return this.$store.state.count;
  }

  increment() {
    this.$store.dispatch("incrementCount");
  }
}
</script>
