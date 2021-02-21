<template>
<div>

 
  <div class="background">
   
        <v-avatar :tile="true" size="270" class="logo">     
          <img :src="require('../assets/images/logo.jpg')" alt="logo" />
        </v-avatar>
  
         <v-avatar :tile="true" size= "667" class="image">
          <img :src="require('../assets/images/fondo.jpg')"  />
        </v-avatar>       
     
  </div>



  <div class="form">

      <h1 class="black--text text-h4"> Inicio de sesion</h1>

        <v-text-field
           v-model= "email"
           :rules= "emailRules"
           label= "Email"
           required
           prepend-icon="mdi-account"      
>      </v-text-field>
  
        <v-text-field
          :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
        
          :type="show2 ? 'password' : 'text'"
          name="input-10-2"
          value="wqfasds"
          @click:append="show2 = !show2"
          v-model= "password"
          label= "Contraseña"

           prepend-icon = "mdi-lock"
        ></v-text-field>


        <a href="" class="forget-password">¿Olvido su contraseña?</a>

        <v-btn
          class="ma-2 pa-4 text-center rounded-0"
          :loading="loading"
          :disabled="loading"
          color= primary
          @click="loader = 'loading'"
        >
          Iniciar sesión 
        </v-btn>

  </div>
</div>
</template>




<script>
 export default {
    data () {
      return {
        loader: null,
        loading: false, 
        show2 : true,
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      },
    },
  }
</script>





<style lang= scss>
    .form{
      width: 400px;
      display: flex;
      flex-direction: column;
      position: absolute;
      left:800px;
      top: 200px;
  }

  .black--text{
      position: relative;
      left:90px;
      bottom: 20px;
 
  }

  .forget-password{
      position: relative;
      left:230px;
      padding: 5px;
  }

  .ma-2{
      left:0px;
      width: 400px;
}

  .image{
      position: relative;
      width: 100%;
      opacity: 70%;
      right: 270px;
      z-index: 1;
  }

  .logo{
     position:relative;
     left: 170px;
     z-index: 2;
  }

</style>

