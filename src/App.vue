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
        <v-flex xs12 v-if="errorMessage">
          <v-alert dense border="left" type="warning">
            {{errorMessage}}
          </v-alert>
        </v-flex>
      </v-container>
      <CityWeather :item="current" />
      <CityWeather v-for="city in saved" :item="city" v-bind:key="city.name"/>      
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
//import Latitude from './components/Latitude';
import CityWeather from './components/CityWeather';
import jdata from './assets/others.json';

const Server ={
  API_KEY : '4708677713bf2fc70d94e2badeb41f0d',
  URI: 'https://api.darksky.net/forecast/',
  UNITS: 'si'
};
export default {
  name: 'App',
  components: {
    //Latitude,
    CityWeather,
  },
  data: () => ({
    info:null,
    errorMessage:'',
    apidata:null,
    current: {
      latitude:0,
      longitude:0,
      city:'Singapore',
      saved: false,
      data: jdata
    },
    saved: []
  }),
  methods: {
    showError : function(errString) {
      this.errorMessage = errString;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  },
  created(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos =>{
        this.errorMessage = '',
        this.current.latitude = pos.coords.latitude,
        this.current.longtude = pos.coords.longitude
      });
    }
    else{
      //set default
      //this.errorMessage = 'Browser does not support geolocation, showing default city';
      this.showError('Browser does not support geolocation, showing default city');
    }
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
         .then(response => (this.apidata = response.data.time.updated));
         this.info = Server.URI + Server.API_KEY + '/';// + moment.unix(this.current.data.currently.time).tz(this.current.data.timezone).toString();
  },
};
</script>
