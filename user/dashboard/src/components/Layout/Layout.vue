<template>
  <v-content>
    <AppBar />
    <Container>
      <slot />
    </Container>
  </v-content>
</template>

<style scoped>
.hmm {
  color: red;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppBar from "./AppBar.vue";
import Container from "./Container.vue";

@Component({
  components: { AppBar, Container }
})
export default class Layout extends Vue {
}
</script>
