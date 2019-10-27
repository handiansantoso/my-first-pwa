<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">My Weather App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-icon v-if="onLine" large color="green">signal_wifi_4_bar</v-icon>
        <v-icon v-else large color="red">signal_wifi_off</v-icon>
    </v-app-bar>
    <v-content>
      <v-select :items="cities" item-text="name" label="City" @change="loadCity" v-model="selectedCity">
      </v-select>
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
      <CityWeather v-if="current.data" :item="current" v-on:saveToFav="saveCityFavourite"/>
      <CityWeather v-for="city in saved" :item="city" v-bind:key="city.name"/>      
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import CityWeather from './components/CityWeather';
import cities from './assets/cities.json';
const Server ={
  API_KEY : '4708677713bf2fc70d94e2badeb41f0d',
  URI: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/'
};
export default {
  name: 'App',
  components: {
    CityWeather,
  },
  data: () => ({
    cities: cities,
    selectedCity: null,
    onLine: navigator.onLine,
    showBackOnline: false,
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
      this.current.latitude = lat;
      this.current.longitude = long;
      this.current.data = null;
      this.isLoading = true;
      axios.get(Server.URI + Server.API_KEY + '/' + lat + ',' + long + '?units=si') //'http://localhost:8080/'
        .then(response => (this.current.data = response.data))
        .catch(error => (this.showError(error)))
        .finally(()=> (this.isLoading = false,this.selectedCity = ''));
    },
    loadCity: function(val){
      let selected = this.cities.filter(d=>d.name === val);
      if(selected != undefined && selected != null)
      {  
        this.current.city = selected[0].name;
        this.callDarkSky(selected[0].latitude,selected[0].longitude);        
      }
    },
    updateOnlineStatus(e) {
      const {
        type
      } = e;
      this.onLine = type === 'online';
    },
    saveCityFavourite:function() {
      let exists = this.saved.filter(d=>d.city === this.current.city);
      if(exists != undefined && exists != null && exists.length > 0){
        this.showError(this.current.city + ' exists in favourites, it will not be added.');
        return;
      }
      let obj = Object.assign({},this.current);
      obj.saved = true;

      this.saved.push(obj);
      this.current.city = '';
      this.current.latitude = 0;
      this.current.longitude = 0;
      this.current.data = null;
    }
  },
  watch: {
        onLine(v) {
            if (v) {
                this.showBackOnline = true;
                setTimeout(() => {
                    this.showBackOnline = false;
                }, 1000);
            }
        }
    },
    mounted() {
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
    },
    beforeDestroy() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },
  created(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos =>{
        this.errorMessage = '',
        //this.current.latitude = pos.coords.latitude,
        //this.current.longitude = pos.coords.longitude
        this.current.city = 'My Location';
        this.callDarkSky(pos.coords.latitude,pos.coords.longitude);        
      });
    }
    else{
      this.showError('Browser does not support geolocation, please select city from select box');
      //this.current.latitude = 7.2575;
      //this.current.longitude = 112.7521;
      //this.current.city = 'Surabaya, Indonesia';
      //this.callDarkSky(this.current.latitude,this.current.longitude);
    }
    
  },
};
</script>
