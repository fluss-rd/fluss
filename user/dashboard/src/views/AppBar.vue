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
      <div class="logo">
        <v-avatar :tile="true" size="35" class="avatar">
          <img :src="require('../assets/images/logo.png')" alt="logo" />
        </v-avatar>

        <v-toolbar-title class="primary--text text-h5">fluss</v-toolbar-title>
      </div>


        <v-btn elevation="0" outlined color="secondary" class="app-btn">
          Datos y reportes
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn plain>Inicio</v-btn>
        <v-btn plain>Reportes recientes</v-btn>
        <v-btn plain>¿Quiénes somos?</v-btn>
      </v-app-bar>
    </v-card>
    <v-divider class="divider"></v-divider>
  </div>
</template>

<style scoped>
.avatar {
  margin-right: 1em;
}
 .v-btn{
    border-radius:10px!important;
 }
 .app-btn {
    margin-left: 1em;
 }
 .logo {
   display: flex;
   flex-direction: row;
   align-items: center;
   cursor: pointer;
 }
</style>
