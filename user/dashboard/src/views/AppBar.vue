<template>
  <div>
    <v-card class="overflow-hidden hmm">
      <v-app-bar
        fixed
        app
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
        class=""
      >
        <v-avatar :tile="true" size="30" class="avatar">
          <img :src="require('../assets/images/logo.png')" alt="logo" />
        </v-avatar>

        <v-toolbar-title class="primary--text text-h5">fluss</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <v-divider class="divider"></v-divider>
  </div>
</template>

<style scoped>
.avatar {
  margin-right: 1em;
}
</style>
