<template>
    <v-container>
        <v-card flat>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title class="headline">{{item.city}}</v-list-item-title>
                    <v-list-item-subtitle v-if="selectedDay">{{ moment.unix(selectedDay.time).tz(item.data.timezone).format("ddd, hh:mm A") }}, {{selectedDay.summary}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <DailyDisplay v-if="selectedDay" :day="selectedDay" :hours="selectedHours" :timezone="item.data.timezone"/>
            <v-card-text>
            <v-row>
                <v-col v-for="day in item.data.daily.data" v-bind:key="day.time" v-on:click="setDayHour(day.time)" :style="{ cursor: 'pointer'}">
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

import DailyDisplay from './DailyDisplay';
import moment from 'moment-timezone';
export default {
    components: {
        DailyDisplay,
    },
    props: ['item'],
    data: ()=>({
        selectedDay: null,
        selectedHours: null
    }),
    methods: {
        getImgUrl(pic) {
            return require('../assets/'+pic +'.svg')
        },
        setDayHour(time){
            
            this.selectedDay = this.item.data.daily.data.filter(c=>c.time == time)[0];
            this.selectedHours = [];
            let counter = 0;
            let day = moment.unix(time).tz(this.item.data.timezone).format("DD ddd");
            this.item.data.hourly.data.forEach(e => {
                if(counter < 12)
                    if(day == moment.unix(e.time).tz(this.item.data.timezone).format("DD ddd")){
                        this.selectedHours.push(e);
                        counter++;
                    }
                    else {
                        if(counter > 0) {
                            this.selectedHours.push(e);
                            counter++; 
                        }
                    }
            });
        }
    },
    mounted() {
        
        this.setDayHour(this.item.data.currently.time);
        this.selectedDay = this.item.data.currently;
    }
}
</script>