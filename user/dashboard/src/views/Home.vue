<template>
  <Layout>
    <h1>Hello, world!</h1>
    <v-row no-gutters>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          One of three columns
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from "./Layout.vue";

@Component({
  components: { Layout }
})
export default class Home extends Vue {
}
</script>

