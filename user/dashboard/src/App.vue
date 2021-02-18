<template>
  <v-app>
    <div id="app">
      <Layout>
        <router-view />
      </Layout>
    </div>
  </v-app>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");
html,
body {
  font-size: 16px;
  font-family: "Nunito", sans-serif;
}
#app {
  font-family: "Nunito", sans-serif;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from "./components/Layout/Layout.vue";

@Component({ components: { Layout } })
export default class App extends Vue {
}
</script>
