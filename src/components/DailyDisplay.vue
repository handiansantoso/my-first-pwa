<template>
    <v-card-text>
        <v-row align="center">
            <v-col class="display-3" cols="4">
                {{day.temperature ? day.temperature : day.temperatureHigh}}&deg;C
            </v-col>
            <v-col cols="4" class="pa-0">
                <v-img
                    :src= "getImgUrl(day.icon)" v-bind:alt="day.icon"
                    width="160"></v-img>
            </v-col>
            <v-col cols="4">
                <v-row align="center">
                    <v-col cols="6" class="pa-0" >
                        Humidity:
                    </v-col>
                    <v-col cols="6" class="pa-0">
                        {{day.humidity}}
                    </v-col>
                    <v-col cols="6" class="pa-0" >
                        Wind Speed:
                    </v-col>
                    <v-col cols="6" class="pa-0" >
                        {{day.windSpeed}} M/s
                    </v-col>
                    <v-col cols="6" class="pa-0" >
                        UV Index:
                    </v-col>
                    <v-col cols="6" class="pa-0" >
                        {{day.uvIndex}}
                    </v-col>
                    <v-col cols="6" class="pa-0" >
                        Visibility:
                    </v-col>
                    <v-col cols="6" class="pa-0" >
                        {{day.visibility}} Km
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col col="12" v-if="hours.length == 0">
                Hourly data not found for selected day.
            </v-col>
            <v-col col="1" v-for="hour in hours" v-bind:key="hour.time">
                {{Math.round(hour.temperature)}}&deg;C
                <br>
                {{ moment.unix(hour.time).tz(timezone).format("hh A") }}
            </v-col>

        </v-row>
    </v-card-text>
    
</template>
<script>
export default {
    props: ['day','hours','timezone'],
    methods: {
        getImgUrl(pic) {
            return require('../assets/'+pic +'.svg')
        }
    },
}
</script>