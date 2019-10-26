<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">My Weather App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="#"
      >
        <v-icon>mail</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-progress-linear
      indeterminate
      color="cyan" v-if="isLoading"
    ></v-progress-linear>
        <v-flex xs12 v-if="errorMessage">
          <v-alert dense border="left" type="warning">
            {{errorMessage}}
          </v-alert>
        </v-flex>
      </v-container>
      <CityWeather v-if="current.data" :item="current" />
      <CityWeather v-for="city in saved" :item="city" v-bind:key="city.name"/>      
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import CityWeather from './components/CityWeather';

export default {
  name: 'App',
  components: {
    CityWeather,
  },
  data: () => ({
    isLoading:false,
    errorMessage:'',
    current: {
      latitude:0,
      longitude:0,
      city:'',
      saved: false,
      data: null
    },
    saved: []
  }),
  methods: {
    showError : function(errString) {
      this.errorMessage = errString;
      setTimeout(() => {
        this.errorMessage = '';
      }, 10000);
    },
    callDarkSky: function(lat,long) {
      this.isLoading = true;
      axios.get('http://localhost:8080/' + lat + ',' + long + '?units=si')
        .then(response => (this.current.data = response.data))
        .catch(error => (this.showError(error)))
        .finally(()=> (this.isLoading = false));
    },
  },
  created(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos =>{
        this.errorMessage = '',
        this.current.latitude = pos.coords.latitude,
        this.current.longitude = pos.coords.longitude
        this.current.city = 'My Location';
        this.callDarkSky(this.current.latitude,this.current.longitude);        
      });
    }
    else{
      this.showError('Browser does not support geolocation, showing default city');
      this.current.latitude = 7.2575;
      this.current.longitude = 112.7521;
      this.current.city = 'Surabaya, Indonesia';
      this.callDarkSky(this.current.latitude,this.current.longitude);
    }
    
  },
};
</script>
