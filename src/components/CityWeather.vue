<template>
    <v-container>
        <v-card flat>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title class="headline">{{item.city}}</v-list-item-title>
                    <v-list-item-subtitle>{{ moment.unix(item.data.currently.time).tz(item.data.timezone).format("ddd, hh:mm A") }}, {{item.data.currently.summary}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-text>
                <v-row align="center">
                    <v-col class="display-3" cols="4">
                        {{item.data.currently.temperature}}&deg;C
                    </v-col>
                    <v-col cols="4" class="pa-0">
                    <v-img
                        :src= "getImgUrl(item.data.currently.icon)" v-bind:alt="item.data.currently.icon"
                        width="160"
                    ></v-img>
                    </v-col>
                    <v-col cols="4">
                        <v-row align="center">
                            <v-col cols="6" class="pa-0" >
                                Humidity:
                            </v-col>
                            <v-col cols="6" class="pa-0">
                                {{item.data.currently.humidity}}
                            </v-col>
                            <v-col cols="6" class="pa-0" >
                                Wind Speed:
                            </v-col>
                            <v-col cols="6" class="pa-0" >
                                {{item.data.currently.windSpeed}} M/s
                            </v-col>
                            <v-col cols="6" class="pa-0" >
                                UV Index:
                            </v-col>
                            <v-col cols="6" class="pa-0" >
                                {{item.data.currently.uvIndex}}
                            </v-col>
                            <v-col cols="6" class="pa-0" >
                                Visibility:
                            </v-col>
                            <v-col cols="6" class="pa-0" >
                                {{item.data.currently.visibility}} Km
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>
            <v-row>
                <v-col col="1" v-for="hour in dayHours" v-bind:key="hour.time">
                    {{Math.round(hour.temperature)}}&deg;C
                    <br>
                    {{ moment.unix(hour.time).tz(item.data.timezone).format("hh A") }}
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="day in item.data.daily.data" v-bind:key="day.time">
                    <v-row>
                        <v-col cols="12" class="pa-0 text-center">
                            {{ moment.unix(day.time).tz(item.data.timezone).format("ddd") }}
                        </v-col>
                        <v-col cols="12" class="pa-0 text-center">
                            <v-row>
                                <v-col cols="6">
                            <v-img
                                :src= "getImgUrl(day.icon)" v-bind:alt="day.icon"
                                width="60"
                            ></v-img>
                                </v-col>
                                <v-col cols="6">
                                    <v-row class="pa-0 text-center font-weight-bold">
                                        {{Math.round(day.temperatureLow)}}&deg;C
                                    </v-row>
                                    <v-row>
                                        {{Math.round(day.temperatureHigh)}}&deg;C
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn v-if="!item.saved" v-on:click="$emit('saveToFav')"><v-icon>favorite_border</v-icon></v-btn>
                <v-btn v-else v-on:click="$emit('deleteFromFav',item.city)"><v-icon>delete</v-icon></v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
import moment from 'moment-timezone';
export default {
    props: ['item'],
    data: ()=>({

    }),
    methods: {
        getImgUrl(pic) {
            return require('../assets/'+pic +'.svg')
        }
    },
    computed: {
        dayHours: function() {
            let dayData = [];
            let counter = 0;
            this.item.data.hourly.data.forEach(element => {
                if(counter < 12)
                if(moment.unix(this.item.data.currently.time).tz(this.item.data.timezone).format("ddd") == moment.unix(element.time).tz(this.item.data.timezone).format("ddd")){
                    dayData.push(element);
                    counter++;
                }                    
                else
                    if(counter > 0){
                        dayData.push(element);
                        counter++;
                    }
            
            });
            return dayData;
        }
    }
}
</script>