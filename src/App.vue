<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">My Weather App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <v-icon>mail</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Latitude/>
      
    </v-content>
    <v-content>

    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Latitude from './components/Latitude';
export default {
  name: 'App',
  components: {
    Latitude,
    //HelloWorld,
  },
  data: () => ({
    //
  }),
  created(){
    //this.$vuetify.theme.dark = true
  },
};
</script>
