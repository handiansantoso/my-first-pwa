<template>
    <v-container>
        <v-layout
      text-center
      wrap
    >
    <v-flex xs12 v-if="location">
        Your current location: {{lat}} m {{long}} {{info}}
    </v-flex>
    <v-flex xs12 v-else>
        <v-alert
      dense
      border="left"
      type="warning"
    >
      Browser does not support location service, default location is used!
    </v-alert>
    </v-flex>
    <v-flex xs12>
        {{info}}
    </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-layout>
            <v-card>
                <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{city}} {{temperature}}</v-list-item-title>
                    <v-list-item-subtitle>{{description}}</v-list-item-subtitle>
                </v-list-item-content>
                    <v-list-item-avatar
        tile
        size="128"
        
      >
      <v-img :src="img"></v-img>
      </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                    <v-btn><v-icon>favorite_border</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>

    </v-container>
</template>
<script>
export default {
    data: () =>({
        lat:0,
        long:0,
        location: true,
        city:'Singapore',
        temperature: 33,
        description: 'It is cold and windy',
        img:require('../assets/Sun.svg'),
        info:null,
        cities: [
            'Singapore','San Francisco','Melbourne','Texas'
        ],
    }),
    mounted: function () {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos =>{
                this.location = true,
                this.lat = pos.coords.latitude,
                this.long = pos.coords.longitude,
                this.$axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => (this.info = response.data.time.updated));
            });
        }
        else{
            this.location = false;
            this.lat = 1.3366452,
            this.long = 103.7173438
        }
        
    }
}
</script>